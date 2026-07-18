import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Target, Zap, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'About | ProductPilot AI',
  description: 'Learn more about ProductPilot and our mission to accelerate software development.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden border-b border-border">
        {/* Background Glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-primary/10 blur-[120px] rounded-full" />
        </div>
        
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold tracking-wide text-primary uppercase">Our Mission</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            We are building the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Future of Product Management.
            </span>
          </h1>
          
          <p className="text-xl text-text-muted leading-relaxed max-w-2xl mx-auto">
            ProductPilot was founded on a simple belief: builders should spend their time building, not writing boilerplate documentation. We use advanced AI to turn raw ideas into development-ready specs in seconds.
          </p>
        </div>
      </section>

      {/* The Problem & Solution Section */}
      <section className="py-24 bg-surface/30 border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">The Old Way is Broken</h2>
              <p className="text-text-muted text-lg leading-relaxed mb-6">
                Historically, moving a software project from an "idea" to a "sprint" takes weeks. Founders and Product Managers spend countless hours writing Product Requirements Documents (PRDs), breaking down epics, estimating user stories, and arguing over acceptance criteria.
              </p>
              <p className="text-text-muted text-lg leading-relaxed">
                This process is manual, error-prone, and massively slows down time-to-market. Great ideas die in the planning phase because the barrier to entry is simply too high.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-error/20 to-transparent blur-3xl rounded-full" />
              <div className="relative bg-surface border border-error/20 p-8 rounded-2xl">
                <div className="space-y-4 opacity-50 grayscale">
                  <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse" />
                  <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-white/10 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-white/10 rounded animate-pulse" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-error/10 text-error border border-error/20 px-4 py-2 rounded-lg font-bold backdrop-blur-md transform -rotate-12">
                    Weeks of Planning
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-text-muted max-w-2xl mx-auto">What drives us to build the best product management tool in the world.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface/50 p-8 rounded-[24px] border border-border">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Speed Over Everything</h3>
              <p className="text-text-muted">We believe momentum is the most important metric for a startup. If we can save you an hour of planning, we've done our job.</p>
            </div>
            
            <div className="bg-surface/50 p-8 rounded-[24px] border border-border">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Precision & Quality</h3>
              <p className="text-text-muted">AI shouldn't just generate text; it should generate accurate, technically sound architectural decisions and acceptance criteria.</p>
            </div>

            <div className="bg-surface/50 p-8 rounded-[24px] border border-border">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Data Privacy</h3>
              <p className="text-text-muted">Your ideas are your IP. We do not use your private workspace data to train our foundational models.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team / Stats */}
      <section className="py-24 bg-surface/30 border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-12">Built by Builders, for Builders.</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-4xl font-extrabold text-white mb-2">10k+</h3>
              <p className="text-text-muted">Users</p>
            </div>
            <div>
              <h3 className="text-4xl font-extrabold text-white mb-2">99%</h3>
              <p className="text-text-muted">Uptime</p>
            </div>
            <div>
              <h3 className="text-4xl font-extrabold text-white mb-2">5M+</h3>
              <p className="text-text-muted">Tokens Generated</p>
            </div>
            <div>
              <h3 className="text-4xl font-extrabold text-white mb-2">24/7</h3>
              <p className="text-text-muted">AI Availability</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to join the revolution?</h2>
          <p className="text-xl text-text-muted mb-10 max-w-2xl mx-auto">Stop writing boilerplate documentation. Let our specialized AI agents handle the heavy lifting while you focus on the vision.</p>
          <Link href="/register">
            <Button size="lg" className="px-12 py-6 text-lg rounded-full hover:scale-105 transition-transform hover:shadow-xl hover:shadow-primary/20">
              Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
