import React from 'react';
import {
  ShoppingBag,
  SearchCode,
  Trophy,
  Megaphone,
  Calculator,
  LogIn,
  UserPlus
} from 'lucide-react';

import './navbar.css';

export default function Navbar({ menuAktif, setMenuAktif }) {
  return (
    <header className="navbar">

      {/* ===== TOP BAR ===== */}
      <div className="navbar-top">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="navbar-logo"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setMenuAktif('topup');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        <div className="navbar-search">
          <input
            type="text"
            placeholder="Cari Game atau Voucher"
            className="search-input"
          />
        </div>

        <div className="navbar-auth">
          <button className="auth-btn">
            <LogIn size={16} /> Masuk
          </button>
          <button className="auth-btn">
            <UserPlus size={16} /> Daftar
          </button>
        </div>
      </div>

      {/* ===== MENU ===== */}
      <div className="navbar-menu">

        {/* ===== TOPUP ===== */}
        <NavItem
          label="Topup"
          icon={<ShoppingBag size={18} />}
          active={menuAktif === 'topup'}
          onClick={() => {
            setMenuAktif('topup');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* ===== CEK TRANSAKSI ===== */}
        <NavItem
          label="Cek Transaksi"
          icon={<SearchCode size={18} />}
          active={menuAktif === 'cek-transaksi'}
          onClick={() => {
            setMenuAktif('cek-transaksi');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* ===== LEADERBOARD ===== */}
        <NavItem
          label="Leaderboard"
          icon={<Trophy size={18} />}
          active={menuAktif === 'leaderboard'}
          onClick={() => {
            setMenuAktif('leaderboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* ===== ARTIKEL (Koneksi ke ArticleSection) ===== */}
        <NavItem
          label="Artikel"
          icon={<Megaphone size={18} />}
          active={menuAktif === 'artikel'} // Menyesuaikan dengan state di App.js
          onClick={() => {
            setMenuAktif('artikel'); // Menjalankan fungsi pindah menu
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* ===== KALKULATOR ===== */}
        <NavItem
          label="Kalkulator"
          icon={<Calculator size={18} />}
          active={menuAktif === 'kalkulator'}
          onClick={() => {
            setMenuAktif('kalkulator');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

      </div>
    </header>
  );
}

function NavItem({ label, icon, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`nav-item ${active ? 'active' : ''}`}
      style={{ cursor: 'pointer' }} // Menambahkan pointer agar user tahu ini bisa diklik
    >
      {icon}
      <span>{label.toUpperCase()}</span> {/* Mengikuti gaya gambar yang kapital semua */}
      {active && <div className="nav-indicator"></div>}
    </div>
  );
}