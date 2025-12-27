import React, { useState } from 'react';
import './App.css';
import { useEffect } from "react";
import Navbar from './navbar/navbar';
import Banner from './banner/banner';
import GameGrid from './gamegrid/gamegrid';
import CekTransaksi from './cek transaksi/cek_transaksi';
import Footer from './footer/footer';
import ArticleSection from './articles/ArticleSection';
import articleSection from './articles/ArticleContent';
import { Routes, Route } from "react-router-dom";
import TopUpGamePage from "./topuppages";


function App() {
  const [menuAktif, setMenuAktif] = useState('topup');
  const [currentBanner, setCurrentBanner] = useState(0);

  // ⭐ game yang sedang dipilih
  const [selectedGame, setSelectedGame] = useState(null);

  const daftarBanner = [
    "/images/baner1.png",
    "/images/baner2.png",
    "/images/baaner3.png",
  ];

  const transactions = [
    { date: "18-12-2025 19:38:26", invoice: "TPxxxxxxxxxxxx104", phone: "*********281", price: "IDR 15xxxxx", status: "PENDING" },
    { date: "18-12-2025 19:38:22", invoice: "TPxxxxxxxxxxxx874", phone: "*********447", price: "IDR 15xxxxx", status: "PENDING" },
    { date: "18-12-2025 19:38:18", invoice: "TPxxxxxxxxxxxx646", phone: "*********696", price: "IDR 28xxxxx", status: "PENDING" },
    { date: "18-12-2025 19:38:06", invoice: "TPxxxxxxxxxxxx588", phone: "*********996", price: "IDR 11xxxxx", status: "PENDING" },
    { date: "18-12-2025 19:38:19", invoice: "TPxxxxxxxxxxxx163", phone: "*********887", price: "IDR 19xxxxx", status: "SUCCESS" },
    { date: "18-12-2025 19:37:58", invoice: "TPxxxxxxxxxxxx254", phone: "*********052", price: "IDR 30xxxxx", status: "PENDING" },
    { date: "18-12-2025 19:37:56", invoice: "TPxxxxxxxxxxxx492", phone: "*********913", price: "IDR 28xxxxx", status: "PENDING" },
    { date: "18-12-2025 19:37:56", invoice: "TPxxxxxxxxxxxx712", phone: "*********265", price: "IDR 41xxxxx", status: "PENDING" },
    { date: "18-12-2025 19:38:27", invoice: "TPxxxxxxxxxxxx297", phone: "*********725", price: "IDR 84xxxxx", status: "PROCESS" },
  ];

  const games = [
    { id: 'mlbb', name: "Mobile Legends", img: "/images/mobilelegend.png", publisher: "Moonton" },
    { id: 'genshin', name: "Genshin Impact", img: "/images/genshinimpact.png", publisher: "HoYoverse" },
    { id: 'valorant', name: "Valorant", img: "/images/A6 TOPUP.png", publisher: "Riot Games" },
    { id: 'ff', name: "Free Fire", img: "/images/freefire.png", publisher: "Garena" },
    { id: 'pubg', name: "PUBG Mobile", img: "/images/pubg.png", publisher: "Tencent Games" },
    { id: 'hok', name: "Honor of Kings", img: "/images/hok.png", publisher: "TiMi Studio" },
  ];

  // ==============================
  // 🔹 Klik Game → buka halaman Topup Game
  // ==============================
  const handleGameClick = (game) => {
    setSelectedGame(game);
    setMenuAktif('game');
  };

  // ==============================
  // 🔹 Kembali ke halaman utama
  // ==============================
  const handleBackToHome = () => {
    setSelectedGame(null);
    setMenuAktif('topup');
  };

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <Navbar
        menuAktif={menuAktif}
        setMenuAktif={setMenuAktif}
      />

      {/* ===== MAIN APP ===== */}
      <div className="app-wrapper">
        <main className="app-main">

          {/* ===================== */}
          {/* HALAMAN GAME TOPUP */}
          {/* ===================== */}
          {menuAktif === 'game' && selectedGame && (
            <TopUpGamePage
              game={selectedGame}
              onBack={handleBackToHome}
            />
          )}

          {/* ===================== */}
          {/* HALAMAN TOPUP UTAMA */}
          {/* ===================== */}
          {menuAktif === 'topup' && (
            <>
              {/* HERO SECTION → BATAS VIDEO */}
              <section className="hero-section">
                <div className="hero-video">
                  <video autoPlay muted loop playsInline>
                    <source src="/images/background.mp4" type="video/mp4" />
                  </video>
                </div>

                <div className="hero-content">
                  <Banner
                    currentBanner={currentBanner}
                    setCurrentBanner={setCurrentBanner}
                    daftarBanner={daftarBanner}
                  />
                </div>
              </section>

              {/* GAME GRID → klik game */}
              <GameGrid
                games={games}
                onGameClick={handleGameClick}
              />

              <ArticleSection />
            </>
          )}

          {/* ===== HALAMAN KHUSUS ARTIKEL ===== */}
          {menuAktif === 'artikel' && (
            <div className="pages-container" style={{ paddingTop: '80px', minHeight: '80vh' }}>
              <ArticleSection />
            </div>
          )}

          {/* ===== HALAMAN CEK TRANSAKSI ===== */}
          {menuAktif === 'cek-transaksi' && (
            <CekTransaksi transactions={transactions} />
          )}

        </main>

        {/* FOOTER NORMAL (IKUT SCROLL) */}
        <Footer setMenuAktif={setMenuAktif} />
      </div>

      {/* 🔥 JIKA MAU FLOATING FIXED (TIDAK IKUT SCROLL) */}
      {/* <FloatingFooter /> */}
    </>

    
  );
}

export default App;
