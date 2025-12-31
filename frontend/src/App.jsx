import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import { Link } from 'react-router-dom';

// --- COMPONENTS UTAMA ---
import Navbar from './navbar/navbar';
import Banner from './banner/banner';
import GameGrid from './gamegrid/gamegrid';
import CekTransaksi from './cek transaksi/cek_transaksi';
import Footer from './footer/footer';
import TopUpGamePage from "./topuppages";

// --- COMPONENTS ARTIKEL ---
import ArticleNavbar from './articles/ArticleNavbar';
import ArticleBanner from './articles/ArticleBanner';
import ArticleFooter from './articles/ArticleFooter';
import ArticleSection from './articles/ArticleSection';
import ArticleContent from './articles/ArticleContent';
import ArticleContent1 from './articles/ArticleContent1';
import ArticleContent2 from './articles/ArticleContent2';


function App() {
  // 1. SETUP ROUTER
  const location = useLocation();
  const navigate = useNavigate();

  // Logic: Jika URL diawali '/artikel', gunakan Navbar/Footer khusus artikel
  const isArticlePage = location.pathname.startsWith('/artikel');

  // 2. STATE DATA
  const [currentBanner, setCurrentBanner] = useState(0);
  const [games, setGames] = useState([]); 
  const [loading, setLoading] = useState(true);

  // 3. FETCH DATA GAME (Backend Laravel)
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('/api/games');
        
        const formattedData = response.data.map(game => ({
          id: game.slug,
          name: game.name,
          img: game.image ? game.image : '/images/placeholder.png', 
          publisher: game.code,
          banner: `/images/banner-${game.slug}.png`
        }));

        setGames(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Gagal konek ke backend:", error);
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // 4. DATA STATIC (Banner & Transaksi)
  const daftarBanner = [
    "/images/baner1.png",
    "/images/baner2.png",
    "/images/baaner3.png",
  ];

  const transactions = [
    { date: "18-12-2025 19:38:26", invoice: "TPxxxxxxxxxxxx104", phone: "*********281", price: "IDR 15xxxxx", status: "PENDING" },
    { date: "18-12-2025 19:38:22", invoice: "TPxxxxxxxxxxxx874", phone: "*********447", price: "IDR 15xxxxx", status: "PENDING" },
  ];

  // 5. NAVIGASI GAME
  const handleGameClick = (game) => {
    // Pindah ke halaman /buy membawa data game
    navigate('/buy', { state: { gameData: game } });
  };

  // Wrapper untuk mencegah error jika halaman Topup dibuka langsung tanpa data
  const TopUpPageWrapper = () => {
    const { state } = useLocation();
    if (!state || !state.gameData) return <Navigate to="/" replace />;
    return <TopUpGamePage game={state.gameData} onBack={() => navigate('/')} />;
  };

  return (
    <>
      {/* NAVBAR: Otomatis berubah sesuai halaman */}
      {isArticlePage ? <ArticleNavbar /> : <Navbar />}

      <div className="app-wrapper">
        <main className="app-main">

          <Routes>

            {/* =================================================== */}
            {/* BAGIAN INI MENJADIKAN HALAMAN UTAMA SEBAGAI HOME    */}
            {/* URL: /                                              */}
            {/* =================================================== */}
            <Route path="/" element={
              <>
                {/* 1. Hero Section (Video & Banner) */}
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

                {/* 2. List Game */}
                {loading ? (
                   <div style={{textAlign: 'center', padding: '50px', color: 'white'}}>
                     <h3>Sedang memuat game...</h3>
                   </div>
                ) : (
                  <GameGrid
                    games={games} 
                    onGameClick={handleGameClick}
                  />
                )}

                {/* 3. Preview Artikel di Home */}
                <ArticleSection isPreview />
              </>
            } />

            {/* ================= HALAMAN LAINNYA ================= */}

            {/* Halaman Topup (Saat game diklik) */}
            <Route path="/buy" element={<TopUpPageWrapper />} />

            {/* Halaman Cek Transaksi */}
            <Route path="/cek-transaksi" element={<CekTransaksi transactions={transactions} />} />

            {/* Halaman Utama Artikel */}
            <Route path="/artikel" element={
              <>
                <ArticleBanner />
                <div style={{ paddingTop: 40 }}>
                  <ArticleSection />
                </div>
              </>
            } />

            {/* Halaman Detail Artikel */}
            <Route path="/artikel/detail" element={<div style={{ paddingTop: 100 }}><ArticleContent /></div>} />
            <Route path="/artikel/detail1" element={<div style={{ paddingTop: 100 }}><ArticleContent1 /></div>} />
            <Route path="/artikel/detail2" element={<div style={{ paddingTop: 100 }}><ArticleContent2 /></div>} />

          </Routes>
        </main>

        {/* FOOTER */}
        {isArticlePage ? <ArticleFooter /> : <Footer />}
      </div>
    </>
  );
}

export default App;