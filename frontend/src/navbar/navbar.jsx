import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ShoppingBag,
  SearchCode,
  Trophy,
  Megaphone,
  Calculator,
  LogIn,
  UserPlus,
  Search // Pastikan icon Search diimport
} from 'lucide-react'

import './navbar.css'

// Menerima props 'games', 'searchTerm', 'setSearchTerm' dari App.jsx
export default function Navbar({ searchTerm, setSearchTerm, games = [] }) {
  const location = useLocation()
  const navigate = useNavigate()
  
  // State lokal untuk menampilkan dropdown
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter games untuk Dropdown Navbar
  // Batasi max 10 hasil agar tidak terlalu panjang
  const searchResults = games.filter(game => 
     game.name.toLowerCase().includes((searchTerm || "").toLowerCase())
  ).slice(0, 10); 

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/')

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowDropdown(e.target.value.length > 0); 
  };

  // Saat item di dropdown diklik
  const handleItemClick = (game) => {
    navigate('/buy', { state: { gameData: game } }); // Pindah ke halaman beli
    setSearchTerm(''); // Reset search
    setShowDropdown(false); // Tutup dropdown
  };

  return (
    <header className="navbar">

      {/* ===== TOP BAR ===== */}
      <div className="navbar-top">
        {/* LOGO */}
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img
            src="/images/logo.png"
            alt="Logo"
            className="navbar-logo"
          />
        </Link>

        {/* --- SEARCH BAR DENGAN DROPDOWN --- */}
        <div className="navbar-search">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Cari Game atau Voucher..."
            className="search-input"
            value={searchTerm} 
            onChange={handleSearchChange}
            onFocus={() => searchTerm && setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)} 
          />

          {/* DROPDOWN LOGIC */}
          {showDropdown && searchTerm && (
              <div className="search-dropdown">
                  {searchResults.length > 0 ? (
                      searchResults.map((game) => (
                          <div 
                            key={game.id} 
                            className="search-item"
                            onClick={() => handleItemClick(game)}
                          >
                              <img src={game.image} alt={game.name} style={{width: 40, height: 40, borderRadius: 4, marginRight: 10, objectFit: 'cover'}} />
                              <div>
                                  <div style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>{game.name}</div>
                                  <div style={{color: '#888', fontSize: 11}}>{game.publisher}</div>
                              </div>
                          </div>
                      ))
                  ) : (
                      <div className="search-item" style={{cursor: 'default', padding: 15, color: '#888'}}>
                          Game tidak ditemukan
                      </div>
                  )}
              </div>
          )}
        </div>

        {/* --- TOMBOL AUTH (LOGIN/REGISTER) --- */}
        <div className="navbar-auth">
          <Link to="/login" className="auth-btn">
            <LogIn size={16} /> Masuk
          </Link>
          <Link to="/register" className="auth-btn">
            <UserPlus size={16} /> Daftar
          </Link>
        </div>
      </div>

      {/* ===== MENU BAWAH ===== */}
      <div className="navbar-menu">
        <NavItem label="Topup" icon={<ShoppingBag size={18} />} to="/" active={isActive('/')} />
        <NavItem label="Cek Transaksi" icon={<SearchCode size={18} />} to="/cek-transaksi" active={isActive('/cek-transaksi')} />
        <NavItem label="Leaderboard" icon={<Trophy size={18} />} to="/leaderboard" active={isActive('/leaderboard')} />
        <NavItem label="Artikel" icon={<Megaphone size={18} />} to="/artikel" active={isActive('/artikel')} />
        <NavItem label="Kalkulator" icon={<Calculator size={18} />} to="/kalkulator" active={isActive('/kalkulator')} />
      </div>
    </header>
  )
}

// Komponen Item Menu
function NavItem({ label, icon, to, active, external }) {
  const commonClass = `nav-item ${active ? 'active' : ''}`;
  
  if (external) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={commonClass}>
        {icon} <span>{label}</span>
        {active && <div className="nav-indicator"></div>}
      </a>
    )
  }
  return (
    <Link to={to} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={commonClass}>
      {icon} <span>{label}</span>
      {active && <div className="nav-indicator"></div>}
    </Link>
  )
}