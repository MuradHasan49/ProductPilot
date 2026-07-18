"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { ArrowLeft, Rocket } from 'lucide-react';
import Link from 'next/link';

const projectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title is too long'),
  tagline: z.string().max(200, 'Tagline is too long').optional(),
  category: z.string().min(2, 'Category is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  industry: z.string().optional(),
  visibility: z.enum(['private', 'public']).default('private'),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function CreateProjectPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      visibility: 'private',
    },
  });

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      setError(null);
      const res = await api.post('/projects', data);
      if (res.data.success) {
        router.push(`/dashboard/projects/${res.data.data._id}`);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create project');
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <Link href="/dashboard/projects" className="inline-flex items-center text-sm text-text-muted hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Projects
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Create New Project</h1>
        <p className="text-text-muted">Define the core parameters of your product before generating documentation.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>Fill out the basic information about your product idea.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 text-error text-sm rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Project Title"
                placeholder="e.g. NextGen E-commerce"
                required
                {...register('title')}
                error={errors.title?.message}
              />
              <Input
                label="Category"
                placeholder="e.g. SaaS, Marketplace, AI Tool"
                required
                {...register('category')}
                error={errors.category?.message}
              />
            </div>

            <Input
              label="Tagline (Optional)"
              placeholder="e.g. The fastest way to build online stores"
              {...register('tagline')}
              error={errors.tagline?.message}
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Description <span className="text-error ml-1">*</span>
              </label>
              <textarea
                className={`flex w-full rounded-[10px] border ${
                  errors.description ? 'border-error focus:ring-error' : 'border-border focus:ring-primary'
                } bg-surface px-3 py-2 text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background transition-colors min-h-[120px] resize-y`}
                placeholder="Describe your product idea, core problem it solves, and its main value proposition..."
                {...register('description')}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-error">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Industry (Optional)"
                placeholder="e.g. Healthcare, Finance"
                {...register('industry')}
                error={errors.industry?.message}
              />
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Visibility
                </label>
                <select
                  className="flex h-10 w-full rounded-[10px] border border-border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-colors"
                  {...register('visibility')}
                >
                  <option value="private">Private (Only you)</option>
                  <option value="public">Public (Visible on Explore page)</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-border flex justify-end gap-4">
              <Link href="/dashboard/projects">
                <Button type="button" variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" isLoading={isSubmitting}>
                <Rocket className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
