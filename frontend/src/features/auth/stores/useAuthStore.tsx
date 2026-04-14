// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// type User = {
//   id: string;
//   name: string;
// };

// type AuthState = {
//   user: User | null;
//   isLoading: boolean;

//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
// };

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set, get) => ({
//       user: null,
//       isLoading: false,

//       login: async (email, password) => {
//         set({ isLoading: true });

//         try {
//           // simulate API
//           const user = await fakeLoginApi(email, password);

//           set({ user });
//         } finally {
//           set({ isLoading: false });
//         }
//       },

//       logout: () => {
//         set({ user: null });
//       },
//     }),
//     {
//       name: "auth-storage",
//     },
//   ),
// );

// async function fakeLoginApi(email: string, password: string) {
//   return new Promise<User>((resolve) =>
//     setTimeout(() => resolve({ id: "1", name: "Sam" }), 1000),
//   );
// }
