import { ButtonHTMLAttributes } from "react";

export function Button({
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`w-full inline-flex items-center justify-center gap-2 bg-surface-inverted text-cream font-medium text-sm tracking-wide py-3 rounded-sm transition-colors hover:bg-accent hover:text-surface-inverted ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}