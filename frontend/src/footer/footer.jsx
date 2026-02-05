import React from 'react';
import './footer.css';

export default function Footer({ setMenuAktif }) {
  return (
    <footer className="footer">
      <div className="footer-container">

        <p className="footer-description">
          A6topup adalah Sahabat Para Gamers Dan Platform Top Up Game Termurah di Indonesia.
          Penuhi Kebutuhan Gaming Mu Bersama a6topup. Store Specialist Game Mobile Legends
          No.1 Murah, Aman, Terpercaya Dan Legal 100% (Open 24 Jam).
        </p>

        <div className="footer-grid">
          <FooterColumn title="Peta Situs">
            <li onClick={() => {
              setMenuAktif('topup');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>
              Beranda
            </li>
            <li>Masuk</li>
            <li>Daftar</li>
            <li onClick={() => {
              setMenuAktif('cek-transaksi');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>
              Cek Transaksi
            </li>
          </FooterColumn>

          <FooterColumn title="Dukungan">
            <li>WhatsApp</li>
            <li>Email</li>
            <li>Instagram</li>
          </FooterColumn>

          <FooterColumn title="Legalitas">
            <li>Kebijakan Privasi</li>
            <li>Syarat & Ketentuan</li>
          </FooterColumn>

          <FooterColumn title="Social Media">
            <li>Tiktok a6topup</li>
            <li>Instagram Takapedia</li>
            <li className="vendor">
              <span>🦅</span> Venderpedia
            </li>
          </FooterColumn>
        </div>
      </div>
    </footer>

    
  );
}

function FooterColumn({ title, children }) {
  return (
    <div className="footer-column">
      <h4>{title}</h4>
      <ul>{children}</ul>
    </div>
  );
}
