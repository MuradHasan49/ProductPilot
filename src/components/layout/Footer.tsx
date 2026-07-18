import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Terminal, Briefcase, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-surface mt-auto pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand & Description */}
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 group mb-6">
            <Image 
              src="/logo.png" 
              alt="ProductPilot Logo" 
              width={28} 
              height={28} 
              className="group-hover:scale-110 transition-transform duration-300 opacity-90"
            />
            <span className="text-2xl font-bold tracking-tighter text-gradient">
              ProductPilot
            </span>
          </Link>
          <p className="text-text-muted text-sm max-w-sm leading-relaxed mb-8">
            Plan Smarter. Build Faster. Powered by AI. We help founders and product managers transform raw ideas into development-ready agile projects in seconds.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-400/10 transition-all">
              <MessageCircle className="w-4 h-4" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all">
              <Terminal className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-600/50 hover:bg-blue-600/10 transition-all">
              <Briefcase className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-6">Quick Links</h3>
          <ul className="space-y-4 text-sm text-text-muted">
            <li><Link href="/" className="hover:text-primary transition-colors flex items-center gap-2">Home</Link></li>
            <li><Link href="/explore" className="hover:text-primary transition-colors flex items-center gap-2">Explore Ideas</Link></li>
            <li><Link href="/pricing" className="hover:text-primary transition-colors flex items-center gap-2">Pricing</Link></li>
            <li><Link href="/#features" className="hover:text-primary transition-colors flex items-center gap-2">Features</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors flex items-center gap-2">About Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-white mb-6">Contact Us</h3>
          <ul className="space-y-4 text-sm text-text-muted">
            <li>
              <a href="mailto:hello@productpilot.ai" className="hover:text-primary transition-colors flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                <span>hello@productpilot.ai</span>
              </a>
            </li>
            <li>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>123 Innovation Drive<br/>San Francisco, CA 94105</span>
              </div>
            </li>
            <li className="pt-2">
              <Link href="/contact" className="text-primary font-medium hover:underline">
                Open Contact Form &rarr;
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} ProductPilot AI. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Designed with <span className="text-red-500">&hearts;</span> for builders.
        </p>
      </div>
    </footer>
  );
}
