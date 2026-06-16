import { useAuthStore } from "@/features/auth/stores/useAuthStore";
import { Navigate, Outlet } from "react-router";

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => !!state.user);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
