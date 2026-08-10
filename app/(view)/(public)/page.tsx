"use client"
import Link from 'next/link';
import { ArrowRight, BookMarked, ShieldCheck, LineChart, Users2 } from 'lucide-react';
import {MainFooter} from '@/components/common/footer';
import { CSRF_signin } from '../(auth)/login/action';
import { useEffect } from 'react';


const FEATURES = [
  {
    title: 'Catalog & search',
    body: 'Students find a title by name, author, or subject, with real-time availability.',
    color: '#8B5E3C',
  },
  {
    title: 'Reservations & waitlist',
    body: 'When a copy is out, the queue and the notification happen on their own.',
    color: '#3E5C76',
  },
  {
    title: 'Role-based access',
    body: 'Students, librarian, and principal each see only what their role needs.',
    color: '#5B6F5B',
  },
  {
    title: 'Reporting for librarians',
    body: 'Loans over time, most-requested titles, overdue items — no manual spreadsheets.',
    color: '#7A5265',
  },
];

const DEPLOYMENT_ROWS = [
  ['Setup time', 'Ready in a few days', 'Needs a school server'],
  ['Data', 'Hosted on our servers (EU)', "Stays on the school's own infrastructure"],
  ['Maintenance', 'Handled by us', 'Handled by the school, support optional'],
  ['Cost', 'Annual subscription', 'One-time license + optional maintenance'],
];

const STEPS = [
  { n: '01', title: 'Request a demo', body: 'Tell us how many students and which deployment you prefer.' },
  { n: '02', title: 'We prepare the environment', body: 'A cloud instance, or the installation package for your server.' },
  { n: '03', title: 'The principal gets access', body: 'The first administrator account is created and handed over directly.' },
  { n: '04', title: 'The school is live', body: 'The principal enables librarian and student accounts from the panel.' },
];

