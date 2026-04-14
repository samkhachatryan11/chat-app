import { MainLayout } from "../layouts/MainLayout";
import { ProtectedRoute } from "./ProtectedRoute";

export default {
  path: "/",
  element: <ProtectedRoute />,
  children: [
    {
      path: "/",
      element: <MainLayout />,
      children: [],
    },
  ],
};
