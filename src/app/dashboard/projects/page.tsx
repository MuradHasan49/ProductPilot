"use client";
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { Plus, Search, FolderKanban, MoreVertical, Calendar } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  category: string;
  status: string;
  visibility: string;
  createdAt: string;
}

export default function ManageProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, error } = useQuery({
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

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Projects</h1>
          <p className="text-text-muted">Manage your product ideas and workspaces.</p>
        </div>
        <Link href="/dashboard/projects/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </Link>
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
            <Card key={project._id} className="hover:border-primary/50 transition-colors group flex flex-col">
              <CardHeader className="pb-3 flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    <Link href={`/dashboard/projects/${project._id}`}>
                      {project.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Badge variant="default">{project.category}</Badge>
                    <Badge variant={project.visibility === 'public' ? 'success' : 'default'}>
                      {project.visibility}
                    </Badge>
                  </CardDescription>
                </div>
                <button className="text-text-muted hover:text-foreground">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="flex items-center gap-2 text-sm text-text-muted mt-4">
                  <Calendar className="w-4 h-4" />
                  <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
