"use client";
import { useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu, Sparkles, FolderKanban } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import UserDropdown from './UserDropdown';

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

interface Activity {
  _id: string;
  action: string;
  entityType: string;
  details: string;
  createdAt: string;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data: dashboardData } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: async () => {
      const res = await api.get('/dashboard');
      return res.data.data;
    }
  });

  const activities: Activity[] = dashboardData?.activities || [];
  const hasNotifications = activities.length > 0;

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
        {/* Notification Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`relative p-2 transition-colors ${isDropdownOpen ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Bell className="w-5 h-5" />
            {hasNotifications && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse"></span>
            )}
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-white/10 bg-[#1e2330] shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-white/5 bg-black/20 flex items-center justify-between">
                <span className="text-sm font-bold text-white">Notifications</span>
                <span className="text-xs text-blue-400 font-medium">{activities.length} new</span>
              </div>
              
              <div className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {activities.length > 0 ? (
                  <div className="space-y-1">
                    {activities.map((activity) => (
                      <div key={activity._id} className="p-3 rounded-lg hover:bg-white/5 transition-colors flex gap-3">
                        <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          activity.action === 'GENERATED' 
                            ? 'bg-purple-500/20 text-purple-400' 
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {activity.action === 'GENERATED' ? <Sparkles className="w-4 h-4" /> : <FolderKanban className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="text-sm text-gray-300">
                            <span className="font-semibold text-white capitalize">{activity.action.toLowerCase()}</span> {activity.entityType}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{new Date(activity.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-sm text-gray-500">
                    No recent activity
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <UserDropdown />
      </div>
    </header>
  );
}
