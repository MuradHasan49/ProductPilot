"use client";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Edit, Sparkles, BrainCircuit, FileText, ListTodo, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function ProjectDetailsPage() {
  const params = useParams();
  const projectId = params.id;
  const queryClient = useQueryClient();

  const deleteDocMutation = useMutation({
    mutationFn: async (docId: string) => {
      await api.delete(`/projects/${projectId}/documents/${docId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents', projectId] });
      toast.success("Document deleted successfully");
    },
    onError: () => {
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
        <Button variant="outline" size="sm">
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
                          onClick={() => {
                            if(confirm('Are you sure you want to delete this document?')) {
                              deleteDocMutation.mutate(doc._id);
                            }
                          }}
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
                          onClick={() => {
                            if(confirm('Are you sure you want to delete this document?')) {
                              deleteDocMutation.mutate(doc._id);
                            }
                          }}
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
    </div>
  );
}
