"use client";
import { useState, use, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Bot, FileText, LayoutTemplate, ShieldAlert, Send, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function ManageIdeaPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const startupId = unwrappedParams.id;
  const queryClient = useQueryClient();
  
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const { data: startup, isLoading } = useQuery({
    queryKey: ['startup', startupId],
    queryFn: async () => {
      const res = await api.get(`/startups/${startupId}`);
      return res.data.data;
    }
  });

  const generateContentMutation = useMutation({
    mutationFn: async (type: string) => {
      const res = await api.post('/ai/generate-content', { startupId, type });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['startup', startupId] });
    }
  });

  const getRecommendationsMutation = useMutation({
    mutationFn: async () => {
      const res = await api.get(`/ai/recommendations/${startupId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['startup', startupId] });
    }
  });

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const res = await api.post('/ai/chat', { startupId, message });
      return res.data.data;
    },
    onSuccess: (data) => {
      setChatHistory(data.history);
      setChatMessage('');
    }
  });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    setChatHistory(prev => [...prev, { role: 'user', content: chatMessage }]);
    chatMutation.mutate(chatMessage);
  };

  if (isLoading) return <div className="p-8"><div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mt-20"></div></div>;
  if (!startup) return <div className="text-center mt-20">Startup not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-8">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-wider mb-3">
            {startup.industry}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">{startup.ideaName}</h1>
          <p className="text-text-muted max-w-3xl text-lg">{startup.pitch}</p>
        </div>
        {startup.riskScore && (
          <div className="hidden md:flex flex-col items-center justify-center p-4 rounded-2xl glass-card border-orange-500/30">
            <span className="text-sm text-text-muted mb-1">Risk Score</span>
            <span className={`text-3xl font-bold ${startup.riskScore > 70 ? 'text-red-500' : startup.riskScore > 40 ? 'text-orange-400' : 'text-green-500'}`}>
              {startup.riskScore}/100
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        
        {/* Left Column: AI Documents & Actions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => generateContentMutation.mutate('businessModel')}
              disabled={generateContentMutation.isPending}
              className="flex flex-col items-center justify-center p-6 rounded-2xl glass-card hover:border-primary/50 transition-colors disabled:opacity-50"
            >
              {generateContentMutation.isPending && generateContentMutation.variables === 'businessModel' ? (
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mb-3"></div>
              ) : (
                <FileText className="text-primary mb-3" size={32} />
              )}
              <span className="font-medium">Generate Business Model</span>
            </button>
            
            <button 
              onClick={() => generateContentMutation.mutate('landingPage')}
              disabled={generateContentMutation.isPending}
              className="flex flex-col items-center justify-center p-6 rounded-2xl glass-card hover:border-secondary/50 transition-colors disabled:opacity-50"
            >
              {generateContentMutation.isPending && generateContentMutation.variables === 'landingPage' ? (
                <div className="w-8 h-8 rounded-full border-2 border-secondary border-t-transparent animate-spin mb-3"></div>
              ) : (
                <LayoutTemplate className="text-secondary mb-3" size={32} />
              )}
              <span className="font-medium">Generate Landing Page</span>
            </button>

            <button 
              onClick={() => getRecommendationsMutation.mutate()}
              disabled={getRecommendationsMutation.isPending}
              className="flex flex-col items-center justify-center p-6 rounded-2xl glass-card hover:border-orange-400/50 transition-colors disabled:opacity-50"
            >
              {getRecommendationsMutation.isPending ? (
                <div className="w-8 h-8 rounded-full border-2 border-orange-400 border-t-transparent animate-spin mb-3"></div>
              ) : (
                <ShieldAlert className="text-orange-400 mb-3" size={32} />
              )}
              <span className="font-medium">Analyze Risks & Pricing</span>
            </button>
          </div>

          {/* Document Viewer */}
          <div className="glass-card rounded-2xl overflow-hidden min-h-[500px] flex flex-col">
            <div className="bg-surface border-b border-border p-4 flex gap-4">
              <div className="font-semibold text-primary">Business Model</div>
              <div className="text-text-muted hover:text-foreground cursor-pointer transition-colors">Landing Page</div>
            </div>
            <div className="p-8 overflow-y-auto prose prose-invert max-w-none">
              {startup.businessModel ? (
                <ReactMarkdown>{startup.businessModel}</ReactMarkdown>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-text-muted opacity-50 py-20">
                  <Sparkles size={48} className="mb-4" />
                  <p>Click "Generate Business Model" to create your lean canvas.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: AI Co-Founder Chat */}
        <div className="glass-card rounded-2xl flex flex-col h-[700px] lg:h-auto border-primary/20">
          <div className="p-4 border-b border-border bg-surface/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Bot className="text-primary" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI Co-Founder</h3>
              <p className="text-xs text-text-muted">Online and ready to brainstorm</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.length === 0 && (
              <div className="text-center text-sm text-text-muted my-10">
                Hi! I'm your AI Co-Founder. Ask me anything about {startup.ideaName}, your market, or technical implementation!
              </div>
            )}
            
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-4 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-surface border border-border text-foreground rounded-tl-none'
                }`}>
                  <ReactMarkdown className="prose prose-sm prose-invert">{msg.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            {chatMutation.isPending && (
              <div className="flex justify-start">
                <div className="bg-surface border border-border rounded-2xl rounded-tl-none p-4 flex gap-1 items-center">
                  <div className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 bg-surface border-t border-border">
            <form onSubmit={handleChatSubmit} className="flex gap-2">
              <input 
                type="text"
                className="flex-1 bg-background border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Ask your co-founder..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
              />
              <button 
                type="submit" 
                disabled={!chatMessage.trim() || chatMutation.isPending}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white hover:bg-primary-hover transition-colors disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
