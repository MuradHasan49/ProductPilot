"use client";

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Hide Navbar on dashboard and auth routes if desired
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }
  
  return <Navbar />;
}

export function ConditionalFooter() {
  const pathname = usePathname();
  
  // Hide Footer on dashboard routes
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }
  
  return <Footer />;
}
