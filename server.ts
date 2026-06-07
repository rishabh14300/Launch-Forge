import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion, type Collection, type Document } from 'mongodb';

dotenv.config({ path: '.env.local' });
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Enable CORS for production deployment
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    process.env.FRONTEND_URL || '',
  ].filter(Boolean);

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin || '')) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'launchforge';
const BLUEPRINTS_COLLECTION = 'blueprints';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash';

let mongoClientPromise: Promise<MongoClient> | null = null;

function getMongoClient(): Promise<MongoClient> {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured. Add it to .env.local to enable database persistence.');
  }

  if (!mongoClientPromise) {
    const client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
      serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true
      }
    });
    mongoClientPromise = client.connect();
  }

  return mongoClientPromise;
}

async function getBlueprintsCollection(): Promise<Collection<Document>> {
  const client = await getMongoClient();
  const db = client.db(MONGODB_DB_NAME);
  const collection = db.collection(BLUEPRINTS_COLLECTION);
  await collection.createIndex({ id: 1 }, { unique: true });
  await collection.createIndex({ createdAt: -1 });
  return collection;
}

async function saveBlueprint(blueprint: Record<string, unknown>) {
  const collection = await getBlueprintsCollection();
  await collection.updateOne(
    { id: blueprint.id },
    {
      $set: {
        ...blueprint,
        updatedAt: new Date().toISOString()
      },
      $setOnInsert: {
        createdAt: blueprint.createdAt || new Date().toISOString()
      }
    },
    { upsert: true }
  );
}

function stripMongoId<T extends Document>(document: T | null) {
  if (!document) return null;
  const { _id, ...rest } = document;
  return rest;
}

function isMongoUnavailable(error: any) {
  return (
    error?.message?.includes('MONGODB_URI') ||
    error?.name === 'MongoServerSelectionError' ||
    error?.message?.includes('ECONNREFUSED')
  );
}

// Lazy-initialized Gemini client helper
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (aiClient) return aiClient;

  const key = process.env.GEMINI_API_KEY;
  if (!key || key === 'MY_GEMINI_API_KEY') {
    throw new Error('GEMINI_API_KEY is not configured or is set to placeholder values. Please update your API keys in Settings > Secrets.');
  }

  aiClient = new GoogleGenAI({
    apiKey: key,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });

  return aiClient;
}

app.get('/api/health', async (_req, res) => {
  const geminiConfigured = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
  const mongoConfigured = Boolean(MONGODB_URI);

  if (!mongoConfigured) {
    return res.json({
      ok: true,
      geminiConfigured,
      mongoConfigured,
      database: 'not configured'
    });
  }

  try {
    const client = await getMongoClient();
    await client.db(MONGODB_DB_NAME).command({ ping: 1 });
    return res.json({
      ok: true,
      geminiConfigured,
      mongoConfigured,
      database: 'connected'
    });
  } catch (error: any) {
    return res.status(503).json({
      ok: false,
      geminiConfigured,
      mongoConfigured,
      database: 'connection failed',
      message: error?.message || 'MongoDB ping failed.'
    });
  }
});

app.get('/api/blueprints', async (_req, res) => {
  try {
    const collection = await getBlueprintsCollection();
    const blueprints = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .map(stripMongoId)
      .toArray();

    return res.json(blueprints);
  } catch (error: any) {
    if (isMongoUnavailable(error)) {
      return res.status(503).json({
        error: 'Database is not available',
        message: error.message
      });
    }

    console.error('Blueprint list error:', error);
    return res.status(500).json({
      error: 'Failed to load blueprints',
      message: error?.message || 'Unknown database error.'
    });
  }
});

app.get('/api/blueprints/:id', async (req, res) => {
  try {
    const collection = await getBlueprintsCollection();
    const blueprint = stripMongoId(await collection.findOne({ id: req.params.id }));

    if (!blueprint) {
      return res.status(404).json({ error: 'Blueprint not found.' });
    }

    return res.json(blueprint);
  } catch (error: any) {
    if (isMongoUnavailable(error)) {
      return res.status(503).json({
        error: 'Database is not available',
        message: error.message
      });
    }

    console.error('Blueprint lookup error:', error);
    return res.status(500).json({
      error: 'Failed to load blueprint',
      message: error?.message || 'Unknown database error.'
    });
  }
});

