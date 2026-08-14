import { StateCreator } from "zustand";

// 2. Define the interface for your store state and actions
export interface AdminSlice {
  name: string;
  surname: string;
  email: string;
  setName: (name: string) => void;
  setSurname: (surname: string) => void;
  setEmail: (email: string) => void;
  clear: () => void;
}

export const sliceAdmin: StateCreator<AdminSlice> = (set, get) => ({
    name: "",
    surname: "",
    email: "",
    setName: (name) => set({name: name }),
    setSurname: (surname) => set({surname: surname}),
    setEmail: (email) => set({email: email}),
    clear: () => set({name: "",surname: ""})
});
