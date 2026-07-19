"use client";
import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Save, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function SettingsPage() {
  const { user, setUser } = useAuthStore();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  useEffect(() => {
    if (user?.name) setName(user.name);
    if (user?.avatar) setAvatar(user.avatar);
  }, [user]);

  const updateProfileMutation = useMutation({
    mutationFn: async (data: { name: string; avatar: string }) => {
      const res = await api.put('/users/profile', data);
      return res.data.data;
    },
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      toast.success('Profile updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || error.message || 'Failed to update profile');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    updateProfileMutation.mutate({ name, avatar });
  };

  const handleChangePicture = () => {
    setIsEditingAvatar(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out max-w-4xl mx-auto py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Edit Profile</h1>
        <p className="text-gray-400 mt-1">Update your personal information and profile picture.</p>
      </div>

      <div className="bg-[#1e2330]/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-xl overflow-hidden uppercase border-[4px] border-[#1e2330]">
              {avatar ? (
                <img src={avatar} alt={name} className="w-full h-full object-cover" />
              ) : (
                name ? name.substring(0, 2) : user?.name?.substring(0, 2) || <User className="w-12 h-12" />
              )}
            </div>
            <div>
              <h3 className="text-white font-medium text-lg">Profile Picture</h3>
              <p className="text-sm text-gray-400 mt-1 mb-5">JPG, GIF or PNG. Max size of 5MB.</p>
              
              <div className="flex flex-col gap-3">
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    type="button" 
                    onClick={handleChangePicture}
                    className="bg-transparent hover:bg-white/5 border-white/10"
                  >
                    Change Picture
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    type="button" 
                    onClick={() => {
                      setAvatar('');
                      setIsEditingAvatar(false);
                    }}
                    className="text-orange-500 hover:text-orange-600 hover:bg-orange-500/10"
                  >
                    Remove
                  </Button>
                </div>
                
                {isEditingAvatar && (
                  <div className="flex items-center gap-2 mt-2 animate-in fade-in slide-in-from-top-2">
                    <Input 
                      type="url"
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      placeholder="Paste image URL here..."
                      className="bg-black/40 h-9 text-sm w-full max-w-xs"
                      autoFocus
                    />
                    <Button 
                      type="button" 
                      size="sm" 
                      onClick={() => setIsEditingAvatar(false)}
                      className="bg-white/10 hover:bg-white/20 text-white h-9"
                    >
                      Done
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">Full Name</label>
              <Input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-black/40 h-12 text-lg"
                required
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">Email Address</label>
              <Input 
                type="email" 
                value={user?.email || ''}
                className="w-full bg-black/40 h-12 text-lg text-gray-500 cursor-not-allowed border-white/5"
                disabled
              />
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-white/5">
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 text-md rounded-xl"
              disabled={updateProfileMutation.isPending || !name.trim()}
            >
              <Save className="w-5 h-5 mr-2" />
              {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
