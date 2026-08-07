"use client"
import Link from "next/link";
import { Button } from "@/components/ui/form/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AccountConfirmModal from "@/components/features/auth/AccountConfirm";

interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

export default function HomePage() {

  const router = useRouter();
  const [checking, setChecking] = useState(false);
  const [pendingUser, setPendingUser] = useState<AuthUser | null>(null);

  async function handleClick() {
    setChecking(true);

    const user = await fetch("/api/auth/checkAuth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    if (user) {
      // sessione valida (o rinnovata col refresh) -> salta il signin
      setPendingUser(user);
    } else {
      // nessuna sessione valida -> serve login con password
      router.push("/login");
    }

    setChecking(false);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <main className="flex flex-1 items-center px-6 sm:px-10 lg:px-14">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-16 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-leather">
              Private ledger &amp; archive
            </p>
            <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
              Keep your own record.
            </h1>
            <p className="mt-6 max-w-md text-base text-ink-muted">
              Book&Seat is where members hold their documents, entries, and history
              in one place — quiet, private, and built to last.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/signup"
                className="rounded-sm bg-surface-inverted px-6 py-3 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-accent hover:text-surface-inverted"
              >
                Create an account
              </Link>
              <Button
                onClick={handleClick}
                disabled={checking}
                className="text-sm font-medium text-leather underline underline-offset-4 hover:text-accent"
              >
                {checking ? "Checking session…" : "Sign in to your ledger"}
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <button
                className="flex items-center gap-3 rounded-sm border border-border bg-surface px-6 py-3 text-ink font-medium text-ink transition-colors hover:border-leather hover:text-leather"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47c-.28 1.48-1.13 2.73-2.4 3.58v2.98h3.88c2.27-2.09 3.54-5.17 3.54-8.8z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.88-2.98c-1.08.72-2.45 1.15-4.05 1.15-3.12 0-5.76-2.1-6.7-4.93H1.29v3.07C3.26 21.3 7.31 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.3 14.33c-.24-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28V6.7H1.29A11.96 11.96 0 000 12.05c0 1.93.46 3.76 1.29 5.35l4.01-3.07z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.76 0 3.34.61 4.58 1.8l3.44-3.44C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.7l4.01 3.07C6.24 6.85 8.88 4.75 12 4.75z"
                  />
                </svg>
                Continue with Google
              </button>
            </div>
          </div>

          {/* Decorative brand panel */}
          <div className="relative hidden overflow-hidden rounded-sm bg-surface-inverted px-10 py-14 text-cream lg:block">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 28px)",
              }}
            />
            <p className="relative mt-8 font-display text-2xl leading-snug">
              &ldquo;Every ledger tells the story of what was built, and who
              built it.&rdquo;
            </p>
            <div className="relative mt-6 h-px w-12 bg-accent" />
            <p className="relative mt-6 text-sm text-cream-muted">
              Est. archive &amp; ledger for members who keep their own record.
            </p>
          </div>
        </div>
      </main>

      {pendingUser && (
        <AccountConfirmModal
          user={pendingUser}
          onConfirm={() => router.push("/dashboard")}
          onSwitchAccount={() => {
            setPendingUser(null);
            router.push("/login");
          }}
        />
      )}
    </div>
  );
}