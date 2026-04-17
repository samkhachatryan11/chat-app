import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { authService } from "@/features/auth/services/authService";

type User = {
  id: string;
  username: string;
  email: string;
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
  getUser: () => User | null;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
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
            console.log(error);
          }
        },

        register: async (data) => {
          set({ isLoading: true });

          try {
            const result = await authService.register(data);
            set({ user: result.data, isLoading: false });
          } catch (error) {
            console.log(error);
          }
        },

        getUser(): User | null {
          return get().user;
        },

        logout: async () => {
          set({ isLoading: true });

          try {
            await authService.logout(get().user?.id);
            set({ user: null, isLoading: false });
          } catch (error) {
            console.log(error);
          }
        },

        isAuthenticated: () => {
          return get().user ? true : false;
        },
      }),
      {
        name: "auth-storage",
      },
    ),
  ),
);
