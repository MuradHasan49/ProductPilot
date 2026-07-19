import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';
import { authClient } from '@/lib/auth-client';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If the token is invalid or expired, the backend throws 401
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      
      // If we are not already on the login page, clear cookie and redirect
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        try {
          // Clear Better Auth session to prevent middleware loops
          await authClient.signOut();
        } catch (e) {
          console.error('Failed to clear Better Auth session');
        }
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
