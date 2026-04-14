import { LoginPage, RegisterPage } from "@/features/auth/pages";
import { AuthLayout } from "@/app/layouts/AuthLayout";

export default {
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
};
