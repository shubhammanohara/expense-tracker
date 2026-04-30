import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const ProtectedRoute = ({ isAuthenticated, isLoading }: ProtectedRouteProps) => {
  if (isLoading) return <div>Loading...</div>; // or a spinner

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