app.post('/api/blueprints', async (req, res) => {
  const blueprint = req.body;

  if (!blueprint || typeof blueprint !== 'object' || typeof blueprint.id !== 'string') {
    return res.status(400).json({ error: 'A blueprint payload with an id is required.' });
  }

  try {
    await saveBlueprint(blueprint);
    return res.status(201).json(blueprint);
  } catch (error: any) {
    if (isMongoUnavailable(error)) {
      return res.status(503).json({
        error: 'Database is not available',
        message: error.message
      });
    }

    console.error('Blueprint save error:', error);
    return res.status(500).json({
      error: 'Failed to save blueprint',
      message: error?.message || 'Unknown database error.'
    });
  }
});

app.delete('/api/blueprints/:id', async (req, res) => {
  try {
    const collection = await getBlueprintsCollection();
    const result = await collection.deleteOne({ id: req.params.id });
    return res.json({ deleted: result.deletedCount === 1 });
  } catch (error: any) {
    if (isMongoUnavailable(error)) {
      return res.status(503).json({
        error: 'Database is not available',
        message: error.message
      });
    }

    console.error('Blueprint delete error:', error);
    return res.status(500).json({
      error: 'Failed to delete blueprint',
      message: error?.message || 'Unknown database error.'
    });
  }
});

