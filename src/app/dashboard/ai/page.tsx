"use client";

import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Send, Bot, Sparkles, FileText, ListTodo, FileJson } from 'lucide-react';

export default function AIWorkspacePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const projectId = searchParams.get('project');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Hello! I'm your ProductPilot AI co-founder. I can help you brainstorm features, analyze risks, or generate structured documentation like PRDs and User Stories. What are we building today?" }
  ]);
  const [input, setInput] = useState('');
  const [generatedDoc, setGeneratedDoc] = useState<string | null>(null);
  const [docType, setDocType] = useState<string>('Document');
  const [docLength, setDocLength] = useState<string>('medium');
  
  const [ideaInput, setIdeaInput] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateProjectMutation = useMutation({
    mutationFn: async (idea: string) => {
      const res = await api.post('/ai/generate-project', { idea });
      return res.data.data;
    },
    onSuccess: (data) => {
      // Redirect to the newly created project in the AI workspace
      router.push(`/dashboard/ai?project=${data._id}`);
      setIdeaInput('');
    }
  });

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const res = await api.post('/ai/chat', { projectId, message });
      return res.data.data;
    },
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: 'assistant', content: data }]);
    },
    onError: () => {
      setMessages((prev) => [...prev, { role: 'assistant', content: "Sorry, I encountered an error. Please try again." }]);
    }
  });

  const generateMutation = useMutation({
    mutationFn: async (endpoint: 'prd' | 'user-stories') => {
      const res = await api.post(`/ai/${endpoint}`, { projectId, length: docLength });
      return res.data.data;
    },
    onSuccess: (data, variables) => {
      setGeneratedDoc(data);
      setDocType(variables === 'prd' ? 'Product Requirements Document' : 'User Stories');
    }
  });

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !projectId) return;

    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    chatMutation.mutate(input);
    setInput('');
  };

  if (!projectId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-md animate-pulse">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold tracking-wide text-primary uppercase">Global Idea Generator</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
          What are we <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">building</span> today?
        </h1>
        
        <p className="text-text-muted text-lg md:text-xl mb-12 max-w-2xl">
          Don't waste time filling out forms. Just describe your app idea in plain English, and our AI will bootstrap the entire project for you instantly.
        </p>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            if (ideaInput.trim()) generateProjectMutation.mutate(ideaInput);
          }}
          className="w-full relative group"
        >
          {/* Glowing background effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          
          <div className="relative flex items-center bg-surface border border-white/10 rounded-2xl p-2 shadow-2xl focus-within:border-primary/50 transition-colors">
            <input 
              type="text"
              value={ideaInput}
              onChange={(e) => setIdeaInput(e.target.value)}
              disabled={generateProjectMutation.isPending}
              placeholder="e.g. I want to build an Uber for dog walking in my city..."
              className="flex-1 bg-transparent border-none outline-none px-6 py-4 text-lg text-white placeholder:text-gray-500 disabled:opacity-50"
            />
            <Button 
              type="submit" 
              size="lg" 
              disabled={!ideaInput.trim() || generateProjectMutation.isPending}
              className="rounded-xl px-8 py-6 font-bold text-md shadow-lg flex items-center gap-2"
            >
              {generateProjectMutation.isPending ? (
                <>
                  <Bot className="w-5 h-5 animate-pulse" />
                  Bootstrapping...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Project
                </>
              )}
            </Button>
          </div>
        </form>

        {generateProjectMutation.isPending && (
          <div className="mt-8 text-sm text-gray-400 animate-pulse">
            Structuring database schema, categorizing industry, estimating budget...
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
      {/* Left Panel: Chat Interface */}
      <div className="flex flex-col w-full lg:w-1/3 bg-surface border border-border rounded-[16px] overflow-hidden">
        <div className="p-4 border-b border-border bg-surface-hover flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">AI Co-Founder</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                msg.role === 'user' 
                  ? 'bg-primary text-white rounded-br-none' 
                  : 'bg-surface-hover border border-border rounded-bl-none text-foreground'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {chatMutation.isPending && (
            <div className="flex justify-start">
              <div className="bg-surface-hover border border-border rounded-2xl rounded-bl-none px-4 py-3 flex gap-1">
                <div className="w-2 h-2 rounded-full bg-text-muted animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-text-muted animate-bounce delay-75" />
                <div className="w-2 h-2 rounded-full bg-text-muted animate-bounce delay-150" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-border bg-background">
          <form onSubmit={handleSendChat} className="flex gap-2">
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for advice, refine features..."
              className="flex-1 rounded-full"
            />
            <Button type="submit" disabled={chatMutation.isPending || !input.trim()} className="rounded-full w-10 h-10 p-0 shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Right Panel: Document Generation */}
      <div className="flex flex-col w-full lg:w-2/3 bg-surface border border-border rounded-[16px] overflow-hidden">
        <div className="p-4 border-b border-border bg-surface-hover flex flex-wrap items-center justify-between gap-4">
          <h3 className="font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5 text-secondary" />
            Document Output
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <select 
              value={docLength} 
              onChange={(e) => setDocLength(e.target.value)}
              className="bg-background border border-border rounded-lg px-3 py-1.5 text-sm outline-none focus:border-primary"
            >
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Detailed</option>
            </select>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => generateMutation.mutate('prd')}
                isLoading={generateMutation.isPending && generateMutation.variables === 'prd'}
              >
                <FileJson className="w-4 h-4 mr-2" />
                Generate PRD
              </Button>
              <Button 
                size="sm" 
                variant="primary"
                onClick={() => generateMutation.mutate('user-stories')}
                isLoading={generateMutation.isPending && generateMutation.variables === 'user-stories'}
              >
                <ListTodo className="w-4 h-4 mr-2" />
                Generate Stories
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-background">
          {generatedDoc ? (
            <div className="max-w-3xl mx-auto">
              <div className="mb-8 pb-4 border-b border-border">
                <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-2">AI GENERATED</span>
                <h1 className="text-2xl font-bold">{docType}</h1>
              </div>
              <article className="prose prose-invert prose-blue max-w-none">
                <ReactMarkdown>{generatedDoc}</ReactMarkdown>
              </article>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div className="w-16 h-16 bg-surface-hover border border-border rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-text-muted" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Document Generated</h3>
              <p className="text-text-muted text-sm">Use the buttons above to generate comprehensive Product Requirements Documents or User Stories based on your project context and chat history.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
