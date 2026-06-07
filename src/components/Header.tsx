import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  onNavigate: (view: 'home' | 'dashboard' | 'blueprints') => void;
}

export default function Header({ onToggleSidebar, onNavigate }: HeaderProps) {
  return (
    <header className="md:hidden bg-art-paper fixed top-0 w-full h-16 border-b border-art-ink flex justify-between items-center px-4 z-40">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1 rounded-none text-art-ink hover:text-art-accent hover:bg-art-bg/80 border border-transparent hover:border-art-ink transition-colors cursor-pointer"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span
          onClick={() => onNavigate('home')}
          className="text-lg font-black tracking-tight text-art-ink uppercase cursor-pointer hover:text-art-accent flex items-center gap-2"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-art-accent animate-pulse"></div>
          LaunchForge AI
        </span>
      </div>
      <div>
        <img
          alt="User Profile"
          className="w-8 h-8 rounded-none border border-art-ink object-cover hover:bg-art-accent transition-all cursor-pointer"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF8-ccF3sKfQx2LVW51-37K05YjYa18DUJa42ZoSxio9XwcB0c1S2cxDmTV3uiPI4qM7IBTXG06O-62hrkV8_gJHi9emFdo3bqFWwcK13RVNNNmvDCJjxTBoMMqNkA2K1zcR04L0WeKcUugmLYQU3wal8pIfpoR1nwigXm8VBZVjKTtEWKOs8PL-YL8YlsdyEfrkqJKf1gLTQHIkQXXK2m8X6kYo5yG0ASuqR_pnWaPosoopaDBHGonyis9xePMNASLzPoN0epFI_6"
        />
      </div>
    </header>
  );
}
