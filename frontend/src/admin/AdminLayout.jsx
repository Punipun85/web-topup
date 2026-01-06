import { Outlet } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import AdminTopbar from "./components/AdminTopbar";
import "./styles/admin.css";

export default function AdminLayout() {
  return (
    <div className="admin-wrapper">
  <div className="admin-sidebar">...</div>
  <div className="admin-main">
    <div className="admin-topbar">...</div>
    <div className="admin-content">
      <Outlet />
    </div>
  </div>
</div>
  );
}
