'use client';

import { Sun, Moon } from 'lucide-react';
import { useStore } from '@/store/Theme';

export default function ThemeToggle() {
  const theme = useStore((s) => s.theme);
  const toggleTheme = useStore((s) => s.toggleTheme);

  return (
    
    <button
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-full text-cream-muted hover:text-cream hover:bg-white/5 transition-colors"
    >
      {theme === 'light' ? <Sun size={17} /> : <Moon size={17} />}
    </button>
    
  );
}