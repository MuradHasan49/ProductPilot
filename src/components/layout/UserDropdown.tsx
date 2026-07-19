"use client";

import { useState, useRef, useEffect } from 'react';
import { LayoutDashboard, User, LogOut, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { api } from '@/lib/api';
import { signOut } from '@/lib/auth-client';

export default function UserDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuthStore();
  const router = useRouter();

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Logout API failed", error);
    } finally {
      logout();
      router.push('/login');
    }
  };

  // Fallback data if user is not fully loaded
  const displayName = user?.name ? user.name.toUpperCase() : "MURAD HASAN";
  const displayRole = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Supporter";
  const initial = displayName.charAt(0);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-white/5 transition-colors focus:outline-none"
      >
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-sm overflow-hidden uppercase">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name || "User"} className="w-full h-full object-cover" />
          ) : (
            user?.name?.substring(0, 2) || <User className="w-4 h-4" />
          )}
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-[#1e2330] shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-white/5 bg-black/20">
            <p className="text-sm font-bold text-white truncate">{displayName}</p>
          </div>

          {/* Menu Links */}
          <div className="p-2 space-y-1">
            <Link 
              href="/dashboard" 
              onClick={() => setIsDropdownOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-gray-400" />
              Dashboard
            </Link>
            
            <Link 
              href="/dashboard/settings" 
              onClick={() => setIsDropdownOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <User className="w-4 h-4 text-gray-400" />
              Edit Profile
            </Link>
          </div>

          {/* Sign out */}
          <div className="p-2 border-t border-white/5">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-orange-500 hover:bg-orange-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
