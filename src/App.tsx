import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HomeView from './components/HomeView';
import DashboardView from './components/DashboardView';
import BlueprintView from './components/BlueprintView';
import { mockBlueprints } from './mockData';
import { Blueprint } from './types';
import { Compass, LayoutDashboard, Sparkles, Settings as SettingsIcon, AlertCircle } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'blueprints'>('home');
  const [blueprints, setBlueprints] = useState<Blueprint[]>([]);
  const [selectedBlueprint, setSelectedBlueprint] = useState<Blueprint | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Load plans from the backend first, then use local cache or demo data as a fallback.
  useEffect(() => {
    let isMounted = true;

    const loadBlueprints = async () => {
      try {
        const response = await fetch('/api/blueprints');
        if (!response.ok) {
          throw new Error('Backend archive is unavailable.');
        }

        const savedBlueprints: Blueprint[] = await response.json();
        if (!isMounted) return;

        if (savedBlueprints.length > 0) {
          setBlueprints(savedBlueprints);
          localStorage.setItem('launchforge_blueprints', JSON.stringify(savedBlueprints));
        } else {
          setBlueprints(mockBlueprints);
        }
      } catch (err) {
        const cached = localStorage.getItem('launchforge_blueprints');
        if (!isMounted) return;

        if (cached) {
          try {
            setBlueprints(JSON.parse(cached));
          } catch {
            setBlueprints(mockBlueprints);
          }
        } else {
          setBlueprints(mockBlueprints);
        }
      }
    };

    loadBlueprints();

    return () => {
      isMounted = false;
    };
  }, []);

  // Save changes to localStorage cache
  const saveAndSetBlueprints = (newBlueprints: Blueprint[]) => {
    setBlueprints(newBlueprints);
    localStorage.setItem('launchforge_blueprints', JSON.stringify(newBlueprints));
  };

  const persistBlueprint = async (blueprint: Blueprint) => {
    try {
      await fetch('/api/blueprints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blueprint)
      });
    } catch (err) {
      console.warn('Blueprint could not be saved to the backend archive:', err);
    }
  };

  const handleGenerateBlueprint = async (prompt: string) => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/generate-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concept: prompt })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || 'Server returned an error.');
      }

      const generated: Blueprint = await response.json();

      // Successfully generated plan! Enforce state insert
      const updated = [generated, ...blueprints];
      saveAndSetBlueprints(updated);
      setSelectedBlueprint(generated);
      setCurrentView('blueprints');
    } catch (err: any) {
      console.error('Frontend generation failure:', err);
      
      // Graceful Sandbox Mode Fallback:
      // If the backend key isn't configured, we construct a high-fidelity procedural blueprint matching and respecting user inputs
      // so the preview remains interactive, gorgeous, and informative without locking!
      const mockProjName = prompt.trim().split(' ').slice(0, 3).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ').replace(/[^a-zA-Z0-9 ]/g, '') || 'Creative Idea Project';
      
      const fallbackBlueprint: Blueprint = {
        id: `fall-${Date.now()}`,
        projectName: `${mockProjName} Demo Sandbox`,
        tagline: 'Procedural Sandbox Blueprint (Missing Live API Key Setup)',
        concept: prompt,
        createdAt: new Date().toISOString(),
        preferredStack: {
          frontend: 'React & Tailwind CSS',
          backend: 'Node.js / Express Server',
          database: 'PostgreSQL',
          hosting: 'Cloud Container Deployment'
        },
        strategy: {
          targetAudience: [
            'Niche startup consumers described in prompt',
            'SaaS engineering operators looking for agile architectures',
            'Seed stage venture funding prospect viewers'
          ],
          coreFeatures: [
            {
              title: 'Core Engine Scaffold',
              description: `A fully operational micro-channel tailored to execute the primary prompt directives: "${prompt.slice(0, 80)}..."`,
              priority: 'High'
            },
            {
              title: 'Client Workbench Dashboard',
              description: 'A responsive administrative page that displays real-time persistent data and lets admins perform CRUD operations.',
              priority: 'High'
            },
            {
              title: 'Relational Database Migrator',
              description: 'Ensures structured schemas scale up seamlessly via persistent Docker instances and ORM configurations.',
              priority: 'Medium'
            }
          ],
          mvpScope: `Establish core functional routes to perform central task actions described on "${prompt.slice(0, 100)}..." using standard client local state fallback caches.`
        },
        databaseSchema: {
          type: 'PostgreSQL',
          description: 'A standard relational schema structured to hold transactional states, foreign keys, and indexed query tables.',
          tables: [
            {
              name: 'users',
              columns: [
                { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY' },
                { name: 'email', type: 'VARCHAR(150)', constraints: 'UNIQUE NOT NULL' },
                { name: 'created_at', type: 'TIMESTAMP', constraints: 'DEFAULT now()' }
              ]
            },
            {
              name: 'workbench_logs',
              columns: [
                { name: 'id', type: 'SERIAL', constraints: 'PRIMARY KEY' },
                { name: 'user_id', type: 'UUID', constraints: 'REFERENCES users(id)' },
                { name: 'payload_state', type: 'JSONB', constraints: 'NOT NULL' },
                { name: 'created_at', type: 'TIMESTAMP', constraints: 'DEFAULT now()' }
              ]
            }
          ]
        },
        apiEndpoints: [
          {
            path: '/api/v1/auth/session',
            method: 'GET',
            description: 'Returns active session metadata and decodes authorization payloads.',
            authRequired: true,
            responseBody: '{\n  "loggedIn": true,\n  "role": "admin",\n  "expires": "2026-06-14T11:40:00Z"\n}'
          },
          {
            path: '/api/v1/workbench/sync',
            method: 'POST',
            description: 'Receives custom data attributes, performs validation, and updates persistent schemas.',
            authRequired: true,
            requestBody: '{\n  "logField": "Demo sample logs"\n}',
            responseBody: '{\n  "synchronized": true,\n  "insertedRowsCount": 1\n}'
          }
        ],
        frontendArchitecture: {
          framework: 'Vite React Framework',
          stateManagement: 'React global context hooks',
          cssFramework: 'Tailwind CSS v4 standard templates',
          componentTree: [
            { name: 'AppContainerLayout', type: 'Layout', purpose: 'Root window organizing the sidebar and core content viewports.' },
            { name: 'ConceptInteractiveInput', type: 'Component', purpose: 'Handles text prompting and launches RESTful server blueprints calls.' },
            { name: 'DataGridPreviewTable', type: 'Component', purpose: 'Provides filterable rows showing generated DB collections.' }
          ]
        },
        backendArchitecture: {
          framework: 'Express API Server',
          coreLibraries: ['@google/genai', 'express', 'dotenv'],
          structureDescription: 'Controller-route folder structure segregating external integrations from server models.'
        },
        roadmap: [
          {
            phaseName: 'Phase 1 - Sandbox Deployment',
            duration: '2 Weeks',
            objectives: [
              'Deploy responsive visual mockup dashboards.',
              'Verify client-side local caching performance.',
              'Secure actual Gemini credentials to replace sandbox placeholders.'
            ]
          }
        ],
        techStackJustification: [
          {
            toolName: 'React & Tailwind v4',
            role: 'User Interface',
            whySelected: 'Enables incredible layout scaling and speed, producing beautiful high-contrast interfaces.'
          }
        ]
      };

      setErrorMsg(err.message || 'Server connection timed out.');
      
      // Inject fallback blueprint for Sandbox preview
      const updated = [fallbackBlueprint, ...blueprints];
      saveAndSetBlueprints(updated);
      persistBlueprint(fallbackBlueprint);
      setSelectedBlueprint(fallbackBlueprint);
      setCurrentView('blueprints');
    } finally {
      setIsLoading(false);
    }
  };

  const selectBlueprint = (bp: Blueprint) => {
    setSelectedBlueprint(bp);
    setCurrentView('blueprints');
  };

  return (
    <div className="min-h-screen bg-[#0d0e15] text-[#e3e1ec] font-sans antialiased flex flex-col md:flex-row select-none">
      {/* Mobile Top AppBar */}
      <Header
        onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        onNavigate={(view) => {
          setSelectedBlueprint(null);
          setCurrentView(view);
        }}
      />

      {/* Navigation Drawer (Web & Mobile Hybrid) */}
      <Sidebar
        currentView={selectedBlueprint ? 'blueprints' : currentView}
        onNavigate={(view) => {
          setSelectedBlueprint(null);
          setCurrentView(view);
        }}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onOpenNewBlueprint={() => {
          setSelectedBlueprint(null);
          setCurrentView('dashboard');
        }}
      />

      {/* Main content canvas canvas viewport */}
      <main className="flex-grow md:ml-72 pt-16 md:pt-0 flex flex-col justify-between min-h-screen relative">
        <div className="flex-grow w-full py-6">
          {/* Header indicator toolbar for desktop */}
          <div className="hidden md:flex justify-between items-center px-8 py-4 border-b border-zinc-900 bg-zinc-950/20 backdrop-blur-md mb-8">
            <span className="text-xs font-mono text-zinc-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              LaunchForge Engine active
            </span>

            <span className="text-xs font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl">
              Press <kbd className="bg-zinc-800 text-zinc-300 px-1 py-0.5 rounded text-[10px]">CMD + K</kbd> to search blueprints
            </span>
          </div>

          {/* Conditional route views switching */}
          {selectedBlueprint ? (
            <BlueprintView
              blueprint={selectedBlueprint}
              onBack={() => {
                setSelectedBlueprint(null);
                setCurrentView('dashboard');
              }}
            />
          ) : currentView === 'home' ? (
            <HomeView
              onStartClick={() => setCurrentView('dashboard')}
              onViewDemoClick={() => {
                const demo = blueprints.find((b) => b.id === 'lumina-health');
                if (demo) {
                  selectBlueprint(demo);
                } else if (blueprints.length > 0) {
                  selectBlueprint(blueprints[0]);
                } else {
                  setCurrentView('dashboard');
                }
              }}
            />
          ) : (
            <DashboardView
              blueprints={blueprints}
              onSelectBlueprint={selectBlueprint}
              onGenerate={handleGenerateBlueprint}
              isLoading={isLoading}
              errorMsg={errorMsg}
            />
          )}
        </div>

        {/* Global Footer */}
        <footer className="w-full py-8 px-6 md:px-8 border-t border-zinc-900/60 flex flex-col sm:flex-row justify-between items-center bg-zinc-950/20 gap-4 mt-12">
          <div className="text-xs text-zinc-500 font-mono">
            &copy; 2026 LaunchForge AI. Built for precision.
          </div>
          <div className="flex gap-6 text-xs text-zinc-500 font-medium">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of service</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Solutions</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Status</a>
          </div>
        </footer>
      </main>

      {/* Bottom navbar navigation (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-zinc-950/95 backdrop-blur-2xl border-t border-zinc-800/60 flex justify-around items-center z-40 pb-safe shadow-[0_-8px_32px_rgba(0,0,0,0.4)]">
        <button
          onClick={() => {
            setSelectedBlueprint(null);
            setCurrentView('home');
          }}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
            currentView === 'home' && !selectedBlueprint ? 'text-blue-400' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] uppercase font-semibold tracking-wider font-sans">Explore</span>
        </button>

        <button
          onClick={() => {
            setSelectedBlueprint(null);
            setCurrentView('dashboard');
          }}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
            currentView === 'dashboard' || selectedBlueprint ? 'text-blue-400' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] uppercase font-semibold tracking-wider font-sans">Dashboard</span>
        </button>

        <button
          onClick={() => {
            alert('Custom user credentials workspace settings is active.');
          }}
          className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300 cursor-pointer"
        >
          <SettingsIcon className="w-5 h-5" />
          <span className="text-[10px] uppercase font-semibold tracking-wider font-sans font-medium">Settings</span>
        </button>
      </nav>
    </div>
  );
}
