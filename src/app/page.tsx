import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-glow" />
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border mb-8 animate-float">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span className="text-sm text-text-muted">LaunchPilot AI is now in Beta</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Build your startup <br />
            <span className="text-gradient">with an AI Co-Founder</span>
          </h1>
          
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10">
            Validate ideas, generate business models, and analyze risks in seconds. Let our intelligent agent guide you from concept to launch.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="px-8 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20 w-full sm:w-auto">
              Start Building Free
            </Link>
            <Link href="/explore" className="px-8 py-4 rounded-xl glass text-foreground font-semibold hover:bg-surface-hover transition-colors w-full sm:w-auto">
              Explore Startups
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-surface border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Everything you need to launch</h2>
            <p className="text-text-muted max-w-xl mx-auto">Our AI agents work around the clock to help you build a solid foundation for your business.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Content Generator</h3>
              <p className="text-text-muted">Instantly generate Lean Canvas business models and high-converting landing page copy based on your raw pitch.</p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full blur-2xl" />
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-6 relative z-10">
                <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 relative z-10">Smart Recommendations</h3>
              <p className="text-text-muted relative z-10">Get actionable pricing strategies and a comprehensive risk analysis score to bulletproof your startup idea.</p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Chat Assistant</h3>
              <p className="text-text-muted">Brainstorm directly with your AI Co-Founder. It remembers your startup context and helps you solve problems in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to launch?</h2>
          <p className="text-xl text-text-muted mb-10 max-w-2xl mx-auto">Join thousands of founders who are building the future with LaunchPilot AI.</p>
          <Link href="/register" className="inline-block px-10 py-5 rounded-xl bg-foreground text-background font-bold text-lg hover:bg-gray-200 transition-colors">
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  );
}
