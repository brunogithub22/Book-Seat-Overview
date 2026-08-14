
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ThemeSlice, sliceTheme } from './slices/Theme';
import { AdminSlice, sliceAdmin } from './slices/Admin';


export type StoreState = ThemeSlice & AdminSlice 

export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...sliceTheme(...a),
      ...sliceAdmin(...a)
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
