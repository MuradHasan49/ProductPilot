import React from 'react';
import { Plus, Users, Layout, Clock, MoreHorizontal, Briefcase, Zap, Globe } from 'lucide-react';
import Link from 'next/link';

export default function WorkspacesPage() {
  const mockWorkspaces = [
    {
      id: 1,
      name: "SaaS Launchpad",
      role: "Owner",
      members: 4,
      lastUpdated: "2 hours ago",
      icon: Zap,
      color: "bg-blue-500/10 text-blue-500",
      gradient: "from-blue-500/5 to-transparent",
    },
    {
      id: 2,
      name: "Marketing Site",
      role: "Editor",
      members: 12,
      lastUpdated: "5 days ago",
      icon: Globe,
      color: "bg-purple-500/10 text-purple-500",
      gradient: "from-purple-500/5 to-transparent",
    },
    {
      id: 3,
      name: "Internal Dashboard",
      role: "Viewer",
      members: 2,
      lastUpdated: "1 week ago",
      icon: Layout,
      color: "bg-emerald-500/10 text-emerald-500",
      gradient: "from-emerald-500/5 to-transparent",
    },
    {
      id: 4,
      name: "Client Project X",
      role: "Owner",
      members: 8,
      lastUpdated: "Just now",
      icon: Briefcase,
      color: "bg-orange-500/10 text-orange-500",
      gradient: "from-orange-500/5 to-transparent",
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Workspaces</h1>
          <p className="text-gray-400 mt-1">Manage your team projects and environments.</p>
        </div>
        <button className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 hover:shadow-blue-500/25 hover:shadow-lg transition-all duration-300">
          <Plus className="h-4 w-4 mr-2" />
          New Workspace
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockWorkspaces.map((workspace) => {
          const Icon = workspace.icon;
          return (
            <div 
              key={workspace.id}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-[#1e2330]/50 backdrop-blur-xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50"
            >
              {/* Subtle background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${workspace.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="p-6 relative z-10 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${workspace.color} shadow-inner`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <button className="text-gray-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {workspace.name}
                </h3>
                <p className="text-sm text-gray-400 mb-6 flex-grow">{workspace.role}</p>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center text-xs text-gray-400 font-medium bg-black/20 px-2 py-1 rounded-md">
                    <Users className="w-3 h-3 mr-1.5" />
                    {workspace.members} Members
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1.5" />
                    {workspace.lastUpdated}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add New Card */}
        <button className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-transparent p-6 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300 h-full min-h-[200px]">
          <div className="p-4 rounded-full bg-white/5 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300 mb-4">
            <Plus className="w-6 h-6 text-gray-400 group-hover:text-blue-400" />
          </div>
          <span className="text-sm font-medium text-gray-400 group-hover:text-blue-400">Create New Workspace</span>
        </button>
      </div>
    </div>
  );
}
