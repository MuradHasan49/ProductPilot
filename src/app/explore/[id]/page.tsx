"use client";
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Sparkles, Calendar, DollarSign, Tag, Target, Briefcase, ChevronRight, Star, ExternalLink, Activity } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/Skeleton';

interface Project {
  _id: string;
  title: string;
  category: string;
  tagline?: string;
  description: string;
  businessGoal?: string;
  targetAudience?: string;
  budget?: number;
  timeline?: string;
  industry?: string;
  coverImage?: string;
  createdAt: string;
}

// Helper to generate a consistent gradient based on category name
const getGradient = (category: string) => {
  const gradients = [
    'from-blue-500/20 to-cyan-400/20',
    'from-purple-500/20 to-pink-500/20',
    'from-orange-400/20 to-rose-400/20',
    'from-emerald-400/20 to-teal-500/20',
    'from-indigo-500/20 to-purple-500/20'
  ];
  const charCode = category ? (category.charCodeAt(0) || 0) : 0;
  return gradients[charCode % gradients.length];
};

export default function DetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['publicProject', id],
    queryFn: async () => {
      const res = await api.get(`/projects/public/${id}`);
      return res.data.data as Project;
    }
  });

  const { data: relatedProjects } = useQuery({
    queryKey: ['relatedProjects', project?.category],
    queryFn: async () => {
      if (!project?.category) return [];
      const res = await api.get(`/projects/public?search=${project.category}`);
      return (res.data.data as Project[]).filter(p => p._id !== id).slice(0, 3);
    },
    enabled: !!project?.category
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        <Skeleton className="h-[400px] w-full rounded-3xl mb-12 bg-white/5" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-12 w-3/4 rounded bg-white/5" />
            <Skeleton className="h-6 w-full rounded bg-white/5" />
            <Skeleton className="h-6 w-full rounded bg-white/5" />
            <Skeleton className="h-6 w-4/5 rounded bg-white/5" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-[300px] w-full rounded-2xl bg-white/5" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="w-24 h-24 bg-surface border border-white/10 rounded-full flex items-center justify-center mb-6 shadow-2xl text-red-500">
          <Activity className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Project Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md text-center">
          The project you are looking for doesn't exist, is private, or has been removed.
        </p>
        <Link href="/explore">
          <button className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
            Back to Explore
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pb-20">
      
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-6 max-w-6xl flex items-center text-sm text-gray-500">
        <Link href="/explore" className="hover:text-primary transition-colors">Explore</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-300">{project.category}</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-white font-medium truncate max-w-[200px]">{project.title}</span>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Main Hero / Image Gallery Area */}
        <div className={`relative w-full h-[400px] md:h-[500px] rounded-[32px] overflow-hidden mb-12 border border-white/10 shadow-2xl ${!project.coverImage ? `bg-gradient-to-br ${getGradient(project.category)}` : ''}`}>
          {project.coverImage ? (
            <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
              <Sparkles className="w-20 h-20 text-white/30 mb-6" />
              <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center max-w-3xl px-4 tracking-tight drop-shadow-lg">
                {project.title}
              </h1>
            </div>
          )}
          
          <div className="absolute bottom-6 left-6 flex gap-3">
            <span className="px-4 py-2 text-sm font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20 rounded-xl shadow-lg flex items-center gap-2">
              <Tag className="w-4 h-4 text-purple-400" />
              {project.category}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview Section */}
            <section>
              {project.coverImage && (
                <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">{project.title}</h1>
              )}
              {project.tagline && (
                <p className="text-xl text-primary font-medium mb-6">{project.tagline}</p>
              )}
              
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
                Description & Overview
              </h2>
              <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-4 whitespace-pre-wrap text-lg bg-surface/30 p-8 rounded-3xl border border-white/5">
                {project.description}
              </div>
            </section>

            {/* Target Audience & Business Goal (If applicable) */}
            {(project.targetAudience || project.businessGoal) && (
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.targetAudience && (
                  <div className="bg-surface/30 p-8 rounded-3xl border border-white/5">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-rose-400" />
                      Target Audience
                    </h3>
                    <p className="text-gray-400 leading-relaxed">{project.targetAudience}</p>
                  </div>
                )}
                {project.businessGoal && (
                  <div className="bg-surface/30 p-8 rounded-3xl border border-white/5">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-amber-400" />
                      Business Goal
                    </h3>
                    <p className="text-gray-400 leading-relaxed">{project.businessGoal}</p>
                  </div>
                )}
              </section>
            )}

            {/* Reviews Section */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center">
                  <Star className="w-4 h-4" />
                </div>
                Reviews & Ratings
              </h2>
              <div className="bg-surface/30 border border-dashed border-white/10 rounded-3xl p-12 text-center flex flex-col items-center">
                <Star className="w-12 h-12 text-gray-600 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No Reviews Yet</h3>
                <p className="text-gray-400 max-w-sm mb-6">This project is new and hasn't received any community reviews or ratings.</p>
                <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-colors">
                  Be the first to review
                </button>
              </div>
            </section>

          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            
            {/* Key Information / Specifications */}
            <div className="bg-surface/50 border border-white/10 rounded-3xl p-8 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Key Specifications</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" /> Budget
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {project.budget ? `$${project.budget.toLocaleString()}` : 'Flexible / TBD'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-400" /> Timeline
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {project.timeline || 'Not specified'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-purple-400" /> Industry
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {project.industry || 'General'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" /> Date Listed
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {new Date(project.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <button className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center gap-2 group">
                  Contact Creator
                  <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Related Items */}
      {relatedProjects && relatedProjects.length > 0 && (
        <section className="container mx-auto px-4 max-w-6xl mt-24">
          <h2 className="text-2xl font-bold text-white mb-8 border-t border-white/5 pt-12 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            Related Ideas in {project.category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((rel) => (
              <Link href={`/explore/${rel._id}`} key={rel._id} className="group flex flex-col bg-surface/30 border border-white/10 rounded-2xl overflow-hidden hover:bg-surface/60 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 shadow-lg">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{rel.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2 mb-4">{rel.description}</p>
                  <div className="flex items-center text-primary text-sm font-medium gap-1 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                    View Details <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
