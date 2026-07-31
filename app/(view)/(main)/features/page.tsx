import Link from 'next/link';
import {
  BookMarked,
  Search,
  Clock,
  ShieldCheck,
  LineChart,
  Users2,
  BellRing,
  QrCode,
  Server,
  Cloud,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const FEATURE_CATEGORIES = [
  {
    id: 'catalog',
    tag: 'Core Management',
    title: 'Smart Catalog & Instant Search',
    description:
      'Give students and staff instant access to the entire library collection from any device with real-time status tracking.',
    items: [
      {
        icon: Search,
        title: 'Instant multi-field search',
        text: 'Filter books by title, author, subject, ISBN, or reading level with instant live updates.',
      },
      {
        icon: Clock,
        title: 'Real-time copy availability',
        text: 'Know instantly whether a title is on the shelf, borrowed, or reserved before making a trip.',
      },
      {
        icon: QrCode,
        title: 'Barcode & QR scanning',
        text: 'Librarians can check out or return books in seconds using any standard scanner or tablet camera.',
      },
    ],
  },
  {
    id: 'reservations',
    tag: 'Automated Workflows',
    title: 'Self-Serve Queue & Reservations',
    description:
      'Eliminate forgotten holds and messy paper queues with automated reservation flows and notifications.',
    items: [
      {
        icon: BellRing,
        title: 'Automated return notifications',
        text: 'Students automatically get notified via email or portal alert as soon as a held title is returned.',
      },
      {
        icon: Clock,
        title: 'Fair hold timers',
        text: 'Set configurable hold expiry windows so popular titles keep moving through the waitlist fairly.',
      },
      {
        icon: Users2,
        title: 'Smart queue positioning',
        text: 'Students can see their position in line and track estimated wait times transparently.',
      },
    ],
  },
  {
    id: 'roles',
    tag: 'Security & Access',
    title: 'Role-Based Access Control',
    description:
      'Ensure every user gets exactly the interface and permissions they need to be productive and safe.',
    items: [
      {
        icon: ShieldCheck,
        title: 'Principal-driven administration',
        text: 'No public sign-ups. High-level permissions are managed strictly by the principal or IT administrator.',
      },
      {
        icon: Users2,
        title: 'Tailored portals',
        text: 'Dedicated, distraction-free views for students, operating desks for librarians, and high-level dashboards for principals.',
      },
      {
        icon: ShieldCheck,
        title: 'Student privacy by design',
        text: 'Individual reading histories remain private and fully compliant with EU data protection regulations.',
      },
    ],
  },
  {
    id: 'reporting',
    tag: 'Insights & Analytics',
    title: 'Librarian Reporting & Analytics',
    description:
      'Replace manually compiled spreadsheets with automated reports on readership trends and inventory health.',
    items: [
      {
        icon: LineChart,
        title: 'Loan trends over time',
        text: 'Visualize borrowing volume by grade, month, or subject area to guide budget decisions.',
      },
      {
        icon: BookMarked,
        title: 'Most-requested titles',
        text: 'Identify high-demand books automatically so you know where to purchase extra copies.',
      },
      {
        icon: Clock,
        title: 'Overdue tracking & notices',
        text: 'Track late items effortlessly and trigger batch reminders with a single click.',
      },
    ],
  },
];

const ROLES_BENEFITS = [
  {
    role: 'For Students',
    benefit: 'Browse the catalog anytime, reserve books in seconds, and track due dates from home or classroom.',
    highlights: ['Mobile-friendly search', 'Personal queue status', 'No lost hold tickets'],
  },
  {
    role: 'For Librarians',
    benefit: 'Cut administrative overhead by 80% with fast desk workflows and automated overdue notifications.',
    highlights: ['One-click checkouts', 'Automated reporting', 'Simple inventory management'],
  },
  {
    role: 'For Principals',
    benefit: 'Gain complete visibility over school library usage, asset value, and compliance without extra paperwork.',
    highlights: ['Executive dashboard', 'Controlled user roles', 'GDPR compliance built-in'],
  },
];

export default function FeaturesPage() {
  return (
    <main className="bg-surface font-body text-ink">
      {/* HERO SECTION */}
      <section className="bg-surface-inverted text-cream py-20 lg:py-28 border-b border-accent/20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] text-accent">
            <BookMarked size={13} />
            Platform Capabilities
          </span>

          <h1 className="mt-6 text-4xl sm:text-6xl text-cream max-w-3xl mx-auto leading-tight font-display">
            Everything your school library needs to run smoothly
          </h1>

          <p className="mt-6 text-cream-muted text-lg max-w-2xl mx-auto leading-relaxed">
            From seamless catalog searches to GDPR-compliant administration, Book&Seat bridges the gap between paper registers and modern web technology.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3.5 text-sm font-medium text-ink hover:bg-accent-hover transition-colors"
            >
              Request a demo
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/#deployment"
              className="inline-flex items-center gap-2 rounded-sm border border-accent/40 px-6 py-3.5 text-sm text-cream hover:bg-accent/10 transition-colors"
            >
              Compare deployment options
            </Link>
          </div>
        </div>
      </section>

      {/* DETAILED CATEGORIES */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20 space-y-24">
        {FEATURE_CATEGORIES.map((category, idx) => (
          <div
            key={category.id}
            className={`grid lg:grid-cols-12 gap-12 items-start ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <span className="text-xs uppercase tracking-[0.14em] text-leather font-semibold">
                {category.tag}
              </span>
              <h2 className="mt-3 text-3xl text-ink leading-snug font-display">
                {category.title}
              </h2>
              <p className="mt-4 text-ink-muted leading-relaxed text-base">
                {category.description}
              </p>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-1 gap-6">
              {category.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-6 rounded-sm border border-border bg-surface-alt hover:border-accent/40 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-accent/10 text-accent">
                        <Icon size={20} />
                      </span>
                      <div>
                        <h3 className="text-lg font-medium text-ink">{item.title}</h3>
                        <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* ROLE-BASED BENEFITS */}
      <section className="bg-surface-alt border-y border-border py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl text-ink font-display">
              Designed for every role in the school community
            </h2>
            <p className="mt-3 text-ink-muted">
              Different stakeholders need different tools. Book&Seat satisfies students, librarians, and leadership simultaneously.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-8">
            {ROLES_BENEFITS.map((item) => (
              <div key={item.role} className="bg-surface p-8 rounded-sm border border-border flex flex-col justify-between">
                <div>
                  <h3 className="text-xl text-ink font-medium font-display">
                    {item.role}
                  </h3>
                  <p className="mt-3 text-sm text-ink-muted leading-relaxed">
                    {item.benefit}
                  </p>
                </div>

                <ul className="mt-6 pt-6 border-t border-border space-y-2.5">
                  {item.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-xs text-ink font-medium">
                      <CheckCircle2 size={15} className="text-accent shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPLOYMENT CALLOUT */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="rounded-sm bg-surface-inverted text-cream p-8 sm:p-12 grid lg:grid-cols-2 gap-8 items-center border border-accent/30">
          <div>
            <h2 className="text-3xl text-cream font-display">
              Flexible hosting to fit your school's IT policy
            </h2>
            <p className="mt-4 text-cream-muted text-sm leading-relaxed">
              Whether your school strictly mandates on-premise infrastructure or prefers zero-maintenance cloud hosting, Book&Seat offers both without compromise.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-cream">
                <Cloud size={18} className="text-accent" />
                <span><strong>Cloud (SaaS):</strong> Fully managed, hosted on EU servers, instant updates.</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-cream">
                <Server size={18} className="text-accent" />
                <span><strong>On-Premise:</strong> Deployed directly on your school server, data stays local.</span>
              </div>
            </div>
          </div>

          <div className="text-center lg:text-right">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3.5 text-sm font-medium text-ink hover:bg-accent-hover transition-colors"
            >
              View pricing & license details
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="border-t border-border bg-surface-alt">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl text-ink font-display">
              Ready to modernize your school library?
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              Get in touch to request a guided demo tailored to your school's size.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 shrink-0 rounded-sm bg-accent px-6 py-3.5 text-sm font-medium text-ink hover:bg-accent-hover transition-colors"
          >
            Request a demo
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}