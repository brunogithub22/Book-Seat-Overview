"use client";
import Link from "next/link";
import { AuthShell } from "@/components/features/auth/AuthShell";
import { Field } from "@/components/ui/form/Field";
import { Button } from "@/components/ui/form/Button";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signup } from "./action";

export default function SignupPage() {

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);

    try {
      
      await signup({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
      });
      router.push("/dashboard");

    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <AuthShell
      eyebrow="New account"
      title="Open your ledger"
      subtitle="A few details, and your record begins."
      footer={
        <p>
          Already a member?{" "}
          <Link href="/login" className="text-leather underline underline-offset-4 hover:text-accent">
            Sign in
          </Link>
        </p>
      }
    >
      <form action={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Field id="firstName" name="firstName" label="First name" placeholder="Ada" autoComplete="given-name" required />
          <Field id="lastName" name="lastName" label="Last name" placeholder="Lovelace" autoComplete="family-name" required />
        </div>
        <Field id="email" name="email" type="email" label="Email" placeholder="you@domain.com" autoComplete="email" required />
        <Field
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          minLength={8}
          required
        />

        <label className="flex items-start gap-2 text-sm text-ink-muted">
          <input type="checkbox" name="terms" className="accent-accent mt-0.5" required />
          <span>
            I agree to the{" "}
            <Link href="/terms" className="text-leather underline underline-offset-4 hover:text-accent">
              terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-leather underline underline-offset-4 hover:text-accent">
              privacy policy
            </Link>
            .
          </span>
        </label>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
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