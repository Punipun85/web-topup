import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <h2>WEB TOPUP</h2>

      <nav>
        <NavLink to="/admin" end>
          Dashboard
        </NavLink>

        <NavLink to="/admin/orders">
          Orders
        </NavLink>

        <NavLink to="/admin/payment">
          Manual Payment
        </NavLink>

        <NavLink to="/admin/packages">
          Packages
        </NavLink>

        <NavLink to="/admin/games">
          Games
        </NavLink>
      </nav>
    </aside>
  );
}
