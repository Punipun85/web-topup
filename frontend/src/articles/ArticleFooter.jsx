import React from 'react';
import { useNavigate } from 'react-router-dom'; // Tambahkan ini
import './articleFooter.css';

export default function ArticleFooter() {
  const navigate = useNavigate(); // Inisialisasi navigasi

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="art-footer-wrapper">
      <div className="art-footer-top">
        <div className="art-footer-column art-brand-col">
          <img src="/images/logo a6.png" className="art-footer-logo" alt="Logo A6TOPUP" />
          <p className="art-footer-description">
            ✨ <strong>A6TOPUP adalah Sahabat Para Gamers Dan Platform Top Game Termurah di Indonesia. 
            Penuhi Kebutuhan Gaming Mu Bersama a6topup. Store Specialist Game Mobile Legends 
            No.1 Murah, Aman, Terpercaya Dan Legal 100% (Open 24 Jam)</strong> ✨
          </p>
        </div>

        <div className="art-footer-column art-sitemap-col">
          <h4 className="art-sitemap-title">Peta Situs</h4>
          <nav className="art-footer-nav">
             {/* Kembali ke Halaman Utama App (Topup) */}
             <a onClick={() => handleNavigation('/artikel')}>Beranda</a>
             
             {/* Kembali ke Halaman Utama Artikel (Ada ArticleBanner) */}
             <a onClick={() => handleNavigation('/artikel')}>News</a>
          </nav>
        </div>
      </div>

      <div className="art-footer-bottom">
        <p className="art-copyright-text">© 2025 A6TOPUP. All rights reserved.</p>
      </div>
    </footer>
  );
}