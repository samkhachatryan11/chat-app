import { LoginPage, RegisterPage } from "@/features/auth/pages";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { GuestOnlyRoute } from "./guestOnlyRoute";

export default {
  element: <GuestOnlyRoute />,
  children: [
    {
      name: "Auth",
      element: <AuthLayout />,
      children: [
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
      ],
    },
  ],
};
