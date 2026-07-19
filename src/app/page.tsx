"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { 
  ArrowRight, Sparkles, LayoutDashboard, BrainCircuit, Rocket, ChevronDown, 
  CheckCircle2, Users, BarChart3, Clock, Star, Quote, Plus, Minus, DollarSign, Calendar, Tag, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";

interface PublicProject {
  _id: string;
  title: string;
  tagline?: string;
  category: string;
  coverImage?: string;
  budget?: number;
}

const roles = ["Product Manager.", "Tech Lead.", "Business Analyst.", "Scrum Master."];

// Helper to generate a consistent gradient based on category name
const getGradient = (category: string) => {
  const gradients = [
    'from-blue-500 to-cyan-400',
    'from-purple-500 to-pink-500',
    'from-orange-400 to-rose-400',
    'from-emerald-400 to-teal-500',
    'from-indigo-500 to-purple-500'
  ];
  const charCode = category?.charCodeAt(0) || 0;
  return gradients[charCode % gradients.length];
};

const faqs = [
  {
    question: "What exactly does ProductPilot generate?",
    answer: "ProductPilot generates comprehensive Product Requirements Documents (PRDs), agile User Stories with Acceptance Criteria, and detailed Sprint Plans based on a simple description of your app idea."
  },
  {
    question: "Which AI model powers the agents?",
    answer: "We use Google's cutting-edge Gemini models to ensure high-quality, deeply technical, and contextually accurate product documentation."
  },
  {
    question: "Is my project data kept private?",
    answer: "Yes. Your ideas and generated documents are completely private to your workspace. We do not use your proprietary project data to train our models."
  },
  {
    question: "Can I export my user stories to Jira or GitHub?",
    answer: "Yes! While we offer a built-in project management dashboard, you can easily copy or export your generated user stories to your favorite external tracking tools."
  },
  {
    question: "How accurate is the AI estimation for Sprint Planning?",
    answer: "Our AI agents use industry-standard complexity metrics and historical context to estimate story points and sprint velocity. While they provide excellent baseline estimates, you can always manually adjust them."
  },
  {
    question: "Can I invite my team members?",
    answer: "Collaborative workspaces are currently in beta! Soon, you will be able to invite developers and stakeholders to view, comment on, and modify your generated product documentation in real-time."
  }
];

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const { data: latestProjects, isLoading: isProjectsLoading } = useQuery({
    queryKey: ['latestProjects'],
    queryFn: async () => {
      const res = await api.get('/projects/public?limit=4&sort=newest');
      // Limit to 4 just in case backend doesn't respect limit
      return (res.data.data as PublicProject[]).slice(0, 4);
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Premium Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 px-4 overflow-hidden min-h-[60vh] lg:min-h-[70vh] flex flex-col items-center justify-center">
        {/* Subtle Background Glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/10 blur-[150px] rounded-full" />
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-500/10 blur-[150px] rounded-full" />
        </div>
        
        <div className="container mx-auto max-w-7xl flex-1 flex flex-col justify-center relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Copy */}
            <div className="text-left z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md cursor-pointer hover:bg-blue-500/20 transition-colors">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-semibold tracking-wide text-blue-400 uppercase">ProductPilot AI 2.0 is live</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] min-h-[160px] md:min-h-[180px]">
                Your AI-Powered <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 transition-all duration-500">
                  {roles[roleIndex]}
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
                Transform raw ideas into development-ready PRDs, user stories, and agile sprint plans in seconds. Build products faster, smarter, and with zero documentation headaches.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link href="/register" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300 flex items-center justify-center gap-2 group">
                    Start Building Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/explore" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center justify-center">
                    Explore Public Ideas
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Column: Floating UI Mockup */}
            <div className="relative hidden lg:block z-10 animate-in fade-in slide-in-from-right-12 duration-1200 delay-300">
              <div className="relative w-full aspect-square max-w-[500px] mx-auto group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e2330]/80 to-[#15171e]/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden transform group-hover:-translate-y-4 group-hover:rotate-1 transition-all duration-700 group-hover:shadow-blue-500/30 group-hover:border-white/30 cursor-pointer">
                  <div className="h-12 border-b border-white/10 flex items-center px-4 gap-2 bg-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-400 transition-colors" />
                    </div>
                    <div className="mx-auto px-24 py-1 rounded-md bg-black/20 border border-white/5 text-[10px] text-gray-500 font-mono">
                      productpilot.ai/generate
                    </div>
                  </div>
                  <div className="p-6 flex flex-col gap-4 h-full">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 group-hover:bg-blue-500/40 transition-colors">
                        <Sparkles className="w-5 h-5 text-blue-400 group-hover:animate-spin" />
                      </div>
                      <div className="flex-1 space-y-2 pt-1">
                        <div className="h-4 w-1/3 bg-white/10 rounded animate-pulse" />
                        <div className="h-3 w-3/4 bg-white/5 rounded" />
                        <div className="h-3 w-1/2 bg-white/5 rounded" />
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 rounded-2xl bg-black/40 border border-white/5 group-hover:border-blue-500/30 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Generated PRD</span>
                        <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-[10px] font-bold">100% Complete</span>
                      </div>
                      <div className="space-y-3">
                        <div className="h-2 w-full bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-full" />
                        <div className="h-2 w-[85%] bg-white/10 rounded-full" />
                        <div className="h-2 w-[90%] bg-white/10 rounded-full" />
                        <div className="h-2 w-[60%] bg-white/10 rounded-full" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3 hover:bg-white/10 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                          <LayoutDashboard className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">12 Stories</div>
                          <div className="text-[10px] text-gray-500">Auto-generated</div>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3 hover:bg-white/10 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                          <BrainCircuit className="w-4 h-4 text-orange-400" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Risk Analysis</div>
                          <div className="text-[10px] text-gray-500">Completed</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-8 top-16 p-3 rounded-2xl bg-[#15171e]/90 backdrop-blur-xl border border-white/10 shadow-xl shadow-blue-500/10 animate-float group-hover:scale-110 transition-transform" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold text-gray-300">AI Agent Active</span>
                  </div>
                </div>
                
                <div className="absolute -left-6 bottom-24 p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl shadow-purple-500/20 animate-float group-hover:scale-110 transition-transform" style={{ animationDelay: '2s' }}>
                  <Rocket className="w-6 h-6 text-white group-hover:animate-bounce" />
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Clear visual flow to next section */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer" onClick={scrollToFeatures}>
          <div className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
      </section>

      {/* 1.5 Latest Projects Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Latest Product Ideas</h2>
              <p className="text-text-muted text-lg">Discover innovative projects and apps our community is building.</p>
            </div>
            <Link href="/explore">
              <Button variant="outline" className="shrink-0 border-white/10 hover:bg-white/5 flex items-center">
                See All Ideas <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isProjectsLoading ? (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="flex flex-col bg-surface/50 border border-border rounded-2xl h-[340px] overflow-hidden p-6">
                  <div className="flex justify-between mb-5">
                    <Skeleton className="h-6 w-1/3 bg-white/5 rounded" />
                    <Skeleton className="h-6 w-6 bg-white/5 rounded-full" />
                  </div>
                  <Skeleton className="h-8 w-3/4 mb-3 bg-white/5 rounded" />
                  <Skeleton className="h-4 w-full mb-2 bg-white/5 rounded" />
                  <Skeleton className="h-4 w-5/6 mb-6 bg-white/5 rounded" />
                  <div className="mt-auto flex flex-col gap-4">
                    <Skeleton className="h-4 w-full bg-white/5 rounded" />
                    <Skeleton className="h-11 w-full bg-primary/20 rounded-xl" />
                  </div>
                </div>
              ))
            ) : (
              latestProjects?.map((project: any) => (
                <div key={project._id} className="group flex flex-col bg-surface/30 border border-white/10 rounded-2xl overflow-hidden hover:bg-surface hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 shadow-lg p-6 h-[340px]">
                  
                  {/* Category Badge & Icon */}
                  <div className="flex items-start justify-between mb-5">
                     <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${getGradient(project.category)} text-white rounded-md shadow-sm`}>
                       {project.category}
                     </span>
                     <Sparkles className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-2xl font-extrabold text-white line-clamp-1 mb-2 group-hover:text-primary transition-colors" title={project.title}>
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed flex-grow">
                      {project.description || project.tagline || 'A new innovative project seeking community support to launch successfully.'}
                    </p>
                  </div>
                  
                  {/* Footer */}
                  <div className="mt-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                        <Tag className="w-3.5 h-3.5 text-purple-400" />
                        <span className="truncate max-w-[120px]">{project.industry || 'General Industry'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-blue-400" />
                        <span>{new Date(project.createdAt || Date.now()).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <Link href={`/explore/${project._id}`} className="shrink-0 w-full py-2.5 px-4 bg-white/5 hover:bg-primary text-white border border-transparent font-medium rounded-xl flex items-center justify-center gap-2 transition-all">
                      View Details
                      <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 2. Features Section */}
      <section id="features" className="py-24 bg-surface/50 border-y border-border scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to ship faster</h2>
            <p className="text-text-muted max-w-2xl mx-auto">Stop writing boilerplate documentation. Let our specialized AI agents handle the heavy lifting while you focus on the vision.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface p-8 rounded-[16px] border border-border hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BrainCircuit className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Agentic PRD Generation</h3>
              <p className="text-text-muted">Chat with our AI to refine your idea, and watch it generate comprehensive Product Requirements Documents automatically.</p>
            </div>
            
            <div className="bg-surface p-8 rounded-[16px] border border-border hover:border-secondary/50 transition-colors group">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <LayoutDashboard className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant User Stories</h3>
              <p className="text-text-muted">Convert your high-level features into detailed agile user stories with acceptance criteria and story points.</p>
            </div>

            <div className="bg-surface p-8 rounded-[16px] border border-border hover:border-accent/50 transition-colors group">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Rocket className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sprint Planning & Roadmaps</h3>
              <p className="text-text-muted">Let AI prioritize your backlog, identify technical risks, and generate optimized sprint plans to get you to MVP faster.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How ProductPilot Works</h2>
            <p className="text-text-muted max-w-2xl mx-auto">From a messy idea to a perfectly structured agile project in 4 simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />
            
            {[
              { step: 1, title: "Describe Idea", desc: "Briefly explain what you want to build in plain English." },
              { step: 2, title: "AI Analysis", desc: "Our Gemini models analyze requirements and architectural needs." },
              { step: 3, title: "Generate Assets", desc: "Instantly get PRDs, user stories, and acceptance criteria." },
              { step: 4, title: "Start Building", desc: "Export to your tracker and start coding immediately." }
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center bg-background md:bg-transparent">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl mb-6 shadow-lg shadow-primary/20 border-4 border-background">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-text-muted text-sm px-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Statistics Section */}
      <section className="py-24 bg-surface/30 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-surface/50 border border-white/5">
              <Users className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-4xl font-extrabold text-white mb-2">10k+</h3>
              <p className="text-gray-400 font-medium text-sm">Active Builders</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-surface/50 border border-white/5">
              <BarChart3 className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-4xl font-extrabold text-white mb-2">1M+</h3>
              <p className="text-gray-400 font-medium text-sm">User Stories Written</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-surface/50 border border-white/5">
              <Clock className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-4xl font-extrabold text-white mb-2">100k+</h3>
              <p className="text-gray-400 font-medium text-sm">Hours Saved</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-surface/50 border border-white/5">
              <Sparkles className="w-8 h-8 text-orange-400 mb-4" />
              <h3 className="text-4xl font-extrabold text-white mb-2">5M+</h3>
              <p className="text-gray-400 font-medium text-sm">AI Tokens Generated</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section className="py-24 border-b border-border overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Builders</h2>
            <p className="text-text-muted max-w-2xl mx-auto">Don't just take our word for it. Here's what product teams are saying.</p>
          </div>

          <div className="relative w-full marquee-container">
            <div className="flex w-max animate-marquee py-4">
              {[
                { name: "Alex R.", role: "Solo Founder", quote: "I used to spend weeks planning out MVP features before coding. ProductPilot did it all for me while I got my coffee. Game changer." },
                { name: "Sarah K.", role: "Lead Developer", quote: "The acceptance criteria generated by the AI are incredibly thorough. It catches edge cases my team normally misses until QA." },
                { name: "Marcus T.", role: "Product Manager", quote: "This tool is a massive force multiplier. I can manage 3x as many projects because the boilerplate documentation is entirely automated." },
                // Duplicate for seamless infinite scrolling
                { name: "Alex R.", role: "Solo Founder", quote: "I used to spend weeks planning out MVP features before coding. ProductPilot did it all for me while I got my coffee. Game changer." },
                { name: "Sarah K.", role: "Lead Developer", quote: "The acceptance criteria generated by the AI are incredibly thorough. It catches edge cases my team normally misses until QA." },
                { name: "Marcus T.", role: "Product Manager", quote: "This tool is a massive force multiplier. I can manage 3x as many projects because the boilerplate documentation is entirely automated." }
              ].map((test, idx) => (
                <div key={idx} className="w-[300px] md:w-[400px] shrink-0 mx-3 bg-surface/50 p-8 rounded-[24px] border border-white/10 relative hover:bg-surface/80 hover:-translate-y-1 hover:border-white/20 transition-all duration-300">
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5" />
                  <div className="flex gap-1 mb-6">
                    {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
                  </div>
                  <p className="text-gray-300 mb-8 italic text-sm leading-relaxed">"{test.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10" />
                    <div>
                      <h4 className="text-white font-bold text-sm">{test.name}</h4>
                      <span className="text-gray-500 text-xs">{test.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 35s linear infinite;
          }
          .marquee-container:hover .animate-marquee {
            animation-play-state: paused;
          }
        `}} />
      </section>

      {/* 6. FAQ Section */}
      <section className="py-24 bg-surface/20 border-b border-border overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Side: Design & Title */}
            <div className="relative">
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="relative z-10 mb-8 lg:mb-0">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-md">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold tracking-wide text-primary uppercase">Support & FAQs</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">Got Questions? <br/><span className="text-gray-400">We've got answers.</span></h2>
                <p className="text-text-muted text-lg max-w-md mb-10">Everything you need to know about the product, billing, and how ProductPilot can accelerate your workflow.</p>
                
                {/* Visual Graphic */}
                <div className="hidden lg:flex relative w-full aspect-video rounded-3xl bg-gradient-to-br from-surface to-background border border-white/10 p-6 items-center justify-center shadow-2xl">
                  <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px]" />
                  <div className="relative z-10 flex gap-6 items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 p-0.5 shadow-xl shadow-purple-500/20 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                      <div className="w-full h-full bg-surface rounded-[14px] flex items-center justify-center">
                        <BrainCircuit className="w-10 h-10 text-indigo-400" />
                      </div>
                    </div>
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 p-0.5 shadow-xl shadow-teal-500/20 transform rotate-6 hover:rotate-0 transition-transform duration-500 translate-y-6">
                      <div className="w-full h-full bg-surface rounded-[14px] flex items-center justify-center">
                        <MessageCircle className="w-10 h-10 text-emerald-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Accordion */}
            <div className="space-y-4 relative z-10">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className={`border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm ${openFaqIndex === idx ? 'bg-surface/80 shadow-primary/5' : 'bg-surface/30 hover:bg-surface/50'}`}
                >
                  <button 
                    className="w-full flex items-center justify-between p-6 text-left group"
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  >
                    <span className="font-bold text-white text-lg group-hover:text-primary transition-colors">{faq.question}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${openFaqIndex === idx ? 'bg-primary/20 text-primary' : 'bg-white/5 text-gray-400 group-hover:bg-white/10'}`}>
                      {openFaqIndex === idx ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                  <div 
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === idx ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-gray-400 leading-relaxed text-[15px]">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </section>
      
      {/* 7. CTA Section */}
      <section className="py-32 relative overflow-hidden">
        {/* BG Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to accelerate your workflow?</h2>
          <p className="text-xl text-text-muted mb-10 max-w-2xl mx-auto">Join the next generation of product managers and founders. Stop writing and start building today.</p>
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
