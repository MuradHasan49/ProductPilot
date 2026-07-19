"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';
import { signIn } from '@/lib/auth-client';
import { Sparkles } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setError(null);
      const { data: authData, error: authError } = await signIn.email({
        email: data.email,
        password: data.password,
      });
      
      if (authError) {
        setError(authError.message || 'Failed to login');
        return;
      }
      
      if (authData?.user) {
        setUser({
            _id: authData.user.id,
            name: authData.user.name,
            email: authData.user.email,
            role: "user",
            avatar: authData.user.image,
        });
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError('Failed to login');
    }
  };

  const handleDemoLogin = () => {
    setValue('email', 'mhs@gmail.com');
    setValue('password', 'Aa123456');
    
    // Slight delay to let user see the auto-filled credentials before submitting
    setTimeout(() => {
      handleSubmit(onSubmit)();
    }, 600);
  };

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-md p-8 bg-surface/80 backdrop-blur-xl rounded-[24px] border border-white/10 shadow-2xl relative">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="w-24 h-24 bg-surface border border-white/10 rounded-full flex items-center justify-center shadow-2xl">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
        </div>

        <div className="text-center mt-10 mb-8">
          <h1 className="text-3xl font-extrabold mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-gray-400">Log in to ProductPilot AI</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 text-error text-sm rounded-xl font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="name@company.com"
            {...register('email')}
            error={errors.email?.message}
          />
          
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register('password')}
            error={errors.password?.message}
          />

          <Button type="submit" className="w-full mt-6 rounded-xl py-6 font-semibold" isLoading={isSubmitting}>
            Sign In
          </Button>
          
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={isSubmitting}
            className="w-full mt-3 py-3 px-4 rounded-xl border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Quick Demo Login
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase font-bold tracking-wider">
            <span className="bg-[#15171e] px-4 text-gray-500">Or continue with</span>
          </div>
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-border rounded-[10px] bg-white/5 hover:bg-white/10 text-sm font-medium text-foreground transition-colors"
          onClick={async () => {
            try {
              const res = await signIn.social({
                provider: "google",
                callbackURL: window.location.origin + "/dashboard"
              });
              if (res.error) {
                alert("Better Auth Error: " + res.error.message);
              }
            } catch (err: any) {
              alert("Exception: " + err.message);
            }
          }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign in with Google
        </button>

        <p className="mt-8 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link href="/register" className="text-primary font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
