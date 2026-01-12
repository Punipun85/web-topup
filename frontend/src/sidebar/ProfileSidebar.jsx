import { NavLink } from "react-router-dom";
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
  return (
    <aside className="profile-sidebar">
      <div className="profile-sidebar-header">
        <h3>Akun Saya</h3>
      </div>

      <nav className="profile-sidebar-menu">
        <NavLink to="/profile" end className="profile-link">
          <FaUser />
          <span>Profile</span>
        </NavLink>

        <NavLink to="/transaksi" className="profile-link">
          <FaExchangeAlt />
          <span>Transaksi</span>
        </NavLink>

        <NavLink to="/mutasi" className="profile-link">
          <FaWallet />
          <span>Mutasi</span>
        </NavLink>

        <NavLink to="/afiliasi" className="profile-link">
          <FaUsers />
          <span>Afiliasi</span>
        </NavLink>

        <NavLink to="/settings" className="profile-link">
          <FaCog />
          <span>Pengaturan</span>
        </NavLink>
      </nav>

      <div className="profile-sidebar-footer">
        <button className="logout-btn">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}
