import { StateCreator } from "zustand";

// 1. Define the union type for the theme options
export type Theme = 'light' | 'dark';

// 2. Define the interface for your store state and actions
export interface ThemeSlice {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const sliceTheme: StateCreator<ThemeSlice> = (set, get) => ({
    theme: 'light',
    setTheme: (theme) => set({ theme }),
    toggleTheme: () => set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),
});
