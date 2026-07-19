"use client";

import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Send, Bot, Sparkles, FileText, ListTodo, FileJson, Edit2, Save, ArrowRight, Leaf, Video, ChefHat, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function AIWorkspacePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const projectId = searchParams.get('project');
  const docId = searchParams.get('docId');
  const [currentDocId, setCurrentDocId] = useState<string | null>(docId || null);
  
  const { data: documents } = useQuery({
    queryKey: ['documents', projectId],
    queryFn: async () => {
      const res = await api.get(`/projects/${projectId}/documents`);
      return res.data.data;
    },
    enabled: !!projectId && !!docId
  });

  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const res = await api.get(`/projects/${projectId}`);
      return res.data.data;
    },
    enabled: !!projectId
  });

  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Hello! I'm your ProductPilot AI co-founder. I can help you brainstorm features, analyze risks, or generate structured documentation like PRDs and User Stories. What are we building today?" }
  ]);
  const [input, setInput] = useState('');
  const [generatedDoc, setGeneratedDoc] = useState<string | null>(null);
  const [docType, setDocType] = useState<string>('Document');
  const [docLength, setDocLength] = useState<string>('medium');
  const [isEditingDoc, setIsEditingDoc] = useState(false);
  const [docTitle, setDocTitle] = useState('');
  
  const [ideaInput, setIdeaInput] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (documents && docId) {
      const doc = documents.find((d: any) => d._id === docId);
      if (doc) {
        setGeneratedDoc(doc.content);
        setDocType(doc.type);
        setDocTitle(doc.title);
        setCurrentDocId(doc._id);
      }
    }
  }, [documents, docId]);

  const generateProjectMutation = useMutation({
    mutationFn: async (idea: string) => {
      const res = await api.post('/ai/generate-project', { idea });
      return res.data.data;
    },
    onSuccess: (data) => {
      // Redirect to the newly created project in the AI workspace
      router.push(`/dashboard/ai?project=${data._id}`);
      setIdeaInput('');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to generate project. Please try again.");
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
      setDocType(variables === 'prd' ? 'PRD' : 'User Stories');
      setDocTitle(`AI Generated ${variables === 'prd' ? 'PRD' : 'User Stories'} - ${new Date().toLocaleDateString()}`);
      setCurrentDocId(null); // Reset since it's a new generation
      setIsEditingDoc(false);
    }
  });

  const saveDocMutation = useMutation({
    mutationFn: async () => {
      if (!generatedDoc || !projectId) throw new Error("Missing data");
      
      if (currentDocId) {
        // Update existing document
        const res = await api.patch(`/projects/${projectId}/documents/${currentDocId}`, {
          title: docTitle,
          type: docType,
          content: generatedDoc
        });
        return res.data;
      } else {
        // Create new document
        const res = await api.post(`/projects/${projectId}/documents`, {
          title: docTitle,
          type: docType,
          content: generatedDoc
        });
        return res.data;
      }
    },
    onSuccess: (data) => {
      toast.success("Document saved to project successfully!");
      if (data?.data?._id) {
        setCurrentDocId(data.data._id);
      }
      setIsEditingDoc(false);
    },
    onError: () => {
      toast.error("Failed to save document");
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
      <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] w-full mx-auto px-4 text-center rounded-3xl overflow-hidden border border-white/5 bg-background shadow-2xl">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-3xl">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-1000" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 border border-white/10 mb-8 backdrop-blur-md hover:bg-surface transition-colors cursor-default shadow-lg">
            <Rocket className="w-4 h-4 text-primary animate-bounce" />
            <span className="text-sm font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 uppercase">ProductPilot AI Engine</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight text-white drop-shadow-sm">
            What are we <br className="md:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-primary to-emerald-400 animate-gradient-x">building</span> today?
          </h1>
          
          <p className="text-text-muted text-lg md:text-xl mb-12 max-w-2xl font-light">
            Skip the tedious planning phase. Describe your vision in plain English, and watch our AI instantly architect your entire project from scratch.
          </p>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (ideaInput.trim()) generateProjectMutation.mutate(ideaInput);
            }}
            className="w-full relative group max-w-3xl"
          >
            {/* Glowing background effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-primary to-emerald-400 rounded-2xl blur-md opacity-25 group-hover:opacity-50 transition duration-500 group-hover:duration-200" />
            
            <div className="relative flex items-center bg-surface border border-white/10 rounded-2xl p-2 shadow-2xl focus-within:border-primary/50 focus-within:bg-surface-hover transition-all">
              <input 
                type="text"
                value={ideaInput}
                onChange={(e) => setIdeaInput(e.target.value)}
                disabled={generateProjectMutation.isPending}
                placeholder="e.g. I want to build an Uber for dog walking in my city..."
                className="flex-1 bg-transparent border-none outline-none px-6 py-4 text-lg text-white placeholder:text-gray-500 disabled:opacity-50 font-medium"
              />
              <Button 
                type="submit" 
                size="lg" 
                disabled={!ideaInput.trim() || generateProjectMutation.isPending}
                className="rounded-xl px-8 py-6 font-bold text-md shadow-lg flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
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

          {/* Suggestion Chips */}
          <div className="mt-10 flex flex-wrap justify-center gap-3 max-w-3xl">
            <button 
              type="button"
              onClick={() => setIdeaInput("A social media app for plant lovers to trade cuttings")} 
              className="px-5 py-2.5 rounded-full border border-white/5 bg-surface/30 hover:bg-surface hover:border-emerald-500/30 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] text-sm text-text-muted hover:text-white transition-all flex items-center gap-2"
            >
              <Leaf className="w-4 h-4 text-emerald-400" /> Plant Trading App
            </button>
            <button 
              type="button"
              onClick={() => setIdeaInput("An AI tool that summarizes long YouTube videos into blog posts")} 
              className="px-5 py-2.5 rounded-full border border-white/5 bg-surface/30 hover:bg-surface hover:border-red-500/30 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] text-sm text-text-muted hover:text-white transition-all flex items-center gap-2"
            >
              <Video className="w-4 h-4 text-red-400" /> YouTube Summarizer
            </button>
            <button 
              type="button"
              onClick={() => setIdeaInput("A marketplace connecting local private chefs with people hosting dinner parties")} 
              className="px-5 py-2.5 rounded-full border border-white/5 bg-surface/30 hover:bg-surface hover:border-orange-500/30 hover:shadow-[0_0_15px_rgba(249,115,22,0.15)] text-sm text-text-muted hover:text-white transition-all flex items-center gap-2"
            >
              <ChefHat className="w-4 h-4 text-orange-400" /> Private Chef Marketplace
            </button>
          </div>

          {generateProjectMutation.isPending && (
            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-75" />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-150" />
              </div>
              <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400 animate-pulse">
                Structuring database schema, categorizing industry, estimating budget...
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      {/* Active Project Header */}
      {project && (
        <div className="mb-6 flex items-center justify-between bg-surface border border-border p-4 rounded-[16px] shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs text-text-muted font-bold uppercase tracking-wider mb-0.5">Active Project Workspace</p>
              <h2 className="text-xl font-extrabold text-foreground">{project.title}</h2>
            </div>
          </div>
          <Link href={`/dashboard/projects/${projectId}`}>
             <Button variant="outline" size="sm" className="hidden sm:flex">
               View Project Details
               <ArrowRight className="w-4 h-4 ml-2" />
             </Button>
          </Link>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
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

        <div className="flex-1 overflow-y-auto p-8 bg-background relative group">
          {generatedDoc ? (
            <div className="max-w-4xl mx-auto">
              <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-2">
                    {docType}
                  </span>
                  {isEditingDoc ? (
                    <Input 
                      value={docTitle} 
                      onChange={e => setDocTitle(e.target.value)} 
                      className="text-xl font-bold max-w-sm"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold">{docTitle}</h1>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsEditingDoc(!isEditingDoc)}
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    {isEditingDoc ? 'Preview' : 'Edit'}
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => saveDocMutation.mutate()}
                    disabled={saveDocMutation.isPending || !generatedDoc.trim()}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saveDocMutation.isPending ? 'Saving...' : 'Save to Project'}
                  </Button>
                </div>
              </div>
              
              {isEditingDoc ? (
                <textarea 
                  value={generatedDoc}
                  onChange={e => setGeneratedDoc(e.target.value)}
                  className="w-full min-h-[60vh] bg-surface border border-border rounded-xl p-6 text-foreground font-mono text-sm leading-relaxed outline-none focus:border-primary resize-y"
                />
              ) : (
                <article className="prose prose-invert prose-blue max-w-none prose-pre:bg-surface prose-pre:border-border">
                  <ReactMarkdown>{generatedDoc}</ReactMarkdown>
                </article>
              )}
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
    </div>
  );
}
