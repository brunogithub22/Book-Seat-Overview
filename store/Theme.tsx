
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ThemeSlice, sliceTheme } from './slices/Theme';
import { LangSlice } from './slices/Lang';


export type StoreState = ThemeSlice & LangSlice

export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...sliceTheme(...a),
    }),
    {
      name: 'Book&Seat',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme
      }),
    }
  )
);
