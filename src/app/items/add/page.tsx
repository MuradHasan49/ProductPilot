"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { Package, Image as ImageIcon, DollarSign, AlignLeft, Type, Sparkles } from 'lucide-react';

const itemSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  tagline: z.string().min(10, 'Short description must be at least 10 characters'),
  description: z.string().min(20, 'Full description must be at least 20 characters'),
  category: z.string().min(1, 'Category is required').default('Other'),
  industry: z.string().optional(),
  tags: z.string().optional(),
  budget: z.number().min(0, 'Price must be a positive number').optional(),
  coverImage: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

type ItemFormValues = z.infer<typeof itemSchema>;

export default function AddItemPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isAutoTagging, setIsAutoTagging] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
  });

  const handleAutoTag = async () => {
    const title = getValues('title');
    const description = getValues('description');
    
    if (!title || !description || title.length < 5 || description.length < 10) {
      setError('Please enter a Title and Full Description first before auto-tagging.');
      return;
    }
    
    try {
      setIsAutoTagging(true);
      setError(null);
      const res = await api.post('/ai/classify', { title, description });
      const { category, industry, tags } = res.data.data;
      
      if (category) setValue('category', category, { shouldValidate: true });
      if (industry) setValue('industry', industry, { shouldValidate: true });
      if (tags && Array.isArray(tags)) setValue('tags', tags.join(', '), { shouldValidate: true });
    } catch (err: any) {
      setError('Failed to auto-tag with AI. Please try again.');
    } finally {
      setIsAutoTagging(false);
    }
  };

  const onSubmit = async (data: ItemFormValues) => {
    try {
      setError(null);
      // We map the requested fields to our existing Project model in the backend
      const res = await api.post('/projects', {
        title: data.title,
        tagline: data.tagline,
        description: data.description,
        budget: data.budget,
        coverImage: data.coverImage,
        category: data.category,
        industry: data.industry,
        tags: data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        visibility: 'public'
      });
      
      router.push(`/explore/${res.data.data._id}`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add item');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          
          <div className="mb-8 flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Add Item</h1>
              <p className="text-gray-400">List a new item or project publicly.</p>
            </div>
          </div>

          <div className="bg-surface/80 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 md:p-8 shadow-2xl">
            {error && (
              <div className="mb-6 p-4 bg-error/10 border border-error/20 text-error text-sm rounded-xl font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Type className="w-4 h-4 text-primary" /> Title
                </label>
                <Input
                  placeholder="e.g. Next.js SaaS Boilerplate"
                  {...register('title')}
                  error={errors.title?.message}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" /> Short description
                </label>
                <Input
                  placeholder="A quick 1-sentence summary"
                  {...register('tagline')}
                  error={errors.tagline?.message}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <AlignLeft className="w-4 h-4 text-blue-400" /> Full description
                </label>
                <textarea
                  placeholder="Describe your item in detail..."
                  className={`w-full min-h-[150px] p-4 bg-black/20 border rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                    errors.description ? 'border-error' : 'border-white/10 focus:border-primary'
                  }`}
                  {...register('description')}
                />
                {errors.description && (
                  <p className="text-sm text-error mt-1">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" /> Price
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g. 199"
                    {...register('budget', { valueAsNumber: true })}
                    error={errors.budget?.message}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-pink-400" /> Optional image URL
                  </label>
                  <Input
                    placeholder="https://example.com/image.png"
                    {...register('coverImage')}
                    error={errors.coverImage?.message}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                <Button 
                  type="button" 
                  onClick={handleAutoTag}
                  disabled={isAutoTagging || isSubmitting}
                  className="w-full md:w-auto px-6 py-3 rounded-xl font-semibold bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 border border-indigo-500/30"
                >
                  <Sparkles className={`w-4 h-4 mr-2 ${isAutoTagging ? 'animate-spin' : ''}`} />
                  {isAutoTagging ? 'Analyzing...' : '✨ Auto-Tag with AI'}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Category</label>
                  <Input placeholder="e.g. SaaS" {...register('category')} error={errors.category?.message} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Industry</label>
                  <Input placeholder="e.g. Finance" {...register('industry')} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Tags (comma separated)</label>
                  <Input placeholder="react, Next.js, AI" {...register('tags')} />
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <Button type="submit" className="w-full md:w-auto px-8 py-3 rounded-xl font-semibold" isLoading={isSubmitting}>
                  Submit (add)
                </Button>
              </div>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
