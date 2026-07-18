import Link from "next/link";
import { ArrowRight, Sparkles, LayoutDashboard, BrainCircuit, Rocket } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 overflow-hidden min-h-[90vh] flex items-center">
        {/* Subtle Background Glows (Moved to edges, lower opacity, no sharp circles) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/5 blur-[150px] rounded-full" />
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-500/5 blur-[150px] rounded-full" />
        </div>
        
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Copy */}
            <div className="text-left z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-semibold tracking-wide text-blue-400 uppercase">ProductPilot AI 2.0 is live</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
                Your AI-Powered <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                  Product Manager.
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
                Transform raw ideas into development-ready PRDs, user stories, and agile sprint plans in seconds. Build products faster, smarter, and with zero documentation headaches.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link href="/register" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300 flex items-center justify-center gap-2">
                    Start Building Free
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/explore" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                    Explore Public Ideas
                  </button>
                </Link>
              </div>
              
              <div className="mt-10 flex items-center gap-4 text-sm text-gray-500 font-medium">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-[#0f1117] bg-gradient-to-br from-gray-700 to-gray-900 z-${5-i}`} />
                  ))}
                </div>
                <p>Trusted by 10,000+ builders worldwide.</p>
              </div>
            </div>

            {/* Right Column: Floating UI Mockup */}
            <div className="relative hidden lg:block z-10 animate-in fade-in slide-in-from-right-12 duration-1200 delay-300">
              <div className="relative w-full aspect-square max-w-[600px] mx-auto">
                {/* Main floating card */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e2330]/80 to-[#15171e]/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden transform hover:-translate-y-2 transition-transform duration-700 hover:shadow-blue-500/20 hover:border-white/20">
                  {/* Mockup Header */}
                  <div className="h-12 border-b border-white/10 flex items-center px-4 gap-2 bg-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="mx-auto px-24 py-1 rounded-md bg-black/20 border border-white/5 text-[10px] text-gray-500 font-mono">
                      productpilot.ai/generate
                    </div>
                  </div>
                  {/* Mockup Body */}
                  <div className="p-6 flex flex-col gap-4 h-full">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex-1 space-y-2 pt-1">
                        <div className="h-4 w-1/3 bg-white/10 rounded animate-pulse" />
                        <div className="h-3 w-3/4 bg-white/5 rounded" />
                        <div className="h-3 w-1/2 bg-white/5 rounded" />
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 rounded-2xl bg-black/40 border border-white/5">
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
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                          <LayoutDashboard className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">12 Stories</div>
                          <div className="text-[10px] text-gray-500">Auto-generated</div>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
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

                {/* Decorative floating elements */}
                <div className="absolute -right-8 top-16 p-3 rounded-2xl bg-[#15171e]/90 backdrop-blur-xl border border-white/10 shadow-xl shadow-blue-500/10 animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold text-gray-300">AI Agent Active</span>
                  </div>
                </div>
                
                <div className="absolute -left-6 bottom-24 p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl shadow-purple-500/20 animate-float" style={{ animationDelay: '2s' }}>
                  <Rocket className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-surface/50 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to ship faster</h2>
            <p className="text-text-muted max-w-2xl mx-auto">Stop writing boilerplate documentation. Let our specialized AI agents handle the heavy lifting while you focus on the vision.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-surface p-8 rounded-[16px] border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <BrainCircuit className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Agentic PRD Generation</h3>
              <p className="text-text-muted">Chat with our AI to refine your idea, and watch it generate comprehensive Product Requirements Documents automatically.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-surface p-8 rounded-[16px] border border-border hover:border-secondary/50 transition-colors">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                <LayoutDashboard className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant User Stories</h3>
              <p className="text-text-muted">Convert your high-level features into detailed agile user stories with acceptance criteria and story points.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-surface p-8 rounded-[16px] border border-border hover:border-accent/50 transition-colors">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <Rocket className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sprint Planning & Roadmaps</h3>
              <p className="text-text-muted">Let AI prioritize your backlog, identify technical risks, and generate optimized sprint plans to get you to MVP faster.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to accelerate your workflow?</h2>
          <p className="text-xl text-text-muted mb-10">Join the next generation of product managers and founders.</p>
          <Link href="/register">
            <Button size="lg" className="px-12 py-6 text-lg rounded-full">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
