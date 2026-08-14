"use client"
import Link from "next/link";
import { AuthShell } from "@/components/features/auth/AuthShell";
import { Field } from "@/components/ui/form/Field";
import { Button } from "@/components/ui/form/Button";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signin, checkAccountType, redirectToGoogleSignIn,AuthResponse } from "./action";
import ErrorToast from "@/components/features/auth/ErrorTost";
import { useStore } from '@/store/Theme';

export default function LoginPage() {

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const setName = useStore((s) => s.setName);
  const setSurname = useStore((s) => s.setSurname);
  const setEmail = useStore((s) => s.setEmail);


  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);

    try {
      const { isGoogle } = await checkAccountType({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        remember: formData.get("remember") === "on"
      });

      if (isGoogle) {
        redirectToGoogleSignIn(); // page navigates away — nothing after this runs
      } else {
        const data: AuthResponse = await signin({
          email: formData.get("email") as string,
          password: formData.get("password") as string,
          remember: formData.get("remember") === "on"
        });
        setName(data.name)
        setSurname(data.surname)
        setEmail(data.email)
        router.push("/dashboard")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AuthShell
        eyebrow="Member sign in"
        title="Welcome back"
        subtitle="Sign in to open your ledger and continue where you left off."
        footer={
          <p>
            New to Book&Seat?{" "}
            <Link href="/signup" className="text-leather underline underline-offset-4 hover:text-accent">
              Open an account
            </Link>
          </p>
        }
      >
        <form action={handleSubmit} className="space-y-5">
          <Field id="email" name="email" type="email" label="Email" placeholder="you@domain.com" autoComplete="email" required />
          <Field id="password" name="password" type="password" label="Password" placeholder="••••••••" autoComplete="current-password" required />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-ink-muted">
              <input type="checkbox" name="remember" className="accent-accent" />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-leather hover:text-accent">
              Forgot password?
            </Link>
          </div>

          {error && (
            <ErrorToast message={error} onClose={() => setError(null)} duration={6000} />
          )}

          <Button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs uppercase tracking-wide text-ink-muted">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Google button — full width, same footprint as the primary Button */}
        <button
          type="button"
          onClick={redirectToGoogleSignIn}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-sm border border-border bg-surface px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-leather hover:text-leather disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
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
      </AuthShell>

      {/* Loading Overlay Modal */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-8 shadow-2xl text-center max-w-xs w-full mx-4">
            <div className="relative flex items-center justify-center mb-4">
              <div className="h-14 w-14 rounded-full border-4 border-slate-100 border-t-blue-600 border-r-blue-600 animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 animate-pulse">
              Creating your account...
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Encrypting password &amp; generating credentials
            </p>
          </div>
        </div>
      )}
    </>
  );
}