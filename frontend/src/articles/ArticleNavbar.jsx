import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './ArticleNavbar.css'

export default function ArticleNavbar() {
  const navigate = useNavigate()

  return (
    <header className="article-navbar">
      <div className="article-navbar-inner">

        {/* LOGO */}
        <Link to="/artikel" className="article-logo">
          <img src="/images/logo a6.png" alt="Logo" />
        </Link>

        {/* MENU */}
        <nav className="article-menu">
          <Link to="/artikel">Beranda</Link>
          <Link to="/artikel">Artikel</Link>
        </nav>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Cari artikel..."
          className="article-search"
        />

        {/* CTA */}
        <button
          className="article-cta"
          onClick={() => navigate('/')}
        >
          AyoTopup Sekarang
        </button>

      </div>
    </header>
  )
}
