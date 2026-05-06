import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/src/hooks/useAuthStore";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore.getState();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
