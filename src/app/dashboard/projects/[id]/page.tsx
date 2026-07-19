"use client";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowLeft, Edit, Sparkles, BrainCircuit, FileText, ListTodo, Trash2, Copy, X } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import { useState } from 'react';

export default function ProjectDetailsPage() {
  const params = useParams();
  const projectId = params.id;
  const router = useRouter();
  const queryClient = useQueryClient();
  const [documentToDelete, setDocumentToDelete] = useState<any>(null);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ title: '', category: '', visibility: 'private' });

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Document copied to clipboard!');
  };

  const deleteDocMutation = useMutation({
    mutationFn: async (docId: string) => {
      await api.delete(`/projects/${projectId}/documents/${docId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents', projectId] });
      setDocumentToDelete(null);
      toast.success("Document deleted successfully");
    },
    onError: () => {
      setDocumentToDelete(null);
      toast.error("Failed to delete document");
    }
  });

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const res = await api.get(`/projects/${projectId}`);
      return res.data.data;
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      await api.patch(`/projects/${projectId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      setIsEditModalOpen(false);
      toast.success("Project updated successfully");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/projects/${projectId}`);
    },
    onSuccess: () => {
      toast.success("Project deleted");
      router.push('/dashboard/projects');
    }
  });

  const { data: documents } = useQuery({
    queryKey: ['documents', projectId],
    queryFn: async () => {
      const res = await api.get(`/projects/${projectId}/documents`);
      return res.data.data;
    },
    enabled: !!projectId
  });

  const prds = documents?.filter((d: any) => d.type === 'PRD') || [];
  const userStories = documents?.filter((d: any) => d.type === 'User Stories') || [];

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="p-8 text-center bg-error/10 border border-error/20 rounded-[16px] text-error max-w-5xl mx-auto">
        Failed to load project details. It may have been deleted.
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <Link href="/dashboard/projects" className="inline-flex items-center text-sm text-text-muted hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            setEditForm({ title: project.title, category: project.category, visibility: project.visibility });
            setIsEditModalOpen(true);
          }}
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Details
        </Button>
      </div>

      <div className="bg-surface border border-border p-8 rounded-[16px]">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight mb-2">{project.title}</h1>
            {project.tagline && (
              <p className="text-lg text-text-muted mb-4">{project.tagline}</p>
            )}
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="default">{project.category}</Badge>
              {project.industry && <Badge variant="info">{project.industry}</Badge>}
              <Badge variant={project.visibility === 'public' ? 'success' : 'warning'}>
                {project.visibility}
              </Badge>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">Description</h3>
              <p className="text-text-muted leading-relaxed whitespace-pre-wrap">{project.description}</p>
            </div>
          </div>

          <div className="md:w-72 space-y-4">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <BrainCircuit className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-bold mb-2">Agentic Workspace</h3>
                <p className="text-sm text-text-muted mb-4">Chat with our AI to automatically generate PRDs and User Stories for this project.</p>
                <Link href={`/dashboard/ai?project=${project._id}`}>
                  <Button className="w-full">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Open AI Agent
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Product Requirements Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            {prds.length > 0 ? (
              <div className="space-y-4">
                {prds.map((doc: any) => (
                  <div key={doc._id} className="p-4 rounded-xl border border-border bg-surface-hover hover:border-primary/50 transition-colors">
                    <h4 className="font-semibold mb-1">{doc.title}</h4>
                    <p className="text-sm text-text-muted mb-3 line-clamp-2">{doc.content.substring(0, 150)}...</p>
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <div className="flex items-center gap-4">
                        <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                        <button 
                          onClick={() => handleCopy(doc.content)}
                          className="text-text-muted hover:text-primary transition-colors flex items-center gap-1"
                          title="Copy Document"
                        >
                          <Copy className="w-3 h-3" />
                          Copy
                        </button>
                        <button 
                          onClick={() => setDocumentToDelete(doc)}
                          className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                          disabled={deleteDocMutation.isPending}
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                      <Link href={`/dashboard/ai?project=${project._id}&docId=${doc._id}`} className="text-primary hover:underline font-medium">Open in Workspace &rarr;</Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-surface rounded-xl border border-dashed border-border">
                <p className="text-text-muted mb-4">No PRD generated yet.</p>
                <Link href={`/dashboard/ai?project=${project._id}`}>
                  <Button variant="outline" size="sm">Generate PRD</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListTodo className="w-5 h-5 text-secondary" />
              User Stories
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userStories.length > 0 ? (
              <div className="space-y-4">
                {userStories.map((doc: any) => (
                  <div key={doc._id} className="p-4 rounded-xl border border-border bg-surface-hover hover:secondary/50 transition-colors">
                    <h4 className="font-semibold mb-1">{doc.title}</h4>
                    <p className="text-sm text-text-muted mb-3 line-clamp-2">{doc.content.substring(0, 150)}...</p>
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <div className="flex items-center gap-4">
                        <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                        <button 
                          onClick={() => handleCopy(doc.content)}
                          className="text-text-muted hover:text-secondary transition-colors flex items-center gap-1"
                          title="Copy Document"
                        >
                          <Copy className="w-3 h-3" />
                          Copy
                        </button>
                        <button 
                          onClick={() => setDocumentToDelete(doc)}
                          className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                          disabled={deleteDocMutation.isPending}
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                      <Link href={`/dashboard/ai?project=${project._id}&docId=${doc._id}`} className="text-secondary hover:underline font-medium">Open in Workspace &rarr;</Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-surface rounded-xl border border-dashed border-border">
                <p className="text-text-muted mb-4">No user stories found.</p>
                <Link href={`/dashboard/ai?project=${project._id}`}>
                  <Button variant="outline" size="sm">Generate Stories</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      {documentToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-surface border border-red-500/20 p-6 rounded-2xl w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 mx-auto">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-center mb-2">Delete Document?</h2>
            <p className="text-text-muted text-center text-sm mb-6">
              Are you sure you want to delete <span className="text-foreground font-medium">"{documentToDelete.title}"</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setDocumentToDelete(null)}
                disabled={deleteDocMutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-red-500 hover:bg-red-600 text-white border-none"
                onClick={() => deleteDocMutation.mutate(documentToDelete._id)}
                disabled={deleteDocMutation.isPending}
              >
                {deleteDocMutation.isPending ? 'Deleting...' : 'Yes, Delete'}
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Edit Project Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-surface border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Edit Project</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Project Title</label>
                <Input 
                  value={editForm.title} 
                  onChange={(e) => setEditForm({...editForm, title: e.target.value})} 
                  placeholder="Project Name" 
                  className="bg-black/20"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Category</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-black/20 px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                  value={editForm.category}
                  onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                >
                  <option className="bg-surface text-white" value="SaaS">SaaS</option>
                  <option className="bg-surface text-white" value="Mobile App">Mobile App</option>
                  <option className="bg-surface text-white" value="Web App">Web App</option>
                  <option className="bg-surface text-white" value="E-commerce">E-commerce</option>
                  <option className="bg-surface text-white" value="FinTech">FinTech</option>
                  <option className="bg-surface text-white" value="HealthTech">HealthTech</option>
                  <option className="bg-surface text-white" value="EdTech">EdTech</option>
                  <option className="bg-surface text-white" value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Visibility</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-black/20 px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                  value={editForm.visibility}
                  onChange={(e) => setEditForm({...editForm, visibility: e.target.value})}
                >
                  <option className="bg-surface text-white" value="private">Private (Only me)</option>
                  <option className="bg-surface text-white" value="public">Public (Visible in Explore)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <Button 
                variant="outline" 
                onClick={() => {
                  if(confirm('Are you sure you want to delete this project? This cannot be undone.')) {
                    deleteMutation.mutate();
                  }
                }}
                disabled={deleteMutation.isPending}
                className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </Button>
              <div className="flex gap-3">
                <Button 
                  variant="ghost" 
                  onClick={() => setIsEditModalOpen(false)}
                  className="hover:bg-white/5 text-gray-300"
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary-hover text-white border-none"
                  onClick={() => updateMutation.mutate(editForm)}
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
