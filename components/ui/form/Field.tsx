import { InputHTMLAttributes, forwardRef } from "react";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, id, ...props },
  ref
) {
  return (
    <label htmlFor={id} className="block">
      <span className="block text-xs tracking-wide uppercase text-ink-muted mb-2">
        {label}
      </span>
      <input
        ref={ref}
        id={id}
        className="w-full bg-transparent border-b border-border text-ink placeholder:text-ink-muted/60 py-2.5 text-[15px] outline-none transition-colors focus:border-accent"
        {...props}
      />
    </label>
  );
});