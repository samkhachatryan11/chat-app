import { useAuthStore } from "@/features/auth/stores/useAuthStore";
import { Navigate, Outlet } from "react-router";

export function GuestOnlyRoute() {
  const isAuthenticated = useAuthStore((state) => !!state.user);

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}
