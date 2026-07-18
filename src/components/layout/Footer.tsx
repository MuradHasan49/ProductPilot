import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-surface mt-auto py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 group">
            <Image 
              src="/logo.png" 
              alt="ProductPilot Logo" 
              width={24} 
              height={24} 
              className="group-hover:scale-110 transition-transform duration-300 opacity-80"
            />
            <span className="text-2xl font-bold tracking-tighter text-gradient">
              ProductPilot
            </span>
          </Link>
          <p className="mt-4 text-text-muted text-sm max-w-sm">
            Plan Smarter. Build Faster. Powered by AI.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-foreground mb-4">Product</h3>
          <ul className="space-y-2 text-sm text-text-muted">
            <li><Link href="/explore" className="hover:text-primary transition-colors">Explore Startups</Link></li>
            <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
            <li><Link href="/features" className="hover:text-primary transition-colors">AI Features</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-foreground mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-text-muted">
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-border text-center text-sm text-text-muted">
        &copy; {new Date().getFullYear()} ProductPilot AI. All rights reserved.
      </div>
    </footer>
  );
}
