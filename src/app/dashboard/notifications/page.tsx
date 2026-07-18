import React from 'react';
import { Bell, Check, Zap, MessageSquare, AlertCircle, Info, Filter } from 'lucide-react';

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: "New AI Model Available",
      message: "Groq Llama 3 70B is now the default model for all your projects. Experience 10x faster generation speeds.",
      time: "2 hours ago",
      type: "update",
      icon: Zap,
      color: "bg-blue-500/10 text-blue-400",
      unread: true,
    },
    {
      id: 2,
      title: "Project Generated Successfully",
      message: "Your PRD and User Stories for 'Marketing Automation SaaS' have been successfully generated.",
      time: "5 hours ago",
      type: "success",
      icon: Check,
      color: "bg-emerald-500/10 text-emerald-400",
      unread: true,
    },
    {
      id: 3,
      title: "API Rate Limit Warning",
      message: "You are approaching your monthly API limit for project generations. Consider upgrading your plan.",
      time: "1 day ago",
      type: "warning",
      icon: AlertCircle,
      color: "bg-orange-500/10 text-orange-400",
      unread: false,
    },
    {
      id: 4,
      title: "New Team Member",
      message: "Sarah Jenkins has accepted your invitation to join workspace 'Internal Dashboard'.",
      time: "2 days ago",
      type: "info",
      icon: Users,
      color: "bg-purple-500/10 text-purple-400",
      unread: false,
    },
    {
      id: 5,
      title: "Maintenance Scheduled",
      message: "Scheduled maintenance will occur on Sunday at 2:00 AM UTC. Expect 15 minutes of downtime.",
      time: "3 days ago",
      type: "info",
      icon: Info,
      color: "bg-gray-500/10 text-gray-400",
      unread: false,
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Notifications</h1>
          <p className="text-gray-400 mt-1">Stay updated with your latest project activity and system alerts.</p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center justify-center rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button className="inline-flex items-center justify-center rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 px-4 py-2 text-sm font-semibold hover:bg-blue-600/20 transition-colors">
            <Check className="h-4 w-4 mr-2" />
            Mark all as read
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-[#1e2330]/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden divide-y divide-white/5">
        {notifications.map((notif) => {
          const Icon = notif.icon;
          return (
            <div 
              key={notif.id} 
              className={`p-6 flex gap-4 transition-colors hover:bg-white/[0.02] ${notif.unread ? 'bg-blue-500/[0.02]' : ''}`}
            >
              {/* Icon */}
              <div className="flex-shrink-0 mt-1">
                <div className={`p-2.5 rounded-xl ${notif.color} shadow-inner`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`text-base font-semibold ${notif.unread ? 'text-white' : 'text-gray-300'}`}>
                    {notif.title}
                  </h3>
                  <span className="text-xs font-medium text-gray-500 whitespace-nowrap ml-4">
                    {notif.time}
                  </span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">
                  {notif.message}
                </p>
                
                {/* Actions (if unread) */}
                {notif.unread && (
                  <div className="mt-4 flex gap-3">
                    <button className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">
                      View Details
                    </button>
                    <button className="text-xs font-medium text-gray-500 hover:text-white transition-colors">
                      Dismiss
                    </button>
                  </div>
                )}
              </div>

              {/* Unread Dot */}
              {notif.unread && (
                <div className="flex-shrink-0 flex items-center justify-center pt-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Users(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}
