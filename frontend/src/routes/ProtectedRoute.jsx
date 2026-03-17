import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("adminToken");
  
  console.log("ProtectedRoute check - Token exists:", !!token);
  
  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  
  // If token exists, render the child routes
  return <Outlet />;
}