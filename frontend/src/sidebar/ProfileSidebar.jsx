import { NavLink, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaExchangeAlt,
  FaWallet,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "./profileSidebar.css";

export default function ProfileSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="profile-sidebar">
      {/* ===== HEADER ===== */}
      <div className="profile-sidebar-header">
        <h3>Akun Saya</h3>
        <span className="sidebar-subtitle">Kelola akun & aktivitas</span>
      </div>

      {/* ===== MENU ===== */}
      <nav className="profile-sidebar-menu">
        <NavLink
          to="/profile"
          end
          className={({ isActive }) =>
            `profile-link ${isActive ? "active" : ""}`
          }
        >
          <FaUser />
          <span>Profil</span>
        </NavLink>

        <NavLink
          to="/transaksi"
          className={({ isActive }) =>
            `profile-link ${isActive ? "active" : ""}`
          }
        >
          <FaExchangeAlt />
          <span>Transaksi</span>
        </NavLink>

        <NavLink
          to="/mutasi"
          className={({ isActive }) =>
            `profile-link ${isActive ? "active" : ""}`
          }
        >
          <FaWallet />
          <span>Mutasi</span>
        </NavLink>

        <NavLink
          to="/afiliasi"
          className={({ isActive }) =>
            `profile-link ${isActive ? "active" : ""}`
          }
        >
          <FaUsers />
          <span>Afiliasi</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `profile-link ${isActive ? "active" : ""}`
          }
        >
          <FaCog />
          <span>Pengaturan</span>
        </NavLink>
      </nav>

      {/* ===== FOOTER ===== */}
      <div className="profile-sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
