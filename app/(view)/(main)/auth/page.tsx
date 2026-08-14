"use client"
import Link from "next/link";
import { Button } from "@/components/ui/form/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AccountConfirmModal from "@/components/features/auth/AccountConfirm";
import { AuthResponse } from "../../(auth)/login/action";
import { useStore } from '@/store/Theme';


interface AuthUser {
  surname: string;
  email: string;
  name: string;
}

export default function HomePage() {

  const router = useRouter();
  const [checking, setChecking] = useState(false);
  const [pendingUser, setPendingUser] = useState<AuthUser | null>(null);

  const setName = useStore((s) => s.setName);
  const setSurname = useStore((s) => s.setSurname);
  const setEmail = useStore((s) => s.setEmail);

  async function handleClick() {
    setChecking(true);

    const res_AccessToken = await fetch("/api/auth/me", { method: "POST", credentials: "include" });

    let user: AuthResponse;

    if(res_AccessToken.status === 200){
      user = await res_AccessToken.json();
      setPendingUser(user);
    }else if(res_AccessToken.status === 401){
      const res_RefreshToken = await fetch("/api/auth/refresh", { method: "POST", credentials: "include" });
      if(res_RefreshToken.status === 200){
        user = await res_RefreshToken.json();
        setPendingUser(user);
      }else{
        router.push("/login");
      }
    }else{
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
          onConfirm={() =>{
            setName(pendingUser.name)
            setSurname(pendingUser.surname)
            setEmail(pendingUser.email) 
            router.push("/dashboard")
          }}
          onSwitchAccount={() => {
            setPendingUser(null);
            router.push("/login");
          }}
        />
      )}
    </div>
  );
}