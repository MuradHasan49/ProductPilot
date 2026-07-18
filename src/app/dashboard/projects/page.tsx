"use client";
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { Plus, Search, FolderKanban, MoreVertical, Calendar, Sparkles, X, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Project {
  _id: string;
  title: string;
  category: string;
  status: string;
  visibility: string;
  createdAt: string;
}

export default function ManageProjectsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isBulkClassifying, setIsBulkClassifying] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editForm, setEditForm] = useState({ title: '', category: '', visibility: 'private' });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await api.get('/projects');
      return res.data.data as Project[];
    }
  });

  const filteredProjects = data?.filter((p) => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleBulkClassify = async () => {
    try {
      setIsBulkClassifying(true);
      const res = await api.post('/ai/bulk-classify');
      toast.success(res.data.message);
      refetch();
    } catch (err: any) {
      toast.error('Failed to bulk classify projects.');
    } finally {
      setIsBulkClassifying(false);
    }
  };

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.patch(`/projects/${editingProject?._id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setEditingProject(null);
      toast.success("Project updated successfully");
    },
    onError: () => {
      toast.error("Failed to update project");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setEditingProject(null);
      toast.success("Project deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete project");
    }
  });

  const handleEditClick = (e: any, project: Project) => {
    e.stopPropagation();
    setEditingProject(project);
    setEditForm({ title: project.title, category: project.category, visibility: project.visibility });
  };

  const getCategoryGradient = (category: string) => {
    switch (category.toLowerCase()) {
      case 'saas': return 'from-blue-500/10 to-cyan-500/5';
      case 'ai tool': return 'from-purple-500/10 to-pink-500/5';
      case 'marketplace': return 'from-emerald-500/10 to-teal-500/5';
      case 'mobile app': return 'from-orange-500/10 to-yellow-500/5';
      case 'web app': return 'from-indigo-500/10 to-blue-500/5';
      default: return 'from-gray-500/10 to-slate-500/5';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Projects</h1>
          <p className="text-text-muted">Manage your product ideas and workspaces.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={handleBulkClassify}
            disabled={isBulkClassifying}
            className="border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10"
          >
            <Sparkles className={`w-4 h-4 mr-2 ${isBulkClassifying ? 'animate-spin' : ''}`} />
            {isBulkClassifying ? 'Classifying...' : 'Bulk Auto-Classify'}
          </Button>
          <Link href="/dashboard/projects/add">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-surface p-4 border border-border rounded-[16px]">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input 
            placeholder="Search projects..." 
            className="pl-9 h-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-48 flex flex-col justify-between p-6">
              <div>
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <Skeleton className="h-8 w-full mt-6" />
            </Card>
          ))}
        </div>
      ) : error ? (
        <div className="p-8 text-center bg-error/10 border border-error/20 rounded-[16px] text-error">
          Failed to load projects. Please try again.
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-[16px]">
          <div className="w-16 h-16 bg-surface border border-border rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderKanban className="w-8 h-8 text-text-muted" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No projects found</h3>
          <p className="text-text-muted mb-6">Get started by creating your first product workspace.</p>
          <Link href="/dashboard/projects/add">
            <Button variant="outline">Create Project</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card 
              key={project._id} 
              className={`hover:border-primary/50 cursor-pointer transition-all duration-300 group flex flex-col relative overflow-hidden bg-gradient-to-br ${getCategoryGradient(project.category)}`}
              onClick={() => router.push(`/dashboard/projects/${project._id}`)}
            >
              <CardHeader className="pb-3 flex flex-row items-start justify-between relative z-10">
                <div>
                  <CardTitle className="mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Badge variant="default">{project.category}</Badge>
                    <Badge variant={project.visibility === 'public' ? 'success' : 'default'}>
                      {project.visibility}
                    </Badge>
                  </CardDescription>
                </div>
                <button 
                  className="text-text-muted hover:text-foreground relative z-10 p-1 rounded-full hover:bg-white/5 transition-colors"
                  onClick={(e) => handleEditClick(e, project)}
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
              </CardHeader>
              <CardContent className="mt-auto relative z-10">
                <div className="flex items-center gap-2 text-sm text-text-muted mt-4">
                  <Calendar className="w-4 h-4" />
                  <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface border border-border p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Edit Project</h2>
              <button onClick={() => setEditingProject(null)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5"/>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-1.5 block">Project Title</label>
                <Input 
                  value={editForm.title} 
                  onChange={e => setEditForm({...editForm, title: e.target.value})} 
                  placeholder="e.g. NextGen AI Tool"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-1.5 block">Category</label>
                <select 
                  value={editForm.category}
                  onChange={e => setEditForm({...editForm, category: e.target.value})}
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 outline-none focus:border-primary text-sm"
                >
                  <option value="SaaS">SaaS</option>
                  <option value="AI Tool">AI Tool</option>
                  <option value="Marketplace">Marketplace</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Web App">Web App</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-1.5 block">Visibility</label>
                <select 
                  value={editForm.visibility}
                  onChange={e => setEditForm({...editForm, visibility: e.target.value})}
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 outline-none focus:border-primary text-sm"
                >
                  <option value="private">Private (Only you)</option>
                  <option value="public">Public (Visible in Explore)</option>
                </select>
              </div>
              <div className="flex items-center justify-between mt-8 pt-4 border-t border-border">
                <Button 
                  variant="outline" 
                  className="text-red-400 border-red-500/20 hover:bg-red-500/10 hover:border-red-500/30"
                  onClick={(e) => {
                    e.preventDefault();
                    if(confirm('Are you sure you want to delete this project? This cannot be undone.')) {
                      deleteMutation.mutate(editingProject._id);
                    }
                  }}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                </Button>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setEditingProject(null)}>Cancel</Button>
                  <Button onClick={() => updateMutation.mutate(editForm)} disabled={updateMutation.isPending || !editForm.title.trim()}>
                    {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
