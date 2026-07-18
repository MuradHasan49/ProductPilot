"use client";
import { Search, Bell, Menu } from 'lucide-react';
import UserDropdown from './UserDropdown';

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="h-16 w-full bg-[#15171e]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="md:hidden text-gray-400 hover:text-white transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative hidden md:flex items-center">
          <Search className="w-4 h-4 absolute left-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search projects..."
            className="h-9 w-64 bg-black/20 border border-white/10 rounded-lg pl-9 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-500 transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
        </button>
        
        <UserDropdown />
      </div>
    </header>
  );
}
