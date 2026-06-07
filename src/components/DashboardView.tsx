import React, { useState, useRef } from 'react';
import { Blueprint } from '../types';
import {
  Sparkles,
  Paperclip,
  Mic,
  TrendingUp,
  Clock,
  Briefcase,
  AlertCircle
} from 'lucide-react';

interface DashboardViewProps {
  blueprints: Blueprint[];
  onSelectBlueprint: (blueprint: Blueprint) => void;
  onGenerate: (prompt: string) => Promise<any>;
  isLoading: boolean;
  errorMsg: string | null;
}

export default function DashboardView({
  blueprints,
  onSelectBlueprint,
  onGenerate,
  isLoading,
  errorMsg
}: DashboardViewProps) {
  const [conceptInput, setConceptInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleGenerateClick = () => {
    if (!conceptInput.trim()) return;
    onGenerate(conceptInput);
  };

  const loadExample = (text: string) => {
    setConceptInput(text);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-12 py-8 px-4 md:px-8 animate-fade-in text-art-ink">
      {/* Introduction */}
      <div>
        <span className="text-[10px] text-art-accent font-black tracking-widest uppercase block mb-1">
          // CHASSIS SPEC GENERATOR
        </span>
        <h1 className="text-2xl sm:text-3.5xl font-black text-art-ink uppercase tracking-tight font-sans">
          Forge a new idea
        </h1>
        <p className="text-art-ink/70 text-sm mt-1 sm:text-base font-medium">
          Describe your startup concept, and we will trigger Gemini to sculpt the micro-architectures.
        </p>
      </div>

      {/* Input prompt area bento block */}
      <section className="bg-white border border-art-ink rounded-none p-4 sm:p-5 flex flex-col gap-4 shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] transition-all">
        <textarea
          ref={textareaRef}
          value={conceptInput}
          onChange={(e) => setConceptInput(e.target.value)}
          disabled={isLoading}
          className="w-full h-32 bg-transparent text-sm sm:text-base text-art-ink placeholder:text-art-ink/40 focus:outline-none resize-none leading-relaxed font-sans font-medium"
          placeholder="e.g., An AI-powered journaling app that analyzes sentiment over time and suggests personalized mindfulness exercises. It needs a mobile app, a web dashboard for therapists, and secure data storage."
        />

        {/* Example pre-fills helper */}
        <div className="flex flex-wrap items-center gap-1.5 text-[9px] text-art-ink font-black uppercase tracking-wider">
          <span className="opacity-60">TEST PATTERNS:</span>
          <button
            onClick={() => loadExample('A decentralized secure storage vault app using IPFS that automatically encrypts and shreds folder structures on lock.')}
            className="px-2.5 py-1 bg-art-bg hover:bg-art-accent hover:text-white text-art-ink rounded-none cursor-pointer border border-art-ink transition-colors font-bold"
          >
            IPFS Shred Vault
          </button>
          <button
            onClick={() => loadExample('An automated micro-influencer outreach SaaS connecting eco-fashion brands to verified TikTok makers in real-time.')}
            className="px-2.5 py-1 bg-art-bg hover:bg-art-accent hover:text-white text-art-ink rounded-none cursor-pointer border border-art-ink transition-colors font-bold"
          >
            Eco TikTok Hub
          </button>
        </div>

        {/* Toolbar action strip */}
        <div className="flex justify-between items-center border-t border-art-ink/20 pt-4 mt-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => alert('Attachments can be linked side-by-side with prompts in the premium LaunchForge plan.')}
              className="p-2 text-art-ink hover:text-art-accent hover:bg-art-bg rounded-none border border-transparent hover:border-art-ink cursor-pointer transition-colors"
              title="Attach File Mockup"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <button
              onClick={() => alert('Audio capturing is active. Say your product idea clearly!')}
              className="p-2 text-art-ink hover:text-art-accent hover:bg-art-bg rounded-none border border-transparent hover:border-art-ink cursor-pointer transition-colors"
              title="Voice Input Mockup"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleGenerateClick}
            disabled={isLoading || !conceptInput.trim()}
            className="px-5 py-3 rounded-none bg-art-accent hover:bg-art-ink text-white font-black text-xs tracking-widest uppercase flex items-center gap-2 cursor-pointer transition-all border border-art-ink shadow-[3px_3px_0px_0px_rgba(17,17,17,1)] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-4 h-4 text-white" />
            {isLoading ? 'GENERATING SPEC...' : 'GENERATE BLUEPRINT'}
          </button>
        </div>
      </section>

      {/* Error display handling */}
      {errorMsg && (
        <div className="bg-white border border-art-ink border-l-8 border-l-art-accent text-art-ink p-5 rounded-none flex items-start gap-4 shadow-[4px_4px_0px_0px_rgba(17,17,17,1)]">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-art-accent" />
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-art-accent">Blueprint Generation Issue</h4>
            <p className="text-xs sm:text-sm mt-1 text-art-ink/80 leading-relaxed font-semibold">{errorMsg}</p>
            {errorMsg.includes('GEMINI_API_KEY') && (
              <p className="text-xs mt-3 text-art-accent font-black tracking-wide uppercase leading-normal">
                [ ACTION REQUIRED ] Click the Settings {"→"} Secrets panel in the AI Studio header to configure your GEMINI_API_KEY. Alternatively, enjoy editing the mock workspace structures.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Grid container for statistics */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Total Blueprints Card */}
        <div className="bg-white border border-art-ink p-6 rounded-none flex flex-col justify-between relative overflow-hidden shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:shadow-[5px_5px_0px_0px_rgba(17,17,17,1)] transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] text-art-ink/50 uppercase tracking-widest font-black">// ARCHIVE TOTAL</p>
              <h3 className="text-4xl font-black text-art-ink mt-1.5 leading-none">{blueprints.length}</h3>
            </div>
            <div className="p-2.5 bg-art-bg border border-art-ink text-art-ink">
              <Sparkles className="w-4 h-4 text-art-accent" />
            </div>
          </div>
          <div className="mt-6">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-none bg-art-bg text-art-ink border border-art-ink text-[10px] font-black uppercase tracking-widest">
              <TrendingUp className="w-3 h-3 text-art-accent" />
              +3 SPEC SERIES
            </span>
          </div>
        </div>

        {/* Active Projects Card */}
        <div className="bg-white border border-art-ink p-6 rounded-none flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:shadow-[5px_5px_0px_0px_rgba(17,17,17,1)] transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] text-art-ink/50 uppercase tracking-widest font-black">// COMPILATION LABS</p>
              <h3 className="text-4xl font-black text-art-ink mt-1.5 leading-none">3</h3>
            </div>
            <div className="p-2.5 bg-art-bg border border-art-ink text-art-ink">
              <Briefcase className="w-4 h-4 text-art-accent" />
            </div>
          </div>
          <p className="text-[10px] text-art-ink/75 mt-6 font-black uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-none bg-art-accent animate-ping" />
            1 Live Build Compiling
          </p>
        </div>

        {/* Compute usage Hours Card */}
        <div className="bg-white border border-art-ink p-6 rounded-none flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:shadow-[5px_5px_0px_0px_rgba(17,17,17,1)] transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] text-art-ink/50 uppercase tracking-widest font-black">// SANDBOX PIPELINE</p>
              <h3 className="text-4xl font-black text-art-ink mt-1.5 leading-none font-mono">42HRS</h3>
            </div>
            <div className="p-2.5 bg-art-bg border border-art-ink text-art-ink">
              <Clock className="w-4 h-4 text-[#FF3D00]" />
            </div>
          </div>
          <p className="text-[10px] text-art-ink/50 mt-6 font-black uppercase tracking-wider">
            QUOTA CLEARS IN 5 CALENDAR DAYS
          </p>
        </div>
      </section>

      {/* Shimmer skeleton loader shown when active */}
      {isLoading && (
        <section className="flex flex-col gap-5 border-t border-art-ink pt-8">
          <h3 className="text-xs font-black text-art-accent uppercase tracking-widest flex items-center gap-2 font-mono">
            <span className="w-2.5 h-2.5 bg-art-accent animate-ping" />
            GEMINI IS SCULPTURE-MAPPING NEW PROJECT SPECIFICATIONS...
          </h3>

          <div className="bg-white border border-art-ink rounded-none p-6 flex flex-col gap-6 animate-pulse shadow-[4px_4px_0px_0px_rgba(17,17,17,1)]">
            <div className="flex justify-between items-center">
              <div className="h-5 w-48 bg-art-bg border border-art-ink/20"></div>
              <div className="h-4 w-20 bg-art-bg border border-art-ink/20"></div>
            </div>
            <div className="h-4 w-full bg-art-bg/80"></div>
            <div className="h-4 w-5/6 bg-art-bg/60"></div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="h-24 bg-art-bg border border-art-ink/20"></div>
              <div className="h-24 bg-art-bg border border-art-ink/20"></div>
              <div className="h-24 bg-art-bg border border-art-ink/20"></div>
            </div>
          </div>
        </section>
      )}

      {/* Blueprints history catalog lists */}
      <section className="flex flex-col gap-6 border-t border-art-ink pt-8">
        <div>
          <h2 className="text-lg font-black text-art-ink uppercase tracking-tight font-sans">
            Recent Blueprints Build History
          </h2>
          <p className="text-art-ink/60 text-xs font-bold uppercase tracking-wider mt-0.5">
            Browse through your workspace blueprints or click to investigate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blueprints.map((bp) => (
            <div
              key={bp.id}
              onClick={() => onSelectBlueprint(bp)}
              className="bg-white border border-art-ink p-5 rounded-none hover:shadow-[6px_6px_0px_0px_rgba(255,61,0,1)] shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer group flex flex-col justify-between gap-6"
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-black text-art-ink uppercase group-hover:text-art-accent transition-colors font-sans">
                    {bp.projectName}
                  </h3>
                  <span className="text-[10px] font-mono text-art-ink/50 font-bold uppercase">
                    {new Date(bp.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-art-ink/75 line-clamp-2 leading-relaxed font-sans font-medium">
                  {bp.concept}
                </p>
              </div>

              {/* Stack items listing */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-art-ink/15">
                <div className="flex gap-1.5 flex-wrap">
                  <span className="px-2 py-0.5 rounded-none text-[8px] font-mono font-black bg-art-bg border border-art-ink text-art-ink uppercase tracking-widest">
                    {bp.databaseSchema.type}
                  </span>
                  <span className="px-2 py-0.5 rounded-none text-[8px] font-mono font-black bg-art-bg border border-art-ink text-art-ink uppercase tracking-widest">
                    {bp.preferredStack.frontend}
                  </span>
                </div>
                <span className="text-[9px] font-black text-art-ink group-hover:text-art-accent uppercase tracking-widest flex items-center gap-1">
                  INSPECT SPEC {"//"} {"→"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
