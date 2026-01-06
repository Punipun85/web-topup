import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  // ambil user dari storage
  const user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user"));

  // belum login atau bukan admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
