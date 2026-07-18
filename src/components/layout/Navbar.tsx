"use client";
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      logout();
      router.push('/');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-gradient">
          LaunchPilot
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/explore" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">
            Explore Ideas
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="text-sm font-medium bg-surface text-foreground border border-border px-4 py-2 rounded-xl hover:bg-surface-hover transition-colors">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Log in
              </Link>
              <Link href="/register" className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
