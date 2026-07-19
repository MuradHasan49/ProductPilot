"use client";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { X } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <DashboardSidebar />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative w-64 max-w-sm bg-surface shadow-2xl animate-in slide-in-from-left-4 duration-300">
            <button 
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute top-5 right-4 z-50 text-gray-400 hover:text-white bg-black/20 rounded-full p-1 border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
            <DashboardSidebar />
          </div>
        </div>
      )}
      
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <DashboardHeader onMenuClick={() => setIsMobileSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
