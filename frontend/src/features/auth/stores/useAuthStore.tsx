import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { authService } from "@/features/auth/services/authService";

type User = {
  id: string;
  username: string;
  email: string;
  avatar: string;
};

type AuthState = {
  user: User | null;
  isLoading: boolean;

  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isLoading: false,

        login: async (data) => {
          set({ isLoading: true });
          try {
            const result = await authService.login(data);
            set({ user: result.data, isLoading: false });
          } catch (error) {
            set({ user: null, isLoading: false });
            throw error;
          }
        },

        register: async (data) => {
          set({ isLoading: true });
          try {
            const result = await authService.register(data);
            set({ user: result.data, isLoading: false });
          } catch (error) {
            set({ user: null, isLoading: false });
            throw error;
          }
        },

        logout: async () => {
          set({ isLoading: true });
          try {
            await authService.logout(get().user?.id);
          } catch (error) {
            throw error;
          } finally {
            set({ user: null, isLoading: false });
          }
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({ user: state.user }),
      },
    ),
  ),
);
