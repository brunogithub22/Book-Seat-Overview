'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/ui/toggletheme';

const NAV_LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/#deployment', label: 'Cloud or on-premise' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/faq', label: 'FAQ' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-surface-inverted border-b border-accent/40 font-body">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-20 items-center justify-between gap-6">

          {/* Logo / wordmark */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-accent text-ink transition-transform duration-300 group-hover:-rotate-6">
              <BookOpen size={18} strokeWidth={2.25} />
            </span>
            <span className="text-2xl tracking-tight text-cream font-display">
              Book&Seat
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-[15px] transition-colors duration-200 ${
                    active ? 'text-cream' : 'text-cream-muted hover:text-cream'
                  }`}
                >
                  {link.label}
                  {/* Active hanging bookmark ribbon */}
                  {active && (
                    <span className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2">
                      <span className="block w-3 h-4 bg-accent bookmark-ribbon" />
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/auth"
              className="text-sm text-cream-muted hover:text-cream transition-colors"
            >
              Sing in/up
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="lg:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-sm text-cream"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="lg:hidden border-t border-accent/40 bg-surface-inverted px-5 pb-6 pt-2">
          <nav className="flex flex-col">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between border-b border-border-inverted py-3.5 text-[15px] ${
                    active ? 'text-accent' : 'text-cream-muted'
                  }`}
                >
                  {link.label}
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                </Link>
              );
            })}
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="mt-4 py-3 text-center text-sm text-cream-muted"
            >
              Client login
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-1 flex items-center justify-center gap-2 rounded-sm bg-accent py-3 text-sm font-medium text-ink hover:bg-accent-hover transition-colors"
            >
              Request a demo
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}