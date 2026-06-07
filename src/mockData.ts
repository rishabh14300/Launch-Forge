import { Blueprint } from './types';

export const mockBlueprints: Blueprint[] = [
  {
    id: 'lumina-health',
    projectName: 'Lumina Health Portal',
    tagline: 'AI-driven patient triage and clinic dashboard system',
    concept: 'An AI-driven patient triage system prioritizing incoming requests based on symptom severity analysis and managing clinic workflow.',
    createdAt: '2026-06-07T09:38:00.000Z',
    preferredStack: {
      frontend: 'Next.js 14 / React',
      backend: 'Node.js / Express',
      database: 'PostgreSQL',
      hosting: 'AWS Cloud'
    },
    strategy: {
      targetAudience: [
        'Private clinic administrators',
        'Head triage nurses',
        'General practitioners',
        'Patients seeking virtual appointment routing'
      ],
      coreFeatures: [
        {
          title: 'Symptom Analyzer AI',
          description: 'Uses LLMs to parses patient-submitted texts, categorizes severity level, and flags urgent clinical keywords.',
          priority: 'High'
        },
        {
          title: 'Unified Queue Dashboard',
          description: 'A responsive visual interface showing waiting patients sorted dynamically by medical priority and response SLA.',
          priority: 'High'
        },
        {
          title: 'Secure EHR Connector',
          description: 'Bridges triaged records to legacy electronic health record repositories securely via standard HL7/FHIR APIs.',
          priority: 'Medium'
        },
        {
          title: 'Telemedicine Tele-Consults',
          description: 'In-app secure high-definition web consultation launcher with dynamic note-taking panel for doctors.',
          priority: 'Low'
        }
      ],
      mvpScope: 'Establish patient self-triage greeting portal, severity categorization engine, and administrative live-updating clinical triage dashboard using simple SQLite or PostgreSQL storage.'
    },
    databaseSchema: {
      type: 'PostgreSQL',
      description: 'Relational schema enforcing strict constraints, foreign-key consistency for medical logs, and column indices on priority codes.',
      tables: [
        {
          name: 'patients',
          columns: [
            { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY, DEFAULT gen_random_uuid()' },
            { name: 'full_name', type: 'VARCHAR(255)', constraints: 'NOT NULL' },
            { name: 'dob', type: 'DATE', constraints: 'NOT NULL' },
            { name: 'insurance_id', type: 'VARCHAR(100)', constraints: 'UNIQUE' },
            { name: 'created_at', type: 'TIMESTAMP', constraints: 'DEFAULT now()' }
          ]
        },
        {
          name: 'triage_requests',
          columns: [
            { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY' },
            { name: 'patient_id', type: 'UUID', constraints: 'REFERENCES patients(id) ON DELETE CASCADE' },
            { name: 'symptoms_raw', type: 'TEXT', constraints: 'NOT NULL' },
            { name: 'priority_score', type: 'INTEGER', constraints: 'CHECK(priority_score BETWEEN 1 AND 5)' },
            { name: 'triage_class', type: 'VARCHAR(50)', constraints: 'NOT NULL (Urgent, Moderate, Routinary)' },
            { name: 'status', type: 'VARCHAR(20)', constraints: "DEFAULT 'pending' CHECK(status IN ('pending', 'in_progress', 'resolved'))" },
            { name: 'created_at', type: 'TIMESTAMP', constraints: 'DEFAULT now()' }
          ]
        },
        {
          name: 'consultations',
          columns: [
            { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY' },
            { name: 'triage_request_id', type: 'UUID', constraints: 'REFERENCES triage_requests(id)' },
            { name: 'doctor_notes', type: 'TEXT', constraints: 'NULL' },
            { name: 'prescription_json', type: 'JSONB', constraints: 'NULL' },
            { name: 'scheduled_time', type: 'TIMESTAMP', constraints: 'NOT NULL' }
          ]
        }
      ]
    },
    apiEndpoints: [
      {
        path: '/api/v1/patients/register',
        method: 'POST',
        description: 'Creates a new patient profile associated with their email and personal ID.',
        authRequired: false,
        requestBody: '{\n  "fullName": "Jane Doe",\n  "dob": "1994-08-12",\n  "insuranceId": "INS-49382"\n}',
        responseBody: '{\n  "success": true,\n  "patientId": "8f3b92-493a-4a7a-9cb1-e8d93f"\n}'
      },
      {
        path: '/api/v1/triage/submit',
        method: 'POST',
        description: 'Receives symptom descriptions, triggers deep AI analysis, saves records, and issues prioritizations.',
        authRequired: true,
        requestBody: '{\n  "patientId": "8f3b92-...",\n  "symptoms": "Severe headache accompanied by blurred vision and localized light sensitivity for 4 hours."\n}',
        responseBody: '{\n  "requestId": "902d31-...",\n  "priorityScore": 5,\n  "classification": "Urgent",\n  "suggestedAction": "Immediate clinical routing"\n}'
      },
      {
        path: '/api/v1/clinical/queue',
        method: 'GET',
        description: 'Returns active lists of triage requests waiting to be attended, filtered and sorted by urgent priority score.',
        authRequired: true,
        responseBody: '[\n  {\n    "id": "902d31-...",\n    "patientName": "Jane Doe",\n    "priorityScore": 5,\n    "classification": "Urgent",\n    "created_at": "2026-06-07T10:00:00Z"\n  }\n]'
      }
    ],
    frontendArchitecture: {
      framework: 'Next.js 14 App Router',
      stateManagement: 'Zustand (Global client queue state and websocket live listener)',
      cssFramework: 'Tailwind CSS v4 (Custom theme variable injection)',
      componentTree: [
        { name: 'TriageGreetingForm', type: 'Component', purpose: 'Self-guided smart multi-step triage layout for patient symptom submittals.' },
        { name: 'ClinicalDashboard', type: 'PageView', purpose: 'Administrative split-pane navigation with real-time websocket queues.' },
        { name: 'PatientDetailsPane', type: 'Component', purpose: 'Side-drawer overlay highlighting patient history, EHR records, and AI sentiment analysis summary.' },
        { name: 'VideoCallConsole', type: 'ModalWorkspace', purpose: 'Embeds WebRTC interactive consultations directly in browser alongside EHR panels.' }
      ]
    },
    backendArchitecture: {
      framework: 'Node.js with TypeScript and Express',
      coreLibraries: [
        '@google/genai (Triage analysis)',
        'drizzle-orm (PostgreSQL interfacing)',
        'ws (Real-time queue notifications)',
        'jose (JWT creation and authorization verification)'
      ],
      structureDescription: 'Clean controller-service-repository backend structure separating AI API integration logic from core persistent database models.'
    },
    roadmap: [
      {
        phaseName: 'Phase 1 - Prototype Core AI Engine',
        duration: '3 Weeks',
        objectives: [
          'Wire up clinical symptom intake webform.',
          'Connect symptoms backend API with server-side Google GenAI (Gemini-3.5-flash).',
          'Benchmark severity routing speed against certified clinical test scenarios.'
        ]
      },
      {
        phaseName: 'Phase 2 - Live Clinic Operations',
        duration: '4 Weeks',
        objectives: [
          'Build WebSockets integration to push queue additions immediately in dashboards.',
          'Add security layer for telehealth channels following HIPAA patterns.'
        ]
      },
      {
        phaseName: 'Phase 3 - Scale & Legacy Integrations',
        duration: '6 Weeks',
        objectives: [
          'Introduce offline local-first state recovery capabilities.',
          'Implement OAuth portals for enterprise medical institution authentication.'
        ]
      }
    ],
    techStackJustification: [
      {
        toolName: 'Next.js 14 / React',
        role: 'Frontend Layer',
        whySelected: 'Enables high SEO landing cards with exceptionally fast, secure medical dashboard loads using Server Components.'
      },
      {
        toolName: 'PostgreSQL',
        role: 'Database Layer',
        whySelected: 'Industry-standard relational security compliance, complete transaction safety levels, and natural compatibility with advanced JSONB data storage.'
      },
      {
        toolName: 'Gemini-3.5-flash',
        role: 'AI / Routing',
        whySelected: 'Outstanding cost-to-performance efficiency for immediate clinical classifications and natural-language summaries.'
      }
    ]
  },
  {
    id: 'task-orbit',
    projectName: 'TaskOrbit Taskmaster',
    tagline: 'Collaborative task planner with automated project dependency blueprints',
    concept: 'A centralized agile workflow planner that analyzes team descriptions, dynamically maps dependency diagrams, and outlines product blue prints.',
    createdAt: '2026-06-06T15:00:00.000Z',
    preferredStack: {
      frontend: 'React / Vite SPA',
      backend: 'Node.js / Express',
      database: 'PostgreSQL',
      hosting: 'Vercel / Supabase'
    },
    strategy: {
      targetAudience: [
        'Agile development squads',
        'Scrum masters',
        'Product managers mapping dependencies',
        'SaaS technical leaders'
      ],
      coreFeatures: [
        {
          title: 'Automated Dependency Graphs',
          description: 'Constructs node diagrams demonstrating which engineering stories block subsequent releases.',
          priority: 'High'
        },
        {
          title: 'Intelligent Epic Scaffolder',
          description: 'Takes single-line epic prompts and spits out 10+ detailed Jira/GitHub issues with dependencies already configured.',
          priority: 'High'
        },
        {
          title: 'Dynamic Resource Balancer',
          description: 'Predicts dev burnout by assessing workload distributions and sprint delays based on historical logs.',
          priority: 'Medium'
        }
      ],
      mvpScope: 'Core focus is interactive React Gantt/nodes canvas, and epic auto-builder calling Gemini backend APIs for subtask maps.'
    },
    databaseSchema: {
      type: 'PostgreSQL',
      description: 'Hierarchical relational schema holding recursive self-referential rows for task blockades and epic groupings.',
      tables: [
        {
          name: 'users',
          columns: [
            { name: 'id', type: 'SERIAL', constraints: 'PRIMARY KEY' },
            { name: 'email', type: 'VARCHAR(150)', constraints: 'UNIQUE NOT NULL' },
            { name: 'role', type: 'VARCHAR(50)', constraints: 'NOT NULL' }
          ]
        },
        {
          name: 'tasks',
          columns: [
            { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY' },
            { name: 'title', type: 'VARCHAR(200)', constraints: 'NOT NULL' },
            { name: 'status', type: 'VARCHAR(30)', constraints: 'NOT NULL' },
            { name: 'epic_id', type: 'UUID', constraints: 'NULL' }
          ]
        },
        {
          name: 'dependencies',
          columns: [
            { name: 'task_id', type: 'UUID', constraints: 'REFERENCES tasks(id) ON DELETE CASCADE' },
            { name: 'depends_on_task_id', type: 'UUID', constraints: 'REFERENCES tasks(id) ON DELETE CASCADE' },
            { name: 'id', type: 'VARCHAR(10)', constraints: 'PRIMARY KEY (task_id, depends_on_task_id)' }
          ]
        }
      ]
    },
    apiEndpoints: [
      {
        path: '/api/v1/tasks/create',
        method: 'POST',
        description: 'Saves an individual task and registers blocking relationships.',
        authRequired: true,
        requestBody: '{\n  "title": "Database Setup",\n  "status": "todo",\n  "dependentOn": []\n}',
        responseBody: '{\n  "success": true,\n  "taskId": "a93b21-..."\n}'
      },
      {
        path: '/api/v1/epics/scaffold',
        method: 'POST',
        description: 'Passes epic details to Gemini and streams back complete markdown checklists of sub-tasks.',
        authRequired: true,
        requestBody: '{\n  "epicPrompt": "Launch OAuth logins for 3 providers"\n}',
        responseBody: '{\n  "epicId": "c93b12-...",\n  "suggestedTasks": [\n    { "title": "Setup client keys", "dependsOn": [] },\n    { "title": "Configure JWT store", "dependsOn": ["Setup client keys"] }\n  ]\n}'
      }
    ],
    frontendArchitecture: {
      framework: 'React 18 with Vite build',
      stateManagement: 'Redux Toolkit for real-time multiplayer board coordinates',
      cssFramework: 'Tailwind CSS v4 with fluid bento styling',
      componentTree: [
        { name: 'BoardCanvasContainer', type: 'WrapperView', purpose: 'Main interactive playground surface wrapper.' },
        { name: 'DependencyNodeLinker', type: 'CanvasDrawer', purpose: 'Renders vectors directly connecting blocked cards.' },
        { name: 'EpicAutoScaffolder', type: 'ModalForm', purpose: 'Text prompt overlay requesting structural tasks.' }
      ]
    },
    backendArchitecture: {
      framework: 'NestJS Framework',
      coreLibraries: [
        '@nestjs/cqrs',
        'typeorm',
        '@google/genai'
      ],
      structureDescription: 'Sturdy NestJS domain architectural setup using the Repository Pattern and clean Command-Query Separation models.'
    },
    roadmap: [
      {
        phaseName: 'Phase 1 - Infinite Canvas Board',
        duration: '4 Weeks',
        objectives: [
          'Setup react-flow viewport supporting drag-and-drop workflow nodes.',
          'Verify instant reactive connection render performance.'
        ]
      }
    ],
    techStackJustification: [
      {
        toolName: 'React / Vite',
        role: 'User Experience',
        whySelected: 'Ultra-fast rendering loop and exceptional performance during intensive canvas updates.'
      },
      {
        toolName: 'NestJS',
        role: 'Backend Core',
        whySelected: 'En forces strict, enterprise-wide code standards reducing scaffolding inconsistencies during multi-dev alignments.'
      }
    ]
  }
];
