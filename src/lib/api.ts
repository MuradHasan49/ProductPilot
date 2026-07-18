import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

export const api = axios.create({
  baseURL: 'http://localhost:8000/api',
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
          // Call the backend logout to clear the httpOnly cookie so Next.js middleware doesn't loop
          await axios.post('http://localhost:8000/api/auth/logout', {}, { withCredentials: true });
        } catch (e) {
          console.error('Failed to clear cookie');
        }
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
