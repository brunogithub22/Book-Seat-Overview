import Link from "next/link";
import { BookOpen } from 'lucide-react';

export function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      {/* Brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between bg-surface-inverted text-cream px-14 py-12 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 28px)",
          }}
        />
        <Link href="/" className="relative flex items-center gap-3">
          <BookOpen/>
          <span className="font-display text-lg tracking-wide">Book&Seat</span>
        </Link>

        <div className="relative max-w-sm">
          <p className="font-display text-3xl leading-snug text-cream">
            &ldquo;Every ledger tells the story of what was built, and who built it.&rdquo;
          </p>
          <div className="mt-6 h-px w-12 bg-accent" />
          <p className="mt-6 text-sm text-cream-muted">
            An archive and ledger for members who keep their own record.
          </p>
        </div>

        <p className="relative text-xs text-cream-muted">
          © {new Date().getFullYear()} Book&Seat. Members only.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center px-6 py-16 sm:px-12">
        <div className="w-full max-w-md">
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <BookOpen/>
            <span className="font-display text-lg text-ink">Book&Seat</span>
          </div>

          <p className="text-xs tracking-[0.2em] uppercase text-leather mb-3">{eyebrow}</p>
          <h1 className="font-display text-3xl text-ink mb-2">{title}</h1>
          <p className="text-sm text-ink-muted mb-8">{subtitle}</p>

          {children}

          <div className="mt-8 border-t border-border pt-6 text-sm text-ink-muted">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
}