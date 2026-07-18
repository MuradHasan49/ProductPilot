"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Activity, TrendingUp, Users, ArrowUpRight, Clock, FolderKanban, Sparkles } from 'lucide-react';
import { api } from '@/lib/api';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface AnalyticsData {
  stats: {
    totalUsers: number;
    totalProjects: number;
    totalAIGenerations: number;
    totalActivities: number;
  };
  chartData: {
    name: string;
    date: string;
    activity: number;
  }[];
}

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = React.useState('30d');

  const { data: analytics, isLoading, error } = useQuery({
    queryKey: ['analytics', timeframe],
    queryFn: async () => {
      const res = await api.get(`/analytics?timeframe=${timeframe}`);
      return res.data.data as AnalyticsData;
    }
  });

  const stats = [
    { 
      name: 'Total Users', 
      value: analytics?.stats.totalUsers || 0, 
      change: '+12.5%', 
      trend: 'up', 
      icon: Users, 
      color: 'text-blue-400', 
      bg: 'bg-blue-500/10' 
    },
    { 
      name: 'Total Projects', 
      value: analytics?.stats.totalProjects || 0, 
      change: '+5.2%', 
      trend: 'up', 
      icon: FolderKanban, 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-500/10' 
    },
    { 
      name: 'AI Generations', 
      value: analytics?.stats.totalAIGenerations || 0, 
      change: '+24.4%', 
      trend: 'up', 
      icon: Sparkles, 
      color: 'text-orange-400', 
      bg: 'bg-orange-500/10' 
    },
    { 
      name: 'Total Activities', 
      value: analytics?.stats.totalActivities || 0, 
      change: '+1.6%', 
      trend: 'up', 
      icon: Activity, 
      color: 'text-purple-400', 
      bg: 'bg-purple-500/10' 
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Analytics</h1>
          <p className="text-gray-400 mt-1">Monitor your product's performance and growth metrics in real-time.</p>
        </div>
        <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
          <button 
            onClick={() => setTimeframe('7d')}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${timeframe === '7d' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
          >
            7 Days
          </button>
          <button 
            onClick={() => setTimeframe('30d')}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${timeframe === '30d' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
          >
            30 Days
          </button>
          <button 
            onClick={() => setTimeframe('12m')}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${timeframe === '12m' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
          >
            12 Months
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-[#1e2330]/50 p-6">
               <Skeleton className="w-12 h-12 rounded-xl mb-4 bg-white/10" />
               <Skeleton className="w-24 h-8 mb-2 bg-white/10" />
               <Skeleton className="w-32 h-4 bg-white/10" />
            </div>
          ))
        ) : error ? (
           <div className="col-span-4 p-8 text-center bg-error/10 border border-error/20 rounded-[16px] text-error">
             Failed to load analytics data.
           </div>
        ) : (
          stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#1e2330]/50 backdrop-blur-xl p-6 group hover:border-white/20 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg} shadow-inner`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stat.change}
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h3>
                <p className="text-sm text-gray-400 mt-1 font-medium">{stat.name}</p>
                
                {/* Subtle decorative glow */}
                <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${stat.bg} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
            );
          })
        )}
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#1e2330]/50 backdrop-blur-xl p-6 min-h-[400px] flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">
              Platform Activity ({timeframe === '7d' ? '7 Days' : timeframe === '12m' ? '12 Months' : '30 Days'})
            </h3>
            <button className="text-gray-400 hover:text-white transition-colors">
              <MoreHorizontalIcon />
            </button>
          </div>
          <div className="flex-grow w-full h-full relative min-h-[300px]">
            {isLoading ? (
               <Skeleton className="w-full h-[300px] rounded-xl bg-white/5" />
            ) : analytics?.chartData ? (
               <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="rgba(255,255,255,0.4)" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                    minTickGap={30}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.4)" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => val === 0 ? '' : val}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#3b82f6' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="activity" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorActivity)" 
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : null}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#1e2330]/50 backdrop-blur-xl p-6 min-h-[400px] flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6">Top Features</h3>
          <div className="flex-grow flex flex-col gap-4">
            {[
              { path: 'PRD Generation', views: analytics?.stats.totalAIGenerations || 0, percentage: 85 },
              { path: 'Architecture Design', views: Math.floor((analytics?.stats.totalAIGenerations || 0) * 0.7), percentage: 70 },
              { path: 'Task Breakdown', views: Math.floor((analytics?.stats.totalAIGenerations || 0) * 0.4), percentage: 45 },
              { path: 'User Stories', views: Math.floor((analytics?.stats.totalAIGenerations || 0) * 0.3), percentage: 35 },
              { path: 'Risk Analysis', views: Math.floor((analytics?.stats.totalAIGenerations || 0) * 0.1), percentage: 20 },
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

function MoreHorizontalIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1"/>
      <circle cx="19" cy="12" r="1"/>
      <circle cx="5" cy="12" r="1"/>
    </svg>
  )
}
