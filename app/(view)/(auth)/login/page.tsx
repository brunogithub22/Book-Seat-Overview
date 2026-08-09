"use client"
import Link from "next/link";
import { AuthShell } from "@/components/features/auth/AuthShell";
import { Field } from "@/components/ui/form/Field";
import { Button } from "@/components/ui/form/Button";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signin } from "./action";
import ErrorToast from "@/components/features/auth/ErrorTost";


export default function LoginPage() {

    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
  
    async function handleSubmit(formData: FormData) {
      setError(null);
      setLoading(true);
  
      try {
        await signin({
          email: formData.get("email") as string,
          password: formData.get("password") as string,
          remember: formData.get("remember") === "on"
        });
        router.push("/dashboard")
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
    </AuthShell>

    {/* Loading Overlay Modal - Visible WHILE account is being created */}
    {loading && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-8 shadow-2xl text-center max-w-xs w-full mx-4">
      
        {/* Modern Gradient Spinner */}
        <div className="relative flex items-center justify-center mb-4">
          <div className="h-14 w-14 rounded-full border-4 border-slate-100 border-t-blue-600 border-r-blue-600 animate-spin" />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 animate-pulse">
          Creating your account...
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          Encrypting password & generating credentials
        </p>
      </div>
    </div>
   )}
   </>
  );
}