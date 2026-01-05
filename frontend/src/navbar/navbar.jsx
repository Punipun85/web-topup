import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ShoppingBag,
  SearchCode,
  Trophy,
  Megaphone,
  Calculator,
  LogIn,
  UserPlus,
  Search // Import icon search
} from 'lucide-react'

import './navbar.css'

// TERIMA PROPS 'games' DARI APP.JSX
export default function Navbar({ searchTerm, setSearchTerm, games = [] }) {
  const location = useLocation()
  const navigate = useNavigate()
  
  // State lokal untuk menampilkan dropdown
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter games untuk Dropdown Navbar
  // Kita batasi max 5-10 hasil agar tidak terlalu panjang
  const searchResults = games.filter(game => 
     game.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 10); 

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/')

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowDropdown(e.target.value.length > 0); // Tampilkan dropdown jika ada ketikan
  };

  // Saat item di dropdown diklik
  const handleItemClick = (game) => {
    // 1. Pindah ke halaman buy
    navigate('/buy', { state: { gameData: game } });
    // 2. Reset search dan tutup dropdown
    setSearchTerm('');
    setShowDropdown(false);
  };

  // Tutup dropdown jika klik di luar (Opsional, simpelnya pakai onBlur atau backdrop)
  // Untuk tutorial ini kita biarkan terbuka saat mengetik.

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

        {/* --- SEARCH BAR DENGAN DROPDOWN --- */}
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Cari Game..."
            className="search-input"
            value={searchTerm} 
            onChange={handleSearchChange}
            onFocus={() => searchTerm && setShowDropdown(true)} // Tampilkan lagi saat diklik
            // onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Delay biar klik item sempat tereksekusi
          />
          <Search className="search-icon-inside" size={20} />

          {/* LOGIC DROPDOWN: Muncul jika showDropdown TRUE dan ada hasil */}
          {showDropdown && searchTerm && (
              <div className="search-dropdown">
                  {searchResults.length > 0 ? (
                      searchResults.map((game) => (
                          <div 
                            key={game.id} 
                            className="search-item"
                            onClick={() => handleItemClick(game)}
                          >
                              {/* Gambar Kecil */}
                              <img src={game.image} alt={game.name} className="search-item-img" />
                              
                              {/* Detail Text */}
                              <div className="search-item-info">
                                  <span className="search-item-name">{game.name}</span>
                                  <span className="search-item-pub">{game.publisher}</span>
                              </div>
                          </div>
                      ))
                  ) : (
                      // Jika tidak ada hasil
                      <div className="search-item" style={{cursor: 'default'}}>
                          <span className="search-item-pub">Game tidak ditemukan</span>
                      </div>
                  )}
              </div>
          )}
        </div>
        {/* --- END SEARCH BAR --- */}

        <div className="navbar-auth">
          <button className="auth-btn">
            <LogIn size={16} /> Masuk
          </button>
          <button className="auth-btn">
            <UserPlus size={16} /> Daftar
          </button>
        </div>
      </div>

      {/* ===== MENU (Tetap Sama) ===== */}
      <div className="navbar-menu">
        <NavItem label="Topup" icon={<ShoppingBag size={18} />} to="/" active={isActive('/')} />
        <NavItem label="Cek Transaksi" icon={<SearchCode size={18} />} to="/cek-transaksi" active={isActive('/cek-transaksi')} />
        <NavItem label="Leaderboard" icon={<Trophy size={18} />} to="/leaderboard" active={isActive('/leaderboard')} />
        <NavItem label="Artikel" icon={<Megaphone size={18} />} to="/artikel" active={isActive('/artikel')} external />
        <NavItem label="Kalkulator" icon={<Calculator size={18} />} to="/kalkulator" active={isActive('/kalkulator')} />
      </div>
    </header>
  )
}

function NavItem({ label, icon, to, active, external }) {
  if (external) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={`nav-item ${active ? 'active' : ''}`}>
        {icon} <span>{label.toUpperCase()}</span>
        {active && <div className="nav-indicator"></div>}
      </a>
    )
  }
  return (
    <Link to={to} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`nav-item ${active ? 'active' : ''}`}>
      {icon} <span>{label.toUpperCase()}</span>
      {active && <div className="nav-indicator"></div>}
    </Link>
  )
}