import React from 'react';
import { LineChart, Activity, TrendingUp, Users, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';

export default function AnalyticsPage() {
  const stats = [
    { name: 'Total Users', value: '12,450', change: '+12.5%', trend: 'up', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { name: 'Active Sessions', value: '3,124', change: '+5.2%', trend: 'up', icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { name: 'Avg. Session Length', value: '24m 12s', change: '-1.4%', trend: 'down', icon: Clock, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { name: 'Conversion Rate', value: '4.8%', change: '+0.6%', trend: 'up', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Analytics</h1>
          <p className="text-gray-400 mt-1">Monitor your product's performance and growth metrics.</p>
        </div>
        <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
          <button className="px-4 py-1.5 text-sm font-medium rounded-lg bg-white/10 text-white shadow-sm">7 Days</button>
          <button className="px-4 py-1.5 text-sm font-medium rounded-lg text-gray-400 hover:text-white transition-colors">30 Days</button>
          <button className="px-4 py-1.5 text-sm font-medium rounded-lg text-gray-400 hover:text-white transition-colors">12 Months</button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#1e2330]/50 backdrop-blur-xl p-6 group hover:border-white/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} shadow-inner`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`flex items-center text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stat.change}
                  {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4 ml-1" /> : <ArrowDownRight className="w-4 h-4 ml-1" />}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h3>
              <p className="text-sm text-gray-400 mt-1 font-medium">{stat.name}</p>
              
              {/* Subtle decorative glow */}
              <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${stat.bg} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            </div>
          );
        })}
      </div>

      {/* Charts Area (Placeholder) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#1e2330]/50 backdrop-blur-xl p-6 min-h-[400px] flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Audience Overview</h3>
            <button className="text-gray-400 hover:text-white transition-colors">
              <MoreHorizontalIcon />
            </button>
          </div>
          <div className="flex-grow flex items-center justify-center">
            {/* Visual Placeholder for a Chart */}
            <div className="text-center">
              <LineChart className="w-16 h-16 text-gray-600 mx-auto mb-4 opacity-50" />
              <p className="text-gray-500 font-medium">Interactive Chart Component</p>
              <p className="text-sm text-gray-600 mt-1">Connect backend telemetry API to populate.</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#1e2330]/50 backdrop-blur-xl p-6 min-h-[400px] flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6">Top Pages</h3>
          <div className="flex-grow flex flex-col gap-4">
            {[
              { path: '/pricing', views: '4,213', percentage: 85 },
              { path: '/features/ai', views: '3,842', percentage: 70 },
              { path: '/docs/quickstart', views: '2,105', percentage: 45 },
              { path: '/blog/release-2.0', views: '1,842', percentage: 35 },
              { path: '/contact', views: '954', percentage: 20 },
            ].map((page, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300 font-medium">{page.path}</span>
                  <span className="text-gray-500">{page.views}</span>
                </div>
                <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${page.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Temporary icon for the chart menu
function MoreHorizontalIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1"/>
      <circle cx="19" cy="12" r="1"/>
      <circle cx="5" cy="12" r="1"/>
    </svg>
  )
}
