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
  User,
  LogOut,
  Search
} from 'lucide-react'

import { useAuth } from '../Context/useAuth'
import './navbar.css'

export default function Navbar({ searchTerm, setSearchTerm, games = [] }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const [showDropdown, setShowDropdown] = useState(false)

  const searchResults = games
    .filter(game =>
      game.name.toLowerCase().includes((searchTerm || '').toLowerCase())
    )
    .slice(0, 10)

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/')

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setShowDropdown(e.target.value.length > 0)
  }

  const handleItemClick = (game) => {
    navigate('/buy', { state: { gameData: game } })
    setSearchTerm('')
    setShowDropdown(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

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

        {/* ===== SEARCH BAR ===== */}
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

          {showDropdown && searchTerm && (
            <div className="search-dropdown"
            onMouseDown={(e) => e.preventDefault()}>
              {searchResults.length > 0 ? (
                searchResults.map((game) => (
                  <div
                    key={game.id}
                    className="search-item"
                    onClick={() => handleItemClick(game)}
                  >
                    <img
                      src={game.image}
                      alt={game.name}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 4,
                        marginRight: 10,
                        objectFit: 'cover'
                      }}
                    />
                    <div>
                      <div style={{ color: 'white', fontSize: 13, fontWeight: 'bold' }}>
                        {game.name}
                      </div>
                      <div style={{ color: '#888', fontSize: 11 }}>
                        {game.publisher}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  className="search-item"
                  style={{ cursor: 'default', padding: 15, color: '#888' }}
                >
                  Game tidak ditemukan
                </div>
              )}
            </div>
          )}
        </div>

        {/* ===== AUTH SECTION ===== */}
        <div className="navbar-auth">
          {!user ? (
            <>
              <Link to="/login" className="auth-btn">
                <LogIn size={16} /> Masuk
              </Link>
              <Link to="/register" className="auth-btn">
                <UserPlus size={16} /> Daftar
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="auth-btn">
                <User size={16} /> {user.name ?? 'Profile'}
              </Link>
              <button onClick={handleLogout} className="auth-btn logout">
                <LogOut size={16} /> Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* ===== MENU BAWAH ===== */}
      <div className="navbar-menu flex items-center">
        <NavItem label="Topup" icon={<ShoppingBag size={18} />} to="/" active={isActive('/')} />
        <NavItem label="Cek Transaksi" icon={<SearchCode size={18} />} to="/cek-transaksi" active={isActive('/cek-transaksi')} />
        <NavItem label="Leaderboard" icon={<Trophy size={18} />} to="/leaderboard" active={isActive('/leaderboard')} />
        <NavItem label="Artikel" icon={<Megaphone size={18} />} to="/artikel" active={isActive('/artikel')} />
        
        {/* --- CUSTOM DROPDOWN KALKULATOR (PREMIUM STYLE - CLEAN JSX) --- */}
        <div className="relative group h-full flex items-center z-50">
            
            {/* 1. TRIGGER BUTTON */}
            <div className={`nav-item ${isActive('/kalkulator') ? 'active' : ''} cursor-pointer flex items-center gap-2 py-4`}>
                <Calculator size={18} /> 
                <span className="font-bold tracking-wide">Kalkulator</span>
                <svg className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
                {isActive('/kalkulator') && <div className="nav-indicator"></div>}
            </div>

            {/* 2. DROPDOWN CONTENT (Using Classes from CSS) */}
            <div className="premium-dropdown">
               <div className="dropdown-glass">

                  <div className="flex flex-col gap-1">
                    
                    {/* ITEM 1: WIN RATE */}
                    <Link to="/kalkulator/win-rate" className="menu-card purple">
                        <div className="icon-box purple">
                           <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                           </svg>
                        </div>
                        <div className="text-content">
                            <h4 className="menu-title">Hitung Win Rate</h4>
                            <p className="menu-desc">Target kemenangan mythic kamu.</p>
                        </div>
                    </Link>

                    {/* ITEM 2: MAGIC WHEEL */}
                    <Link to="/kalkulator/magic-wheel" className="menu-card blue">
                        <div className="icon-box blue">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </div>
                        <div className="text-content">
                            <h4 className="menu-title">Magic Wheel</h4>
                            <p className="menu-desc">Simulasi diamond Legend.</p>
                        </div>
                    </Link>

                    {/* ITEM 3: ZODIAC */}
                    <Link to="/kalkulator/zodiac" className="menu-card pink">
                         <div className="icon-box pink">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                        </div>
                        <div className="text-content">
                            <h4 className="menu-title">Zodiac Summon</h4>
                            <p className="menu-desc">Hitungan point zodiac skin.</p>
                        </div>
                    </Link>

                  </div>
               </div>
            </div>
        </div>

      </div>
    </header>
  )
}

/* ===== MENU ITEM ===== */
function NavItem({ label, icon, to, active, external }) {
  const commonClass = `nav-item ${active ? 'active' : ''}`

  if (external) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={commonClass}>
        {icon} <span>{label}</span>
        {active && <div className="nav-indicator"></div>}
      </a>
    )
  }

  return (
    <Link
      to={to}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={commonClass}
    >
      {icon} <span>{label}</span>
      {active && <div className="nav-indicator"></div>}
    </Link>
  )
}