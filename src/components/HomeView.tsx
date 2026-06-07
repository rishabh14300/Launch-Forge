import React from 'react';
import {
  Sparkles,
  ArrowRight,
  PlayCircle,
  ShieldCheck,
  Database,
  Code2,
  Cpu,
  LayoutTemplate,
  CheckCircle,
  Lightbulb
} from 'lucide-react';

interface HomeViewProps {
  onStartClick: () => void;
  onViewDemoClick: () => void;
}

export default function HomeView({ onStartClick, onViewDemoClick }: HomeViewProps) {
  return (
    <div className="relative w-full max-w-7xl mx-auto flex flex-col gap-20 py-12 px-4 md:px-8">
      {/* Decorative Stamp Taglines in Background (no messy glows) */}
      <div className="absolute top-4 right-10 opacity-15 hidden lg:block select-none pointer-events-none">
        <div className="border border-art-ink p-4 rounded-none font-mono text-[9px] uppercase tracking-widest leading-relaxed">
          [ FORGE_SPEC_REV_04 ]<br />
          COMPRESSED GRID BLOCK<br />
          ALL AGENTS ACTIVE & INLINE
        </div>
      </div>

      {/* Hero section */}
      <section className="text-center flex flex-col items-center gap-6 mt-6 md:mt-12 relative animate-fade-in">
        {/* Artistic Flag / Stamp */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-none bg-art-ink text-white border border-art-ink text-[10px] font-black uppercase tracking-widest">
          <Sparkles className="w-3 h-3 text-art-accent" />
          <span>V2.0 // POWERED BY GEMINI PRO</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-art-ink leading-[1.15] max-w-4xl text-center uppercase font-sans">
          Turn Raw Drafts Into <br className="hidden sm:block" />
          <span className="font-serif italic text-art-accent capitalize select-none font-normal">
            Production Architecture.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-art-ink/80 max-w-xl text-center leading-relaxed font-sans font-medium">
          Generate structurally supreme, validated product blueprints with precise database models, API route sheets, and scalable state rules in seconds.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto px-4 justify-center">
          <button
            onClick={onStartClick}
            className="px-8 py-4 bg-art-accent hover:bg-art-ink text-white border border-art-ink font-black text-xs tracking-widest uppercase cursor-pointer rounded-none transition-all shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:shadow-[5px_5px_0px_0px_rgba(17,17,17,1)] hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-2"
          >
            CREATE BLUEPRINT
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onViewDemoClick}
            className="px-8 py-4 bg-white hover:bg-art-bg/40 text-art-ink border border-art-ink font-black text-xs tracking-widest uppercase cursor-pointer rounded-none transition-all shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:shadow-[5px_5px_0px_0px_rgba(17,17,17,1)] hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-2"
          >
            <PlayCircle className="w-4 h-4 text-art-accent" />
            VIEW DEMO MODEL
          </button>
        </div>
      </section>

      {/* Bento feature showcase */}
      <section className="flex flex-col gap-12 pt-12 border-t border-art-ink">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div className="text-left flex flex-col gap-1">
            <span className="text-[10px] text-art-accent font-black tracking-widest uppercase leading-none">
              // DESIGN MATRIX SPECIFICATIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-art-ink font-sans uppercase">
              COMPREHENSIVE SPEC BLUEPRINTS
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-art-ink/60 font-medium max-w-md">
            Skip the guesswork. Generate clean functional structures to coordinate development pathways with immediate, strict logical borders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-art-ink p-6 rounded-none flex flex-col gap-4 shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(17,17,17,1)] transition-all">
            <div className="w-10 h-10 rounded-none bg-art-bg border border-art-ink flex items-center justify-center text-art-ink">
              <Lightbulb className="w-5 h-5 text-art-accent" />
            </div>
            <div>
              <h3 className="text-sm font-black text-art-ink uppercase tracking-wide">
                1. PRODUCT STRATEGY MODEL
              </h3>
              <p className="text-xs text-art-ink/75 mt-2 leading-relaxed">
                Define core target user personas, MVP scope coordinates, step-by-step priority guidelines, and explicit feature limitations instantly.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-art-ink p-6 rounded-none flex flex-col gap-4 shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(17,17,17,1)] transition-all">
            <div className="w-10 h-10 rounded-none bg-art-bg border border-art-ink flex items-center justify-center text-art-ink">
              <Database className="w-5 h-5 text-art-accent" />
            </div>
            <div>
              <h3 className="text-sm font-black text-art-ink uppercase tracking-wide">
                2. OPTIMIZED RELATIONAL SCHEMAS
              </h3>
              <p className="text-xs text-art-ink/75 mt-2 leading-relaxed">
                Instantly map out clean structured database tables, typed attributes, relational connections, foreign keys, and indexes.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-art-ink p-6 rounded-none flex flex-col gap-4 shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(17,17,17,1)] transition-all">
            <div className="w-10 h-10 rounded-none bg-art-bg border border-art-ink flex items-center justify-center text-art-ink">
              <Code2 className="w-5 h-5 text-art-accent" />
            </div>
            <div>
              <h3 className="text-sm font-black text-art-ink uppercase tracking-wide">
                3. STRUCTURAL ROUTING SHEETS
              </h3>
              <p className="text-xs text-art-ink/75 mt-2 leading-relaxed">
                Develop robust RESTful specifications with precise payload variables, response status codes, types, and mock headers.
              </p>
            </div>
          </div>

          {/* Card 4 (2 columns) */}
          <div className="bg-white border border-art-ink p-6 rounded-none flex flex-col md:col-span-2 justify-between shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(17,17,17,1)] transition-all gap-6">
            <div className="flex justify-between items-start gap-4">
              <div className="w-10 h-10 rounded-none bg-art-bg border border-art-ink flex items-center justify-center text-art-ink">
                <LayoutTemplate className="w-5 h-5 text-art-accent" />
              </div>
              <div className="flex flex-wrap gap-1.5 justify-end">
                <span className="px-2 py-0.5 rounded-none bg-art-ink text-white text-[9px] font-black uppercase tracking-widest border border-art-ink">React</span>
                <span className="px-2 py-0.5 rounded-none bg-art-bg text-art-ink text-[9px] font-black uppercase tracking-widest border border-art-ink">Vite</span>
                <span className="px-2 py-0.5 rounded-none bg-[#FF3D00] text-white text-[9px] font-black uppercase tracking-widest border border-art-ink">Express</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-black text-art-ink uppercase tracking-wide">
                4. FRONTEND STRUCTURE & DIRECTORIES
              </h3>
              <p className="text-xs text-art-ink/75 mt-2 leading-relaxed max-w-2xl">
                Draft responsive UI state specifications, nested directories, common styling theme structures, and core hooks requirements before starting your client-side implementation.
              </p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white border border-art-ink p-6 rounded-none flex flex-col gap-4 shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(17,17,17,1)] transition-all">
            <div className="w-10 h-10 rounded-none bg-art-bg border border-art-ink flex items-center justify-center text-art-ink">
              <Cpu className="w-5 h-5 text-art-accent" />
            </div>
            <div>
              <h3 className="text-sm font-black text-art-ink uppercase tracking-wide">
                5. MODEL INTEGRATION PROMPTS
              </h3>
              <p className="text-xs text-art-ink/75 mt-2 leading-relaxed">
                Generate tailored, context-specific LLM instructions & client rules customized to keep complex builds robust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Interactive Code Block Mockup */}
      <section className="pt-6 border-t border-art-ink">
        <div className="bg-white border border-art-ink rounded-none overflow-hidden shadow-[4px_4px_0px_0px_rgba(17,17,17,1)]">
          {/* Header IDE Toolbar */}
          <div className="h-11 bg-art-bg px-4 border-b border-art-ink flex items-center justify-between">
            <div className="flex gap-1.5">
              <span className="w-3.5 h-3.5 rounded-none bg-art-ink border border-art-ink" />
              <span className="w-3.5 h-3.5 rounded-none bg-[#FF3D00] border border-art-ink" />
              <span className="w-3.5 h-3.5 rounded-none bg-white border border-art-ink" />
            </div>
            <span className="text-[10px] font-mono font-black text-art-ink bg-white px-3 py-1 rounded-none border border-art-ink uppercase tracking-wider">
              blueprint.config.ts
            </span>
            <div className="flex items-center gap-1.5 text-[9px] font-mono text-art-ink font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-art-accent animate-pulse" />
              <span>Fullstack Spec Ready</span>
            </div>
          </div>

          {/* IDE Content Area */}
          <div className="p-6 font-mono text-xs text-art-ink bg-white overflow-x-auto leading-relaxed">
            <pre className="text-left font-semibold">
              <code>
                <span className="text-art-ink/40">{'// LaunchForge SPEC: System Config Block'}</span>
                {'\n'}
                <span className="text-art-accent">import</span> {'{ Forge }'} <span className="text-art-accent">from</span> <span className="text-art-ink font-bold">"@launchforge/core"</span>;
                {'\n\n'}
                <span className="text-art-ink">const</span> project = <span className="text-art-accent">new</span> <span className="text-art-ink">Forge</span>({'{'}
                {'\n'}  name: <span className="text-art-accent">"SaaS SPECIFICATION BUILD"</span>,
                {'\n'}  stack: [<span className="text-art-accent">"React"</span>, <span className="text-art-accent">"Postgres"</span>, <span className="text-art-accent">"Tailwind"</span>],
                {'\n'}  aiModel: <span className="text-art-accent">"gemini-3.5-flash"</span>
                {'\n'}{'}'});
                {'\n\n'}
                <span className="text-art-ink font-bold">await</span> project.<span className="text-art-accent">generateSchema</span>();
                {'\n'}
                <span className="text-art-ink font-bold">await</span> project.<span className="text-art-accent">scaffoldAPI</span>();
                {'\n'}
                <span className="text-art-ink/40">{'// Output successfully persisted: Spec generated dynamically'}</span>
              </code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
