import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/signin" />;
  }
  // If children are passed, render them; otherwise render nested routes (Outlet)
  return children ? children : <Outlet />;
};
