"use client";
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Rocket, Search, Filter } from 'lucide-react';
import { useState } from 'react';

import { Skeleton } from '@/components/ui/Skeleton';

export default function ExploreStartupsPage() {
  const [search, setSearch] = useState("");

  const { data: startups, isLoading } = useQuery({
    queryKey: ['startups-public'],
    queryFn: async () => {
      // Fetching all startups available to the user
      const res = await api.get('/startups');
      return res.data.data;
    }
  });

  const filteredStartups = startups?.filter((s: any) => 
    s.ideaName.toLowerCase().includes(search.toLowerCase()) || 
    s.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12 flex-1">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Explore Startup Ideas</h1>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">
          Discover what other founders are building with LaunchPilot AI. Get inspired by the next generation of startups.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-10 max-w-3xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or industry..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface border border-border focus:outline-none focus:border-primary transition-colors text-foreground"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl glass-card text-foreground font-medium hover:border-primary/50 transition-colors">
          <Filter size={20} />
          Filters
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStartups?.map((startup: any) => (
            <Link href={`/ideas/${startup._id}/manage`} key={startup._id} className="block group">
              <div className="h-full glass-card p-6 rounded-2xl hover:border-primary/50 transition-colors flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Rocket size={24} />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-secondary/10 text-secondary font-semibold">
                    {startup.industry}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{startup.ideaName}</h3>
                <p className="text-sm text-text-muted mb-4 flex-1">{startup.pitch}</p>
                <div className="pt-4 border-t border-border flex items-center justify-between text-sm">
                  <span className="text-text-muted">Risk Score:</span>
                  <span className={`font-bold ${startup.riskScore > 70 ? 'text-red-500' : startup.riskScore > 40 ? 'text-orange-400' : 'text-green-500'}`}>
                    {startup.riskScore || '--'}/100
                  </span>
                </div>
              </div>
            </Link>
          ))}
          {filteredStartups?.length === 0 && (
            <div className="col-span-full text-center py-20 text-text-muted">
              No startups found matching your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
