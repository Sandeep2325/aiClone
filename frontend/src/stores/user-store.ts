import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name?: string;
  plan: 'free' | 'pro' | 'enterprise';
  credits: number;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  updateCredits: (credits: number) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateCredits: (credits) =>
        set((state) => ({
          user: state.user ? { ...state.user, credits } : null,
        })),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);
