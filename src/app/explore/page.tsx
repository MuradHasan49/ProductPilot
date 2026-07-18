"use client";
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import Link from 'next/link';
import { Sparkles, Globe, Search, ArrowRight, DollarSign, Calendar, MapPin, Tag } from 'lucide-react';
import { Skeleton } from '@/components/ui/Skeleton';

interface Project {
  _id: string;
  title: string;
  category: string;
  description: string;
  budget?: number;
  industry?: string;
  coverImage?: string;
  visibility: string;
  createdAt: string;
}

// Helper to generate a consistent gradient based on category name
const getGradient = (category: string) => {
  const gradients = [
    'from-blue-500 to-cyan-400',
    'from-purple-500 to-pink-500',
    'from-orange-400 to-rose-400',
    'from-emerald-400 to-teal-500',
    'from-indigo-500 to-purple-500'
  ];
  const charCode = category.charCodeAt(0) || 0;
  return gradients[charCode % gradients.length];
};

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);

  const categories = ['All', 'AI Tool', 'Marketplace', 'SaaS', 'Mobile App', 'Web App', 'Other'];

  const { data: queryData, isLoading, error } = useQuery({
    queryKey: ['publicProjects', search, category, sort, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category !== 'All') params.append('category', category);
      params.append('sort', sort);
      params.append('page', page.toString());
      params.append('limit', '8');
      
      const res = await api.get(`/projects/public?${params.toString()}`);
      return res.data;
    }
  });

  const projects = queryData?.data as Project[] | undefined;
  const pagination = queryData?.pagination;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden border-b border-border bg-surface/30">
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-purple-500/10 blur-[120px] rounded-full" />
        </div>
        
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <Globe className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold tracking-wide text-purple-400 uppercase">Community</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Explore Ideas
          </h1>
          <p className="text-xl text-text-muted leading-relaxed mb-10 max-w-2xl mx-auto">
            Discover what other builders are creating with ProductPilot. Get inspired by public projects, read their requirements, and spark your next big idea.
          </p>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search projects, categories, or keywords..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full bg-background border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Filters Bar */}
      <div className="bg-surface/80 backdrop-blur-md border-b border-white/5 py-4 sticky top-0 z-30">
        <div className="container mx-auto px-4 max-w-screen-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          
          {/* Categories Pill Menu */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setPage(1); }}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat 
                    ? 'bg-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat === 'All' ? 'All Ideas' : cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 shrink-0">
            <select 
              value={sort} 
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
              className="appearance-none bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer transition-colors outline-none"
            >
              <option className="bg-surface" value="newest">Newest First</option>
              <option className="bg-surface" value="oldest">Oldest First</option>
              <option className="bg-surface" value="budget_high">Highest Budget</option>
              <option className="bg-surface" value="budget_low">Lowest Budget</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid Section */}
      <section className="py-20 flex-grow bg-background">
        <div className="container mx-auto px-4 max-w-screen-2xl">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="flex flex-col bg-surface/50 border border-border rounded-2xl h-[480px] overflow-hidden">
                  <Skeleton className="h-48 w-full bg-white/5 shrink-0" />
                  <div className="p-5 flex flex-col flex-grow">
                    <Skeleton className="h-6 w-3/4 mb-3 bg-white/5 rounded" />
                    <Skeleton className="h-4 w-full mb-2 bg-white/5 rounded" />
                    <Skeleton className="h-4 w-5/6 mb-6 bg-white/5 rounded" />
                    
                    <div className="mt-auto space-y-3 mb-6">
                      <Skeleton className="h-4 w-1/2 bg-white/5 rounded" />
                      <Skeleton className="h-4 w-2/3 bg-white/5 rounded" />
                    </div>
                    
                    <Skeleton className="h-11 w-full bg-white/5 rounded-xl mt-auto" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
             <div className="text-center py-20 bg-error/10 border border-error/20 rounded-[24px] max-w-2xl mx-auto">
               <p className="text-error font-medium">Failed to load community projects. Please try again later.</p>
             </div>
          ) : projects && projects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects.map((project) => (
                <div key={project._id} className="group flex flex-col bg-surface/30 border border-white/10 rounded-2xl overflow-hidden hover:bg-surface/60 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 shadow-lg h-[480px]">
                  
                  {/* Image Banner */}
                  <div className={`h-48 w-full shrink-0 relative ${
                    project.coverImage 
                      ? 'bg-cover bg-center' 
                      : `bg-gradient-to-br ${getGradient(project.category)}`
                  }`}
                  style={project.coverImage ? { backgroundImage: `url(${project.coverImage})` } : {}}
                  >
                    {!project.coverImage && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Sparkles className="w-12 h-12 text-white/50" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md text-white border border-white/20 rounded-full shadow-lg">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white line-clamp-1 mb-2" title={project.title}>
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-6 leading-relaxed flex-grow">
                      {project.description}
                    </p>
                    
                    {/* Meta Info */}
                    <div className="space-y-3 mb-6 mt-auto">
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">
                          {project.budget ? `$${project.budget.toLocaleString()} Budget` : 'Flexible Budget'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span className="truncate">
                          Listed {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                        <Tag className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span className="truncate">
                          {project.industry || 'General Industry'}
                        </span>
                      </div>
                    </div>

                    {/* View Details Link */}
                    <Link href={`/explore/${project._id}`} className="shrink-0 w-full py-2.5 px-4 bg-white/5 hover:bg-primary hover:text-white border border-white/10 hover:border-primary text-gray-300 font-medium rounded-xl flex items-center justify-center gap-2 transition-all mt-auto group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                      View Details
                      <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {pagination && pagination.pages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-16">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-5 py-2.5 rounded-xl bg-surface border border-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5 transition-colors font-medium"
                >
                  Previous
                </button>
                <div className="px-4 py-2 rounded-xl bg-black/20 border border-white/5 text-sm text-gray-400">
                  Page <span className="text-white font-bold">{page}</span> of <span className="text-white font-bold">{pagination.pages}</span>
                </div>
                <button 
                  onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                  disabled={page === pagination.pages}
                  className="px-5 py-2.5 rounded-xl bg-surface border border-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5 transition-colors font-medium"
                >
                  Next
                </button>
              </div>
            )}
            </>
          ) : (
            <div className="text-center py-32 max-w-xl mx-auto">
              <div className="w-20 h-20 bg-surface border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Sparkles className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">No public projects found</h3>
              <p className="text-gray-400 mb-8">
                {search 
                  ? "We couldn't find any public projects matching your search. Try different keywords." 
                  : "It looks like there aren't any public projects yet. Be the first to share your idea with the world!"}
              </p>
              <Link href="/dashboard/projects/new">
                <button className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors">
                  Create a Project
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
