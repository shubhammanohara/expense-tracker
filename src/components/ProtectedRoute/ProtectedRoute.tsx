import { Navigate, Outlet } from "react-router-dom";

import { useAuthMe } from "@/src/hooks/useAuth";

const ProtectedRoute = () => {
  const { data: user, isPending, isError } = useAuthMe();

  if (isPending) return <div>Loading...</div>;

  // ✅ on error (401), redirect to login instead of looping
  if (isError || !user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
