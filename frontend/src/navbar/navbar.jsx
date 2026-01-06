import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ShoppingBag,
  SearchCode,
  Trophy,
  Megaphone,
  Calculator,
  LogIn,
  UserPlus
} from 'lucide-react'

import './navbar.css'

export default function Navbar() {
  const location = useLocation()

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <header className="navbar">

      {/* ===== TOP BAR ===== */}
      <div className="navbar-top">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img
            src="/images/logo.png"
            alt="Logo"
            className="navbar-logo"
          />
        </Link>

        {/* SEARCH */}
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Cari Game Pilihan Kamu"
            className="search-input"
          />
        </div>

        {/* AUTH */}
        <div className="navbar-auth">
          <Link to="/login" className="auth-btn">
            <LogIn size={16} /> Masuk
          </Link>

          <Link to="/register" className="auth-btn">
            <UserPlus size={16} /> Daftar
          </Link>
        </div>
      </div>

      {/* ===== MENU ===== */}
      <div className="navbar-menu">

        <NavItem
          label="Topup"
          icon={<ShoppingBag size={18} />}
          to="/"
          active={isActive('/')}
        />

        <NavItem
          label="Cek Transaksi"
          icon={<SearchCode size={18} />}
          to="/cek-transaksi"
          active={isActive('/cek-transaksi')}
        />

        <NavItem
          label="Leaderboard"
          icon={<Trophy size={18} />}
          to="/leaderboard"
          active={isActive('/leaderboard')}
        />

        <NavItem
          label="Artikel"
          icon={<Megaphone size={18} />}
          to="/artikel"
          active={isActive('/artikel')}
          external
        />

        <NavItem
          label="Kalkulator"
          icon={<Calculator size={18} />}
          to="/kalkulator"
          active={isActive('/kalkulator')}
        />

      </div>
    </header>
  )
}

/* =========================
   NAV ITEM COMPONENT
========================= */
function NavItem({ label, icon, to, active, external }) {
  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={`nav-item ${active ? 'active' : ''}`}
      >
        {icon}
        <span>{label.toUpperCase()}</span>
        {active && <div className="nav-indicator"></div>}
      </a>
    )
  }

  return (
    <Link
      to={to}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`nav-item ${active ? 'active' : ''}`}
    >
      {icon}
      <span>{label.toUpperCase()}</span>
      {active && <div className="nav-indicator"></div>}
    </Link>
  )
}
