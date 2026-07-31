'use client';

import { useStore } from '@/store/Theme';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useStore((s) => s.theme);

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-surface text-ink transition-colors">
        {children}
      </div>
    </div>
  );
}