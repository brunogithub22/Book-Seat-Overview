"use client";

import { useEffect, useRef } from "react";

interface AuthUser {
  surname: string;
  email: string;
  name: string;
}

interface AccountConfirmModalProps {
  user: AuthUser;
  onConfirm: () => void;
  onSwitchAccount: () => void;
}

export default function AccountConfirmModal({
  user,
  onConfirm,
  onSwitchAccount,
}: AccountConfirmModalProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  // Focus the primary action on mount, and let Escape act as "switch account"
  // (never as a silent dismiss — there's no valid "closed" state here since
  // checkAuth already confirmed a session exists).
  useEffect(() => {
    confirmRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onSwitchAccount();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSwitchAccount]);

  const initial = (user.name?.[0] ?? user.email[0]).toUpperCase();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-confirm-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-sm rounded-sm border border-border bg-surface p-8 shadow-xl">
        <p className="mb-6 text-xs uppercase tracking-[0.2em] text-leather">
          Welcome back
        </p>

        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-inverted text-lg font-display text-cream">
            {initial}
          </div>
          <div className="min-w-0">
            <p
              id="account-confirm-title"
              className="truncate font-display text-lg text-ink"
            >
              {user.name || "Member"}
            </p>
            <p className="truncate text-sm text-ink-muted">{user.email}</p>
          </div>
        </div>

        <p className="mt-6 text-sm text-ink-muted">
          Continue to your ledger with this account, or sign in as someone
          else.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <button
            ref={confirmRef}
            onClick={onConfirm}
            className="rounded-sm bg-surface-inverted px-6 py-3 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-accent hover:text-surface-inverted"
          >
            Continue as {user.name || user.email}
          </button>
          <button
            onClick={onSwitchAccount}
            className="text-sm font-medium text-leather underline underline-offset-4 hover:text-accent"
          >
            Not you? Sign in with a different account
          </button>
        </div>
      </div>
    </div>
  );
}