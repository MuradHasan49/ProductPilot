"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function AddIdeaPage() {
  const [ideaName, setIdeaName] = useState("");
  const [pitch, setPitch] = useState("");
  const [industry, setIndustry] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post('/startups', { ideaName, pitch, industry });
      if (res.data.success) {
        router.push(`/ideas/${res.data.data._id}/manage`);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl flex-1">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create a New Startup</h1>
        <p className="text-text-muted mt-2">Tell us about your idea. Our AI will help you validate and plan it.</p>
      </div>

      <div className="glass-card p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full blur-2xl pointer-events-none" />
        
        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm relative z-10">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Startup Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground focus:outline-none focus:border-primary transition-colors"
              placeholder="e.g. LaunchPilot AI"
              value={ideaName}
              onChange={(e) => setIdeaName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Industry</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground focus:outline-none focus:border-primary transition-colors"
              placeholder="e.g. SaaS, FinTech, E-commerce"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Elevator Pitch</label>
            <textarea 
              className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground focus:outline-none focus:border-primary transition-colors h-32 resize-none"
              placeholder="Describe your startup in 1-2 sentences. What problem are you solving and who are you solving it for?"
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              required
            />
          </div>
          
          <div className="pt-4 flex justify-end gap-4">
            <button 
              type="button" 
              onClick={() => router.back()}
              className="px-6 py-3 rounded-xl bg-surface text-foreground font-semibold hover:bg-surface-hover transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Startup'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
