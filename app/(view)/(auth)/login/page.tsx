import Link from "next/link";
import { AuthShell } from "@/components/features/auth/AuthShell";
import { Field } from "@/components/ui/form/Field";
import { Button } from "@/components/ui/form/Button";

export default function LoginPage() {
  return (
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
      <form className="space-y-5">
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

        <Button type="submit">Enter the vault</Button>
      </form>
    </AuthShell>
  );
}