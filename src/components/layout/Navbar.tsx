"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import UserDropdown from './UserDropdown';
import Image from 'next/image';
import { Menu, X, Home, Compass, Tag, Info, Mail, LayoutDashboard, Sparkles, PlusCircle } from 'lucide-react';

export default function Navbar() {
  const { isAuthenticated } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const loggedOutRoutes = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Ideas', href: '/explore', icon: Compass },
    { name: 'Pricing', href: '/pricing', icon: Tag },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  const loggedInRoutes = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Ideas', href: '/explore', icon: Compass },
    { name: 'Pricing', href: '/pricing', icon: Tag },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Mail },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'AI', href: '/dashboard/ai', icon: Sparkles },
    { name: 'New Idea', href: '/dashboard/projects', icon: PlusCircle },
  ];

  const routes = isAuthenticated ? loggedInRoutes : loggedOutRoutes;

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <Image 
            src="/logo.png" 
            alt="ProductPilot Logo" 
            width={32} 
            height={32} 
            className="group-hover:scale-110 transition-transform duration-300"
          />
          <span className="text-2xl font-bold tracking-tighter text-gradient">
            ProductPilot
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-4 xl:gap-6 items-center flex-1 justify-end mr-4 xl:mr-6">
          {routes.map((route) => {
            const isActive = pathname === route.href || (route.href !== '/' && route.href !== '/dashboard' && pathname.startsWith(route.href));
            return (
              <Link 
                key={route.name} 
                href={route.href} 
                className={`flex items-center text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive ? 'text-primary' : 'text-text-muted hover:text-primary'
                }`}
              >
                <route.icon className="w-4 h-4 mr-1.5" />
                {route.name}
              </Link>
            )
          })}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="ml-2">
              <UserDropdown />
            </div>
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

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-text-muted hover:text-foreground transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-surface shadow-2xl absolute w-full left-0 top-16 flex flex-col p-4 gap-4 animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-4">
            {routes.map((route) => {
              const isActive = pathname === route.href || (route.href !== '/' && route.href !== '/dashboard' && pathname.startsWith(route.href));
              return (
                <Link 
                  key={route.name} 
                  href={route.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center text-sm font-medium p-2 rounded-lg transition-colors ${
                    isActive ? 'bg-primary/10 text-primary' : 'text-text-muted hover:bg-surface-hover hover:text-foreground'
                  }`}
                >
                  <route.icon className="w-5 h-5 mr-3" />
                  {route.name}
                </Link>
              )
            })}
          </nav>
          <div className="border-t border-border pt-4 flex flex-col gap-3">
            {isAuthenticated ? (
              <div className="flex items-center justify-between px-2">
                <span className="text-sm font-medium text-text-muted">Account</span>
                <UserDropdown />
              </div>
            ) : (
              <>
                <Link 
                  href="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-medium text-foreground border border-border rounded-xl hover:bg-surface-hover transition-colors"
                >
                  Log in
                </Link>
                <Link 
                  href="/register" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-medium bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
