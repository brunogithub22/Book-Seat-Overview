"use client"
import Link from 'next/link';
import { BookOpen, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
 
export function MainFooter() {
  return (
    <footer className="bg-surface-inverted border-t border-accent/20 text-cream-muted font-body">
      {/* Top Newsletter Section */}
      <div className="border-b border-border-inverted">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl text-cream font-display">
              Stay updated on school library software.
            </h3>
            <p className="mt-2 text-sm leading-relaxed max-w-md text-cream-muted">
              Get monthly updates on digital cataloging, compliance, and product updates. No spam.
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 max-w-md md:ml-auto w-full">
            <input
              type="email"
              placeholder="Enter school email..."
              className="w-full rounded-sm bg-surface/5 border border-cream/15 px-4 py-2.5 text-sm text-cream placeholder:text-cream-muted/50 focus:outline-none focus:border-accent transition-colors"
              required
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 shrink-0 rounded-sm bg-accent px-5 py-2.5 text-sm font-medium text-ink hover:bg-accent-hover transition-colors"
            >
              Subscribe
              <ArrowRight size={15} />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-accent text-ink transition-transform duration-300 group-hover:-rotate-6">
                <BookOpen size={16} strokeWidth={2.25} />
              </span>
              <span className="text-2xl tracking-tight text-cream font-display">
                Book&Seat
              </span>
            </Link>
            
            <p className="mt-4 text-sm leading-relaxed max-w-sm text-cream-muted">
              The modern library management system built specifically for primary and secondary schools. Cloud hosted or on-premise.
            </p>

            <div className="mt-6 flex items-center gap-3 text-xs text-cream-muted/80">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-accent">
                <ShieldCheck size={14} />
                GDPR Compliant
              </span>
              <span>•</span>
              <span>EU Hosted Infrastructure</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.14em] text-accent font-semibold mb-4">
              Product
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/#features" className="hover:text-cream transition-colors">Features</Link></li>
              <li><Link href="/#deployment" className="hover:text-cream transition-colors">Cloud & On-premise</Link></li>
              <li><Link href="/pricing" className="hover:text-cream transition-colors">Pricing Plans</Link></li>
              <li><Link href="/faq" className="hover:text-cream transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.14em] text-accent font-semibold mb-4">
              Solutions
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/solutions/librarians" className="hover:text-cream transition-colors">For Librarians</Link></li>
              <li><Link href="/solutions/principals" className="hover:text-cream transition-colors">For Principals</Link></li>
              <li><Link href="/solutions/students" className="hover:text-cream transition-colors">For Students</Link></li>
              <li><Link href="/contact" className="hover:text-cream transition-colors">Request Demo</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.14em] text-accent font-semibold mb-4">
              Legal & Access
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/login" className="hover:text-cream transition-colors">Client Login</Link></li>
              <li><Link href="/privacy" className="hover:text-cream transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-cream transition-colors">Terms of Service</Link></li>
              <li><Link href="/gdpr" className="hover:text-cream transition-colors">Data Protection</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-border-inverted flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-muted/70">
          <p>© {new Date().getFullYear()} Book&Seat. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={12} className="text-accent fill-accent" /> for better school libraries.
          </p>
        </div>
      </div>
    </footer>
  );
}


export function CompactFooter() {
  return (
    <footer className="bg-surface border-t border-border text-ink-muted text-xs font-body">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-accent text-ink">
              <BookOpen size={13} strokeWidth={2.25} />
            </span>
            <span className="text-base tracking-tight text-ink font-medium font-display">
              Book&Seat
            </span>
          </Link>
          <span className="text-border">|</span>
          <p>© {new Date().getFullYear()} Book&Seat</p>
        </div>

        <nav className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-ink transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-ink transition-colors">
            Terms
          </Link>
          <Link href="/support" className="hover:text-ink transition-colors">
            Support
          </Link>
          <a
            href="https://status.Book&Seat.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-ink transition-colors"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
            System Status
          </a>
        </nav>

      </div>
    </footer>
  );
}