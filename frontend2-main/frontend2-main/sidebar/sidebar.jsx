import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaSignOutAlt, 
  FaThLarge, 
  FaShoppingCart, 
  FaExchangeAlt, 
  FaFileAlt, 
  FaUserFriends 
} from "react-icons/fa"; 
import "./sidebar.css";

export default function Sidebar() {
  const location = useLocation();

  // Fungsi untuk menentukan apakah menu aktif berdasarkan URL saat ini
  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <aside className="sidebar">
      {/* Bagian Branding/Logo */}
      <div className="sidebar-coin-btn">
        <span className="coin-icon">A6</span> Asixcoin
      </div>

      <div className="sidebar-group">
        <ul className="sidebar-menu">
          {/* Dashboard */}
          <li className={isActive("/dashboard")}>
            <Link to="/dashboard" className="sidebar-link">
              <FaThLarge className="icon-react" /> 
              <span>Dashboard</span>
            </Link>
          </li>
          
          {/* Transaksi - Disamakan dengan URL di browser Anda (/transaksi) */}
          <li className={isActive("/transaksi")}>
            <Link to="/transaksi" className="sidebar-link">
              <FaShoppingCart className="icon-react" /> 
              <span>Transaksi</span>
            </Link>
          </li>
          
          {/* Mutasi */}
          <li className={isActive("/mutasi")}>
            <Link to="/mutasi" className="sidebar-link">
              <FaExchangeAlt className="icon-react" /> 
              <span>Mutasi</span>
            </Link>
          </li>
          
          {/* Laporan */}
          <li className={isActive("/laporan")}>
            <Link to="/laporan" className="sidebar-link">
              <FaFileAlt className="icon-react" /> 
              <span>Laporan</span>
            </Link>
          </li>
          
          {/* Afiliasi */}
          <li className={isActive("/afiliasi")}>
            <Link to="/afiliasi" className="sidebar-link">
              <FaUserFriends className="icon-react" /> 
              <span>Afiliasi</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Bagian Bawah / Logout */}
      <div className="sidebar-footer">
        <Link to="/login" className="logout-link">
          <button className="logout-btn">
            <FaSignOutAlt className="icon-react" /> 
            <span>Keluar</span>
          </button>
        </Link>
      </div>
    </aside>
  );
}