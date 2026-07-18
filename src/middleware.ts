import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Better Auth uses different cookie names depending on the environment (secure vs non-secure)
  const token = request.cookies.get('better-auth.session_token')?.value || request.cookies.get('__Secure-better-auth.session_token')?.value;

  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/items');

  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect logged-in users away from auth pages
  const isAuthRoute = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register';
  if (isAuthRoute && token) {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/items/:path*',
    '/login',
    '/register'
  ],
};
