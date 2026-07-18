"use client";
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { PlusCircle, Rocket, BarChart3, Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { Skeleton } from '@/components/ui/Skeleton';

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  const { data: startups, isLoading } = useQuery({
    queryKey: ['startups'],
    queryFn: async () => {
      const res = await api.get('/startups');
      return res.data.data;
    }
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="flex justify-between items-center mb-10">
          <div>
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-5 w-80" />
          </div>
          <Skeleton className="h-12 w-48 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 rounded-2xl" />)}
            </div>
            <Skeleton className="h-[400px] rounded-2xl" />
          </div>
          <Skeleton className="h-[600px] rounded-2xl" />
        </div>
      </div>
    );
  }

  // Dummy chart data for empty states
  const chartData = [
    { name: 'Week 1', score: 20 },
    { name: 'Week 2', score: 35 },
    { name: 'Week 3', score: 55 },
    { name: 'Week 4', score: 45 },
    { name: 'Week 5', score: 80 },
    { name: 'Week 6', score: 95 },
  ];

  return (
    <div className="container mx-auto px-4 py-12 flex-1">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name.split(' ')[0]}</h1>
          <p className="text-text-muted mt-1">Here's an overview of your startup portfolio.</p>
        </div>
        <Link href="/ideas/add" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20">
          <PlusCircle size={20} />
          <span>New Startup Idea</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Stats & Chart */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-2 text-text-muted">
                <Rocket size={18} className="text-secondary" />
                <span className="font-medium text-sm">Active Ideas</span>
              </div>
              <p className="text-3xl font-bold">{startups?.length || 0}</p>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-2 text-text-muted">
                <AlertTriangle size={18} className="text-orange-400" />
                <span className="font-medium text-sm">Avg Risk Score</span>
              </div>
              <p className="text-3xl font-bold">
                {startups?.length 
                  ? Math.round(startups.reduce((acc: number, s: any) => acc + (s.riskScore || 50), 0) / startups.length) 
                  : 0}/100
              </p>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-2 text-text-muted">
                <Clock size={18} className="text-primary" />
                <span className="font-medium text-sm">Pending Tasks</span>
              </div>
              <p className="text-3xl font-bold">--</p>
            </div>
          </div>

          {/* Activity Chart */}
          <div className="glass-card p-6 rounded-2xl h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <BarChart3 size={20} className="text-primary" />
                Startup Readiness Score
              </h2>
            </div>
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                  <XAxis dataKey="name" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111111', borderColor: '#262626', borderRadius: '12px' }}
                    itemStyle={{ color: '#8b5cf6' }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Your Startups List */}
        <div className="glass-card p-6 rounded-2xl flex flex-col max-h-[calc(100vh-200px)]">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Rocket size={20} className="text-secondary" />
            Your Ideas
          </h2>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {startups?.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-text-muted text-sm mb-4">You haven't added any startup ideas yet.</p>
                <Link href="/ideas/add" className="text-primary text-sm font-medium hover:underline">
                  Create your first idea &rarr;
                </Link>
              </div>
            ) : (
              startups?.map((startup: any) => (
                <Link href={`/ideas/${startup._id}/manage`} key={startup._id} className="block group">
                  <div className="p-4 rounded-xl bg-surface border border-border group-hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{startup.ideaName}</h3>
                      <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-secondary/10 text-secondary font-semibold">
                        {startup.status}
                      </span>
                    </div>
                    <p className="text-sm text-text-muted line-clamp-2 mb-3">{startup.pitch}</p>
                    <div className="flex items-center justify-between text-xs font-medium text-text-muted">
                      <span>{startup.industry}</span>
                      <span className="flex items-center gap-1 text-primary group-hover:translate-x-1 transition-transform">
                        Manage <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
