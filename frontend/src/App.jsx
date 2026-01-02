import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import './App.css';

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

 // 3. FETCH DATA GAME
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/games');
        
        console.log("Data mentah:", response.data);

        const formattedData = response.data.map(game => {
            // LOGIKA BARU: Gambar ada di Frontend (Public Folder)
            
            let imageUrl = '/images/placeholder.png'; // Default

            if (game.image) {
                // Cek isi database:
                // Kasus A: Jika database isinya cuma nama file (contoh: "mlbb.png")
                // Maka kita tambahkan "/images/" di depannya.
                if (!game.image.includes('images/')) {
                    imageUrl = `/images/${game.image}`;
                } 
                // Kasus B: Jika database sudah lengkap (contoh: "/images/mlbb.png")
                else {
                    // Pastikan diawali dengan slash '/'
                    imageUrl = game.image.startsWith('/') ? game.image : `/${game.image}`;
                }
            }

            return {
                id: game.id,
                slug: game.slug,
                name: game.name,
                
                image: `/images/${game.slug}.png`, // Hasilnya misal: "/images/mlbb.png" (Tanpa http://127...000)
                
                publisher: game.code,
                banner: `/images/banner-${game.slug}.png`
            };
        });

        setGames(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Gagal load data:", error);
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
    navigate('/buy', { state: { gameData: game } });
  };

  // Wrapper
  const TopUpPageWrapper = () => {
    const { state } = useLocation();
    if (!state || !state.gameData) return <Navigate to="/" replace />;
    return <TopUpGamePage game={state.gameData} onBack={() => navigate('/')} />;
  };

  return (
    <>
      {isArticlePage ? <ArticleNavbar /> : <Navbar />}

      <div className="app-wrapper">
        <main className="app-main">

          <Routes>
            <Route path="/" element={
              <>
                {/* 1. Hero Section */}
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

                {/* 3. Preview Artikel */}
                <ArticleSection isPreview />
              </>
            } />

            <Route path="/buy" element={<TopUpPageWrapper />} />
            <Route path="/cek-transaksi" element={<CekTransaksi transactions={transactions} />} />

            <Route path="/artikel" element={
              <>
                <ArticleBanner />
                <div style={{ paddingTop: 40 }}>
                  <ArticleSection />
                </div>
              </>
            } />

            <Route path="/artikel/detail" element={<div style={{ paddingTop: 100 }}><ArticleContent /></div>} />
            <Route path="/artikel/detail1" element={<div style={{ paddingTop: 100 }}><ArticleContent1 /></div>} />
            <Route path="/artikel/detail2" element={<div style={{ paddingTop: 100 }}><ArticleContent2 /></div>} />

          </Routes>
        </main>

        {isArticlePage ? <ArticleFooter /> : <Footer />}
      </div>
    </>
  );
}

export default App;