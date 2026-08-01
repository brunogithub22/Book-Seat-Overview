import Link from "next/link";
import { AuthShell } from "@/components/features/auth/AuthShell";
import { Field } from "@/components/ui/form/Field";
import { Button } from "@/components/ui/form/Button";

export default function SignupPage() {
  return (
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
      <form className="space-y-5">
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

        <Button type="submit">Create account</Button>
      </form>
    </AuthShell>
  );
}