function WelcomePage() {

  useEffect(() => {
    const run = async () => {
      try {
        await CSRF_signin();
        const csrfToken = getCookie('csrf_token');
  
        if (csrfToken === null) {
          throw new Error('Missing CSRF token — user may not be authenticated'); 
        }
        } catch (err) {
          console.error('CSRF signin failed:', err);
        }
      
    };
    run();
  }, []);
    
      
  return (
    <main className="bg-surface" style={{ fontFamily: 'var(--font-body, system-ui, sans-serif)' }}>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden bg-surface-inverted">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] text-accent">
              <BookMarked size={13} />
              Book&Seat for schools
            </span>

            <h1
              className="mt-6 text-[2.6rem] leading-[1.08] sm:text-6xl text-cream"
              style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
            >
              Every book in the school,
              <br />
              always accounted for.
            </h1>

            <p className="mt-6 max-w-md text-cream-muted text-[16px] leading-relaxed">
              Book&Seat replaces the paper register with a digital catalog, automatic
              reservations, and a simple panel for the librarian. Choose to host it in
              the cloud or on your school&apos;s own server.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3 text-sm font-medium text-ink hover:bg-accent-hover transition-colors"
              >
                Request a demo
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-sm border border-accent/40 px-6 py-3 text-sm text-cream hover:bg-accent/10 transition-colors"
              >
                See pricing
              </Link>
            </div>

            <div className="mt-6 text-xs text-cream-muted/80">
              No public sign-up &mdash; we set up the first administrator account for you.
            </div>
          </div>

          {/* decorative CSS-only shelf, now framed as "the catalog, kept in order" */}
          <div className="relative hidden lg:block">
            <div className="rounded-sm border border-border-inverted bg-white/[0.03] p-8">
              <div className="flex items-end gap-[3px] h-56">
                {['#8B5E3C', '#5B6F5B', '#C9A24B', '#3E5C76', '#7A5265', '#9C6B3E', '#4C7A6B', '#8B5E3C', '#C9A24B', '#3E5C76'].map(
                  (color, i) => (
                    <div
                      key={i}
                      className="rounded-t-[2px]"
                      style={{ backgroundColor: color, width: '100%', height: `${55 + ((i * 37) % 40)}%`, opacity: 0.9 }}
                    />
                  ),
                )}
              </div>
              <div className="mt-3 h-2 rounded-full bg-accent/30" />
            </div>
            <span className="absolute -top-3 right-10 block w-5 h-9 bg-accent bookmark-ribbon" />
          </div>
        </div>
      </section>

      {/* ---------- PROBLEM / SOLUTION ---------- */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20 grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-leather mb-4">The problem</p>
          <p className="text-lg leading-relaxed text-ink-muted">
            A paper register never really says who has a book right now. Reservations
            get lost, the librarian chases late returns by hand, and the principal has
            no real data on how the library gets used.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-leather mb-4">The solution</p>
          <p className="text-lg leading-relaxed text-ink-muted">
            One catalog, always current, open to students and librarian alike.
            Reservations and waitlists run themselves, and the principal gets a
            dashboard with the library&apos;s real numbers.
          </p>
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section id="features" className="bg-surface-alt border-y border-ink/5">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
          <h2 className="text-3xl text-ink" style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}>
            Built for how a school library actually runs
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 gap-x-12 gap-y-10">
            {FEATURES.map((f) => (
              <div key={f.title} className="border-b border-ink/8 pb-6">
                <span className="block h-1.5 w-10 rounded-full mb-4" style={{ backgroundColor: f.color }} />
                <h3 className="text-lg text-ink font-medium">{f.title}</h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- DEPLOYMENT ---------- */}
      <section id="deployment" className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <h2 className="text-3xl text-ink" style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}>
          Cloud or on-premise &mdash; one choice, not a compromise
        </h2>
        <p className="mt-4 max-w-2xl text-ink-muted">
          The school picks one mode at activation. Both include the same features;
          only where the data lives and who maintains it changes.
        </p>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-ink text-xs uppercase tracking-wide text-ink-muted">
                <th className="py-3 pr-4"></th>
                <th className="py-3 pr-4">Cloud (SaaS)</th>
                <th className="py-3 pr-4">On-premise</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {DEPLOYMENT_ROWS.map((row) => (
                <tr key={row[0]} className="border-b border-ink/8">
                  <td className="py-4 pr-4 font-medium text-ink">{row[0]}</td>
                  <td className="py-4 pr-4 text-ink-muted">{row[1]}</td>
                  <td className="py-4 pr-4 text-ink-muted">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="bg-surface-alt border-y border-ink/5">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
          <h2 className="text-3xl text-ink" style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}>
            How a school gets set up
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s) => (
              <div key={s.n}>
                <span
                  className="text-4xl text-accent"
                  style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontStyle: 'italic' }}
                >
                  {s.n}
                </span>
                <h3 className="mt-3 text-lg text-ink font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- TRUST / COMPLIANCE ---------- */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20 grid md:grid-cols-3 gap-10">
        <div>
          <ShieldCheck size={20} className="text-leather" />
          <h3 className="mt-4 text-ink font-medium">GDPR by default</h3>
          <p className="mt-2 text-sm text-ink-muted leading-relaxed">
            Student data is handled under EU rules. On-premise, it never leaves the
            school&apos;s own server.
          </p>
        </div>
        <div>
          <Users2 size={20} className="text-leather" />
          <h3 className="mt-4 text-ink font-medium">Roles, not open access</h3>
          <p className="mt-2 text-sm text-ink-muted leading-relaxed">
            Only the principal can grant elevated permissions to another account &mdash;
            never a public sign-up choice.
          </p>
        </div>
        <div>
          <LineChart size={20} className="text-leather" />
          <h3 className="mt-4 text-ink font-medium">Real usage data</h3>
          <p className="mt-2 text-sm text-ink-muted leading-relaxed">
            The librarian sees loans, waitlists, and overdue trends without building a
            single spreadsheet.
          </p>
        </div>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section className="bg-surface-inverted">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <h2 className="text-3xl text-cream max-w-lg" style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}>
            Let&apos;s talk about your school library.
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3.5 text-sm font-medium text-ink hover:bg-accent-hover transition-colors"
          >
            Request a demo
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function Home() {
  return (
    <>
    <WelcomePage />
    <MainFooter />
    </>
  );
}
