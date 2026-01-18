import { Outlet } from "react-router-dom";
import AdminTopbar from "./components/AdminTopbar";
import "./styles/admin.css";

export default function AdminLayout() {
  return (
    <div className="admin-wrapper">
    

      {/* MAIN */}
      <div className="admin-main">
        <AdminTopbar />

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