// REST route to generate blueprint via Gemini
app.post('/api/generate-blueprint', async (req, res) => {
  const { concept } = req.body;

  if (!concept || typeof concept !== 'string' || concept.trim().length === 0) {
    return res.status(400).json({ error: 'Concept text is required.' });
  }

  try {
    // Attempt lazy initialization
    const ai = getGeminiClient();

    const systemInstruction = `
      You are LaunchForge AI, an expert Elite SaaS startup architect and product engineer.
      Your responsibility is to take a startup product description/concept and generate a complete, high-tech production-ready structural blueprint. No placeholder text, and no truncation. All arrays must be fully populated with detailed, realistic plans.
      Ensure the stack choice is cohesive (e.g., React and Node/Express, Next.js and Supabase, or mobile Flutter with Firebase, or Django SQL). Provide clear justifications for each tool.
    `;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        projectName: { type: Type.STRING, description: 'Descriptive, premium non-cliché product name' },
        tagline: { type: Type.STRING, description: 'Sleek, impactful slogan' },
        preferredStack: {
          type: Type.OBJECT,
          properties: {
            frontend: { type: Type.STRING, description: 'Recommended frontend technology' },
            backend: { type: Type.STRING, description: 'Recommended backend technology' },
            database: { type: Type.STRING, description: 'Recommended database system' },
            hosting: { type: Type.STRING, description: 'Recommended hosting option' }
          },
          required: ['frontend', 'backend', 'database', 'hosting']
        },
        strategy: {
          type: Type.OBJECT,
          properties: {
            targetAudience: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'List of at least 3 distinct target audience personas'
            },
            coreFeatures: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: 'Clean functional name' },
                  description: { type: Type.STRING, description: 'Deep operational description of what it does' },
                  priority: { type: Type.STRING, description: 'High, Medium, or Low' }
                },
                required: ['title', 'description', 'priority']
              },
              description: 'List of 3 to 4 core MVP feature sets'
            },
            mvpScope: { type: Type.STRING, description: 'Paragraph outlining MVP boundaries and development compromises' }
          },
          required: ['targetAudience', 'coreFeatures', 'mvpScope']
        },
        databaseSchema: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING, description: 'e.g. PostgreSQL, SQLite, MongoDB' },
            description: { type: Type.STRING, description: 'Summary of the DB approach' },
            tables: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: 'Table or collection name' },
                  columns: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING, description: 'Column or field state name' },
                        type: { type: Type.STRING, description: 'State data-type e.g. UUID, TIMESTAMP, VARCHAR' },
                        constraints: { type: Type.STRING, description: 'PK, FK relationships, indexing, or non-nullable' }
                      },
                      required: ['name', 'type', 'constraints']
                    }
                  }
                },
                required: ['name', 'columns']
              },
              description: 'At least 2 essential database tables'
            }
          },
          required: ['type', 'description', 'tables']
        },
        apiEndpoints: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              path: { type: Type.STRING, description: 'e.g. /api/v1/auth/callback' },
              method: { type: Type.STRING, description: 'GET, POST, PUT, or DELETE' },
              description: { type: Type.STRING, description: 'Functional contract description' },
              authRequired: { type: Type.BOOLEAN, description: 'Checks token' },
              requestBody: { type: Type.STRING, description: 'Example JSON string representation' },
              responseBody: { type: Type.STRING, description: 'Example JSON string representation' }
            },
            required: ['path', 'method', 'description', 'authRequired']
          },
          description: 'At least 3 core API endpoints'
        },
        frontendArchitecture: {
          type: Type.OBJECT,
          properties: {
            framework: { type: Type.STRING, description: 'Client structure details' },
            stateManagement: { type: Type.STRING, description: 'Redux, Zustand, Context, etc.' },
            cssFramework: { type: Type.STRING, description: 'CSS model' },
            componentTree: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: 'E.g., TaskCanvas, WorkspaceSidebar' },
                  type: { type: Type.STRING, description: 'E.g., Component, PageView, Layout' },
                  purpose: { type: Type.STRING, description: 'What functional role it executes' }
                },
                required: ['name', 'type', 'purpose']
              },
              description: 'At least 4 key components'
            }
          },
          required: ['framework', 'stateManagement', 'cssFramework', 'componentTree']
        },
        backendArchitecture: {
          type: Type.OBJECT,
          properties: {
            framework: { type: Type.STRING, description: 'Express, NestJS, FastAPI, etc.' },
            coreLibraries: { type: Type.ARRAY, items: { type: Type.STRING } },
            structureDescription: { type: Type.STRING, description: 'Folder layout recommendations' }
          },
          required: ['framework', 'coreLibraries', 'structureDescription']
        },
        roadmap: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              phaseName: { type: Type.STRING, description: 'Timeline block name' },
              duration: { type: Type.STRING, description: 'Duration e.g., 2 weeks' },
              objectives: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ['phaseName', 'duration', 'objectives']
          },
          description: 'A 3-step development milestone path'
        },
        techStackJustification: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              toolName: { type: Type.STRING, description: 'Technology name' },
              role: { type: Type.STRING, description: 'Architectural tier (e.g. Database, Hosting)' },
              whySelected: { type: Type.STRING, description: 'Why this tool thrives for this specific concept' }
            },
            required: ['toolName', 'role', 'whySelected']
          }
        }
      },
      required: [
        'projectName',
        'tagline',
        'preferredStack',
        'strategy',
        'databaseSchema',
        'apiEndpoints',
        'frontendArchitecture',
        'backendArchitecture',
        'roadmap',
        'techStackJustification'
      ]
    };

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: `Generate a high quality full architectural blueprint for the following startup idea:\n"${concept}"`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema
      }
    });

    const parsedJson = JSON.parse(response.text || '{}');
    const slug = parsedJson.projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = `${slug || 'blueprint'}-${Date.now()}`;
    const enrichedBlueprint = {
      id,
      ...parsedJson,
      concept,
      createdAt: new Date().toISOString()
    };

    try {
      await saveBlueprint(enrichedBlueprint);
    } catch (dbError) {
      console.error('Blueprint persistence error:', dbError);
    }

    return res.json(enrichedBlueprint);
  } catch (error: any) {
    console.error('Gemini generation error:', error);
    
    // Check if the error is specifically related to missing environment API configurations
    if (error?.message && (error.message.includes('GEMINI_API_KEY') || error.message.includes('API_KEY'))) {
      return res.status(403).json({
        error: 'Missing API key setup',
        message: error.message
      });
    }

    // Fallback blueprint metadata if server-side key lacks credentials but we are in demo playground mode
    // (We explain preview mode elegantly to the user as a fallback)
    return res.status(500).json({
      error: 'Generation failed',
      message: error?.message || 'Unknown server internal routing issues.'
    });
  }
});

// Setup Vite Development & Production Static Fallback Controllers
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[LaunchForge AI Server] Listening with precision on http://localhost:${PORT}`);
  });
}

startServer();
