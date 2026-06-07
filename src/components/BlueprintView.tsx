import React, { useState } from 'react';
import { Blueprint } from '../types';
import {
  Sparkles,
  ArrowLeft,
  Users,
  Cpu,
  Database,
  Terminal,
  Layers,
  Map,
  CheckCircle2,
  Calendar,
  Lock,
  Eye,
  EyeOff,
  Server
} from 'lucide-react';

interface BlueprintViewProps {
  blueprint: Blueprint;
  onBack: () => void;
}

type TabType =
  | 'overview'
  | 'features'
  | 'database'
  | 'api'
  | 'frontend'
  | 'backend'
  | 'roadmap'
  | 'techstack';

export default function BlueprintView({ blueprint, onBack }: BlueprintViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [expandedEndpoints, setExpandedEndpoints] = useState<Record<number, boolean>>({});

  const toggleEndpoint = (idx: number) => {
    setExpandedEndpoints((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'features', label: 'Features', icon: Users },
    { id: 'database', label: 'Database Schema', icon: Database },
    { id: 'api', label: 'API Endpoints', icon: Terminal },
    { id: 'frontend', label: 'Frontend', icon: Layers },
    { id: 'backend', label: 'Backend', icon: Server },
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'techstack', label: 'Tech Stack Choice', icon: Cpu }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 py-8 px-4 md:px-8 animate-fade-in text-art-ink">
      {/* Back button and title strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-art-ink">
        <div className="flex items-start gap-4">
          <button
            onClick={onBack}
            className="p-3 bg-white border border-art-ink text-art-ink hover:text-white hover:bg-art-ink transition-colors cursor-pointer rounded-none shadow-[2px_2px_0px_0px_rgba(17,17,17,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-black text-art-ink uppercase tracking-tight font-sans">
                {blueprint.projectName}
              </h1>
              <span className="w-3.5 h-3.5 bg-art-accent border border-art-ink inline-block" />
            </div>
            <p className="text-art-ink/70 text-sm font-semibold uppercase tracking-wider mt-0.5">{blueprint.tagline}</p>
          </div>
        </div>

        {/* Created date / Stack badges */}
        <div className="flex flex-wrap gap-2.5 self-start sm:self-center">
          <span className="px-3 py-1.5 rounded-none bg-white border border-art-ink text-art-ink text-xs font-mono font-black flex items-center gap-1.5 uppercase">
            <Calendar className="w-3.5 h-3.5 text-art-accent" />
            {new Date(blueprint.createdAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
          <span className="px-3 py-1.5 rounded-none bg-art-accent border border-art-ink text-white text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(17,17,17,1)]">
            {blueprint.preferredStack.database}
          </span>
        </div>
      </div>

      {/* Navigation tab bar */}
      <div className="flex flex-nowrap overflow-x-auto gap-0.5 border border-art-ink bg-art-ink p-1 rounded-none shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-wider whitespace-nowrap cursor-pointer transition-all duration-150 ${
                isActive
                  ? 'bg-art-accent text-white font-black'
                  : 'bg-white text-art-ink hover:bg-art-bg/80'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab window content areas */}
      <div className="min-h-[400px]">
        {/* Tab 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-8">
            <div className="bg-white border border-art-ink p-6 rounded-none shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">
                Startup Concept Prompt
              </h3>
              <p className="text-art-ink/90 leading-relaxed font-serif italic bg-art-bg p-4 rounded-none border border-art-ink">
                "{blueprint.concept}"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Target audiences */}
              <div className="md:col-span-1 bg-white border border-art-ink p-6 rounded-none shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] flex flex-col gap-4">
                <h3 className="text-xs font-black text-art-ink uppercase tracking-widest flex items-center gap-2">
                  <Users className="w-4 h-4 text-art-accent" />
                  DEMOGRAPHICS
                </h3>
                <ul className="flex flex-col gap-3">
                  {blueprint.strategy.targetAudience.map((audience, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start text-xs font-semibold text-art-ink/80 leading-relaxed">
                      <span className="w-1.5 h-1.5 bg-art-accent border border-art-ink mt-1.5 flex-shrink-0" />
                      {audience}
                    </li>
                  ))}
                </ul>
              </div>

              {/* MVP Scope and compromisation */}
              <div className="md:col-span-2 bg-white border border-art-ink p-6 rounded-none shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] flex flex-col gap-4">
                <h3 className="text-xs font-black text-art-ink uppercase tracking-widest">// MVP SCOPE & ROADBOUNDS</h3>
                <p className="text-art-ink/80 text-sm leading-relaxed font-sans font-medium">
                  {blueprint.strategy.mvpScope}
                </p>
                <div className="mt-auto bg-art-bg p-4 border border-art-ink rounded-none flex items-center justify-between text-xs font-black uppercase tracking-wider">
                  <span className="text-art-ink/65">// STACK MATRIX:</span>
                  <div className="flex gap-2 font-mono text-[10px]">
                    <span className="bg-white px-2 py-1 text-art-ink border border-art-ink">{blueprint.preferredStack.frontend}</span>
                    <span className="bg-white px-2 py-1 text-art-ink border border-art-ink">{blueprint.preferredStack.backend}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: FEATURES */}
        {activeTab === 'features' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blueprint.strategy.coreFeatures.map((feature, idx) => {
              const pStr = feature.priority;
              const pBg =
                pStr === 'High'
                  ? 'bg-art-accent text-white border-art-ink font-black'
                  : pStr === 'Medium'
                  ? 'bg-art-bg text-art-ink border-art-ink'
                  : 'bg-white text-art-ink border-art-ink';

              return (
                <div
                  key={idx}
                  className="bg-white border border-art-ink p-6 rounded-none shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(17,17,17,1)] flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex justify-between items-center mb-3 gap-2">
                      <h3 className="text-sm font-black text-art-ink uppercase tracking-wide">{feature.title}</h3>
                      <span className={`px-2.5 py-0.5 rounded-none border text-[9px] uppercase font-mono tracking-widest ${pBg}`}>
                        {feature.priority} Priority
                      </span>
                    </div>
                    <p className="text-art-ink/85 text-xs sm:text-sm leading-relaxed font-medium">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: DATABASE SCHEMA */}
        {activeTab === 'database' && (
          <div className="flex flex-col gap-6">
            <div className="bg-white border border-art-ink p-6 rounded-none shadow-[4px_4px_0px_0px_rgba(17,17,17,1)]">
              <h3 className="text-xs font-black text-art-ink uppercase tracking-widest mb-2">
                Database Stack Approach ({blueprint.databaseSchema.type})
              </h3>
              <p className="text-art-ink/80 text-xs sm:text-sm leading-relaxed font-medium">
                {blueprint.databaseSchema.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {blueprint.databaseSchema.tables.map((table, tIdx) => (
                <div key={tIdx} className="bg-white border-2 border-art-ink rounded-none overflow-hidden shadow-[4px_4px_0px_0px_rgba(17,17,17,1)]">
                  {/* Table title segment */}
                  <div className="bg-art-bg px-4 py-3 border-b border-art-ink flex justify-between items-center">
                    <span className="font-mono text-xs font-black text-art-ink flex items-center gap-2 uppercase tracking-wider">
                      <Database className="w-3.5 h-3.5 text-art-accent" />
                      {table.name}
                    </span>
                    <span className="text-[9px] uppercase font-black tracking-widest text-[#FF3D00] bg-white border border-art-ink px-1.5 py-0.5">
                      {blueprint.databaseSchema.type === 'PostgreSQL' ? 'SQL TABLE' : 'SCHEMALESS'}
                    </span>
                  </div>

                  {/* Columns listing */}
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-art-ink bg-art-bg/20 text-art-ink/50 font-black text-[9px] uppercase tracking-widest">
                        <th className="px-4 py-2">// FIELD</th>
                        <th className="px-4 py-2">// TYPE</th>
                        <th className="px-4 py-2">// CONFIG</th>
                      </tr>
                    </thead>
                    <tbody className="font-semibold text-art-ink">
                      {table.columns.map((col, cIdx) => (
                        <tr key={cIdx} className="border-b border-art-ink/10 hover:bg-art-bg/30">
                          <td className="px-4 py-2.5 font-mono text-xs font-black tracking-tight text-art-ink select-all">
                            {col.name}
                          </td>
                          <td className="px-4 py-2.5 font-mono text-art-accent font-bold">
                            {col.type}
                          </td>
                          <td className="px-4 py-2.5 text-art-ink/70 font-mono text-[10px]">
                            {col.constraints}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: API ENDPOINTS */}
        {activeTab === 'api' && (
          <div className="flex flex-col gap-4">
            {blueprint.apiEndpoints.map((ep, idx) => {
              const isExpanded = !!expandedEndpoints[idx];
              const mStr = ep.method;
              const mBg =
                mStr === 'GET'
                  ? 'bg-white text-art-ink border-art-ink'
                  : mStr === 'POST'
                  ? 'bg-art-accent text-white border-art-ink'
                  : 'bg-art-bg text-art-ink border-art-ink';

              return (
                <div
                  key={idx}
                  className="bg-white border border-art-ink rounded-none overflow-hidden shadow-[3px_3px_0px_0px_rgba(17,17,17,1)] hover:border-art-ink transition-colors"
                >
                  {/* Title contract bar */}
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-art-bg/25">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`px-2.5 py-1 text-xs font-mono font-black border uppercase tracking-wider ${mBg}`}>
                        {ep.method}
                      </span>
                      <span className="font-mono text-xs sm:text-sm font-black text-art-ink select-all p-1 bg-white border border-art-ink rounded-none">
                        {ep.path}
                      </span>
                    </div>

                    <div className="flex items-center gap-3.5 self-end sm:self-center">
                      {ep.authRequired && (
                        <span className="px-2 py-0.5 rounded-none bg-white border border-art-ink text-[9px] font-black uppercase tracking-widest text-art-ink flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5 text-art-accent" />
                          VERIFY JWT
                        </span>
                      )}
                      <button
                        onClick={() => toggleEndpoint(idx)}
                        className="px-3 py-1 bg-white border border-art-ink hover:bg-art-bg rounded-none text-[10px] font-black uppercase tracking-widest text-[#FF3D00] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {isExpanded ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5 text-art-ink" />
                            HIDE MOCK
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5 " />
                            SHOW MOCK
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Route descriptions */}
                  <div className="p-4 border-t border-art-ink font-medium">
                    <p className="text-art-ink/80 text-xs sm:text-sm leading-relaxed">
                      {ep.description}
                    </p>
                  </div>

                  {/* Collapsible Payload Blocks */}
                  {isExpanded && (
                    <div className="p-4 border-t border-art-ink bg-art-bg/30 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {ep.requestBody && (
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[9px] font-black text-art-ink/50 uppercase tracking-widest">// API REQUEST LOG:</span>
                          <pre className="p-3 bg-white border border-art-ink font-mono text-xs text-art-accent overflow-x-auto text-left select-all font-semibold font-bold">
                            <code>{ep.requestBody}</code>
                          </pre>
                        </div>
                      )}
                      {ep.responseBody && (
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[9px] font-black text-art-ink/50 uppercase tracking-widest">// API RESPONSE LOG:</span>
                          <pre className="p-3 bg-white border border-art-ink font-mono text-xs text-art-ink overflow-x-auto text-left select-all font-semibold font-bold">
                            <code>{ep.responseBody}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 5: FRONTEND ARCHITECTURE */}
        {activeTab === 'frontend' && (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-art-ink p-6 rounded-none shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] flex flex-col gap-3">
                <span className="text-[10px] text-art-ink/40 font-mono font-black uppercase tracking-widest">// WORKSPACE ENVIRONMENT</span>
                <h4 className="text-sm font-black text-art-ink uppercase">{blueprint.frontendArchitecture.framework}</h4>
              </div>
              <div className="bg-white border border-art-ink p-6 rounded-none shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] flex flex-col gap-3">
                <span className="text-[10px] text-art-ink/40 font-mono font-black uppercase tracking-widest">// STATE MATRIX STORE</span>
                <h4 className="text-sm font-black text-art-accent uppercase">{blueprint.frontendArchitecture.stateManagement}</h4>
              </div>
              <div className="bg-white border border-art-ink p-6 rounded-none shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] flex flex-col gap-3">
                <span className="text-[10px] text-art-ink/40 font-mono font-black uppercase tracking-widest">// SHEET PARADIGM STYLE</span>
                <h4 className="text-sm font-black text-art-ink uppercase">{blueprint.frontendArchitecture.cssFramework}</h4>
              </div>
            </div>

            <div className="bg-white border border-art-ink rounded-none p-6 flex flex-col gap-4 shadow-[4px_4px_0px_0px_rgba(17,17,17,1)]">
              <h3 className="text-xs font-black text-art-ink uppercase tracking-widest mb-1">
                Recommended Component Tree &amp; Views Structure
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blueprint.frontendArchitecture.componentTree.map((comp, idx) => (
                  <div key={idx} className="bg-art-bg border border-art-ink p-4 rounded-none flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded-none text-[8px] bg-art-ink text-white font-mono font-black uppercase border border-art-ink mt-0.5 whitespace-nowrap">
                      {comp.type}
                    </span>
                    <div>
                      <h4 className="font-mono text-xs font-black text-art-ink uppercase">{comp.name}</h4>
                      <p className="text-art-ink/75 text-xs mt-1 leading-relaxed font-semibold">{comp.purpose}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: BACKEND ARCHITECTURE */}
        {activeTab === 'backend' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
            <div className="md:col-span-1 flex flex-col gap-6">
              <div className="bg-white border border-art-ink p-6 rounded-none shadow-[4px_4px_0px_0px_rgba(17,17,17,1)]">
                <h3 className="text-xs font-black text-art-ink uppercase tracking-widest mb-3">
                  Core Framework
                </h3>
                <h4 className="text-sm font-black text-art-ink font-mono bg-art-bg px-3 py-2 border border-art-ink flex items-center justify-between uppercase">
                  {blueprint.backendArchitecture.framework}
                  <Server className="w-4 h-4 text-art-accent" />
                </h4>
              </div>

              <div className="bg-white border border-art-ink p-6 rounded-none shadow-[4px_4px_0px_0px_rgba(17,17,17,1)]">
                <h3 className="text-xs font-black text-art-ink uppercase tracking-widest mb-3">
                  SDK Dependencies
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {blueprint.backendArchitecture.coreLibraries.map((lib, xIdx) => (
                    <li
                      key={xIdx}
                      className="px-2.5 py-1 rounded-none bg-art-bg border border-art-ink font-mono text-[9px] font-bold text-art-ink uppercase"
                    >
                      {lib}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-2 bg-white border border-art-ink p-6 rounded-none shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] flex flex-col gap-3">
              <h3 className="text-xs font-black text-art-ink uppercase tracking-widest">
                Service/Repository Directory Blueprint
              </h3>
              <p className="text-art-ink leading-relaxed whitespace-pre-line bg-art-bg p-4 border border-art-ink font-mono text-xs select-all text-left uppercase leading-normal font-bold">
                {blueprint.backendArchitecture.structureDescription}
              </p>
            </div>
          </div>
        )}

        {/* Tab 7: ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="flex flex-col gap-6 animate-slide-up">
            {blueprint.roadmap.map((phase, pIdx) => (
              <div
                key={pIdx}
                className="bg-white border border-art-ink p-6 rounded-none shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] flex flex-col md:flex-row gap-6 hover:border-art-ink transition-colors"
              >
                {/* Visual milestone bubble */}
                <div className="md:w-64 flex-shrink-0 flex flex-col gap-2">
                  <span className="text-[9px] text-[#FF3D00] uppercase font-mono tracking-widest font-black">// STAGE PHASE</span>
                  <h4 className="text-base font-black text-art-ink uppercase">{phase.phaseName}</h4>
                  <span className="px-3 py-1 bg-art-bg text-art-ink border border-art-ink text-[10px] font-black uppercase tracking-widest mt-2 self-start">
                    {phase.duration}
                  </span>
                </div>

                {/* Sub-objectives */}
                <div className="flex-1 border-t md:border-t-0 md:border-l border-art-ink pt-4 md:pt-0 md:pl-6">
                  <h5 className="text-[10px] font-black text-art-ink/50 uppercase tracking-widest mb-3">KEY OBJECTIVES</h5>
                  <ul className="flex flex-col gap-3">
                    {phase.objectives.map((obj, oIdx) => (
                      <li key={oIdx} className="flex gap-2.5 items-start text-xs font-semibold text-art-ink/90">
                        <CheckCircle2 className="w-4 h-4 text-art-accent flex-shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 8: TECH STACK CHOICE */}
        {activeTab === 'techstack' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
            {blueprint.techStackJustification.map((just, jIdx) => (
              <div
                key={jIdx}
                className="bg-white border border-art-ink p-6 rounded-none shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(17,17,17,1)] transition-all"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-black text-art-ink uppercase">{just.toolName}</h4>
                  <span className="px-2.5 py-0.5 rounded-none bg-art-bg border border-art-ink text-[10px] uppercase font-mono tracking-widest font-black">
                    {just.role}
                  </span>
                </div>
                <p className="text-art-ink/80 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                  {just.whySelected}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
