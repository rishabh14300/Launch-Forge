import React from 'react';
import {
  LayoutDashboard,
  FolderDot,
  LineChart,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
  Plus,
  Compass
} from 'lucide-react';

interface SidebarProps {
  currentView: 'home' | 'dashboard' | 'blueprints';
  onNavigate: (view: 'home' | 'dashboard' | 'blueprints') => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenNewBlueprint: () => void;
}

export default function Sidebar({
  currentView,
  onNavigate,
  isOpenMobile,
  onCloseMobile,
  onOpenNewBlueprint
}: SidebarProps) {
  const links = [
    { id: 'home', label: 'EXPLORE MASTER', icon: Compass },
    { id: 'dashboard', label: 'BLUEPRINT DASHBOARD', icon: LayoutDashboard },
  ];

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="md:hidden fixed inset-0 bg-art-ink/30 z-40 backdrop-blur-xs"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-art-paper border-r border-art-ink flex flex-col justify-between p-6 transition-transform duration-300 transform md:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-6">
          {/* Logo Brand Panel (Stamp geometric) */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-none bg-[#111111] border border-art-ink flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5 text-art-accent" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tighter text-art-ink uppercase flex items-center gap-1 font-sans">
                LaunchForge
              </span>
              <p className="text-[9px] text-[#FF3D00] uppercase tracking-widest font-black leading-none mt-0.5">
                COLLECTION SERIES
              </p>
            </div>
          </div>

          {/* Quick Create CTA matching standard .brutalist-btn with customize style */}
          <button
            onClick={() => {
              onNavigate('dashboard');
              onOpenNewBlueprint();
              onCloseMobile();
            }}
            className="w-full bg-art-accent hover:bg-art-ink text-zinc-100 py-3 px-4 rounded-none text-xs font-black tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer transition-all border border-art-ink shadow-[3px_3px_0px_0px_rgba(17,17,17,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <Plus className="w-4 h-4" />
            NEW BLUEPRINT
          </button>

          {/* Core Navigation Links */}
          <nav className="flex flex-col gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id as any);
                    onCloseMobile();
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-none transition-all cursor-pointer text-xs font-bold tracking-wider uppercase border ${
                    isActive
                      ? 'bg-art-ink text-art-bg border-art-ink shadow-none'
                      : 'text-art-ink hover:text-art-accent hover:bg-art-bg/80 border-transparent hover:border-art-ink'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-art-accent' : 'text-art-ink/70'}`} />
                  {link.label}
                </button>
              );
            })}

            {/* Inactive System Modules */}
            <div className="mt-4 pt-4 border-t border-art-ink flex flex-col gap-1.5">
              <p className="px-4 text-[9px] text-art-ink/50 uppercase tracking-widest font-black mb-1">
                SYSTEM MODULES
              </p>
              <button
                disabled
                className="flex items-center gap-3 px-4 py-2 text-art-ink/30 text-xs tracking-wider uppercase font-bold cursor-not-allowed justify-between"
              >
                <span className="flex items-center gap-3">
                  <FolderDot className="w-4 h-4" />
                  PROJECTS
                </span>
                <span className="text-[8px] bg-art-bg text-art-ink/40 px-1 py-0.5 rounded-none border border-art-ink/20">
                  SaaS
                </span>
              </button>
              <button
                disabled
                className="flex items-center gap-3 px-4 py-2 text-art-ink/30 text-xs tracking-wider uppercase font-bold cursor-not-allowed"
              >
                <LineChart className="w-4 h-4" />
                ANALYTICS
              </button>
              <button
                disabled
                className="flex items-center gap-3 px-4 py-2 text-art-ink/30 text-xs tracking-wider uppercase font-bold cursor-not-allowed"
              >
                <Settings className="w-4 h-4" />
                SETTINGS
              </button>
            </div>
          </nav>
        </div>

        {/* Decorative Vertical/horizontal Brutalist panel info */}
        <div className="hidden md:flex justify-between items-center my-2 text-[#FF3D00] font-mono text-[9px] tracking-widest uppercase font-black py-2 border-y border-art-ink/20">
          <span>* SYSTEM ONLINE</span>
          <span>EST. 1994 // V_04</span>
        </div>

        {/* Footer Area with Profiling */}
        <div className="flex flex-col gap-4 border-t border-art-ink pt-4">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => alert('Support portal is fully configured. Our solutions team is online! Ready for speedy engineering help.')}
              className="flex items-center gap-3 px-4 py-1.5 text-art-ink/70 hover:text-art-accent transition-colors text-xs font-bold tracking-wider uppercase cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              Help &amp; Guides
            </button>
            <button
              onClick={() => alert('To sign out or change workspace credentials, configure external OAuth scopes in your cloud dashboard.')}
              className="flex items-center gap-3 px-4 py-1.5 text-art-ink/70 hover:text-art-accent transition-colors text-xs font-bold tracking-wider uppercase cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-none bg-art-bg border border-art-ink">
            <img
              alt="Alex Sterling Portrait"
              className="w-10 h-10 rounded-none border border-art-ink object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAfC5zMTZRE3snRTSj97SDAmWhs0MpG3R2lJu_q909eltKUYOcXXbG4ZFmaVs6YGQYUJkx_yjrPZUr1y_36AW1z8MsXJa3FJXr9iuC7hbWGrAA58gltxwR8glzHCd2IbbWAdL_aHOXPKRmGmHFsp6bdv9QpP51TUbgbJiZrRXt8VP2Woam2rjAOYbpTZ4D8T2ydzdkBrNFPnmj3yHsrokoP3xXIGWNh7BgghQRwuNys5TmKMJqj78ZYE9iiC3W6VE_fK7TdHtEdxK2"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-art-ink truncate">Alex Sterling</p>
              <div className="flex items-center gap-1">
                <span className="text-[9px] text-art-accent font-black tracking-wide uppercase">Pro Code</span>
                <span className="w-1 h-1 rounded-full bg-art-ink"></span>
                <span className="text-[9px] text-art-ink/60 font-mono">v1.2.0</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
