import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./App.css";

// --- COMPONENTS UTAMA ---
import Navbar from "./navbar/navbar";
import Banner from "./banner/banner";
import GameGrid from "./gamegrid/gamegrid";
import CekTransaksi from "./cek transaksi/cek_transaksi";
import Footer from "./footer/footer";
import TopUpGamePage from "./topuppages";
import Leaderboard from "./leaderboard/Leaderboard";
import Checkout from "./Checkout/Checkout";
import Selesai from "./selesai/selesai";
import UploadPembayaran from "./Upload/UploadPembayaran";

// --- COMPONENTS ARTIKEL ---
import ArticleNavbar from "./articles/ArticleNavbar";
import ArticleBanner from "./articles/ArticleBanner";
import ArticleFooter from "./articles/ArticleFooter";
import ArticleSection from "./articles/ArticleSection";
import ArticleContent from "./articles/ArticleContent";
import ArticleContent1 from "./articles/ArticleContent1";
import ArticleContent2 from "./articles/ArticleContent2";

// --- KALKULATOR ---
import KalkulatorWinRate from "./kalkulator/KalkulatorWinRate";
import KalkulatorMagicWheel from "./kalkulator/KalkulatorMagicWheel";
import Kalkulatorzodiac from "./kalkulator/Kalkulatorzodiac"; // Pastikan nama file di folder kalkulator adalah Kalkulatorzodiac.jsx

// --- AUTH ---
import Login from "./pages/Login";
import Register from "./pages/Register";

// === ADMIN ===
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import AdminRoute from "./admin/Adminroute"; 
import Orders from "./admin/pages/Orders";
import Games from "./admin/pages/Game";
import Packages from "./admin/pages/Packages";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Artikel pakai navbar/footer khusus
  const isArticlePage = location.pathname.startsWith("/artikel");

  // --- STATE ---
  const [currentBanner, setCurrentBanner] = useState(0);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 

  // --- FETCH GAME ---
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/games");

        const formattedData = response.data.map((game) => ({
          id: game.id,
          slug: game.slug,
          name: game.name,
          image: game.image,
          publisher: game.code,
          banner: `/images/banner-${game.slug}.png`,
        }));

        setGames(formattedData);
      } catch (error) {
        console.error("Gagal load data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // --- STATIC DATA ---
  const daftarBanner = [
    "/images/baner1.png",
    "/images/baner2.png",
    "/images/baaner3.png",
  ];

  const transactions = [
    {
      date: "18-12-2025 19:38:26",
      invoice: "TPxxxxxxxxxxxx104",
      phone: "*********281",
      price: "IDR 15xxxxx",
      status: "PENDING",
    },
  ];

  // --- NAVIGASI GAME ---
  const handleGameClick = (game) => {
    navigate("/buy", { state: { gameData: game } });
  };

  // Wrapper Topup Page
  const TopUpPageWrapper = () => {
    const { state } = useLocation();
    if (!state || !state.gameData) {
      return <Navigate to="/" replace />;
    }
    return (
      <TopUpGamePage
        game={state.gameData}
        onBack={() => navigate("/")}
      />
    );
  };

  return (
    <>
      {/* NAVBAR */}
      {isArticlePage ? (
        <ArticleNavbar />
      ) : (
        <Navbar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          games={games} 
        />
      )}

      <div className="app-wrapper">
        <main className="app-main">
          <Routes>
            {/* HOME */}
            <Route
              path="/"
              element={
                <>
                  <section className="hero-section">
                    <div className="hero-video">
                      <video autoPlay muted loop playsInline>
                        <source
                          src="/images/background.mp4"
                          type="video/mp4"
                        />
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

                  {loading ? (
                    <div style={{ textAlign: "center", padding: "50px", color: "white" }}>
                      <h3>Sedang memuat game...</h3>
                    </div>
                  ) : (
                    <GameGrid
                      games={games}
                      onGameClick={handleGameClick}
                    />
                  )}

                  <ArticleSection isPreview />
                </>
              }
            />

            <Route path="/checkout" element={<Checkout />} />
            <Route path="/selesai" element={<Selesai />} />
            <Route path="/upload-pembayaran" element={<UploadPembayaran />} />

            {/* --- ROUTE KALKULATOR --- */}
            
            {/* 1. Win Rate */}
            <Route path="/kalkulator/win-rate" element={<KalkulatorWinRate />} />
            
            {/* 2. Magic Wheel */}
            <Route path="/kalkulator/magic-wheel" element={<KalkulatorMagicWheel />} />
            
            {/* 3. Zodiac */}
            <Route path="/kalkulator/zodiac" element={<Kalkulatorzodiac />} />

            {/* 4. Redirect Default /kalkulator ke Win Rate */}
            <Route path="/kalkulator" element={<Navigate to="/kalkulator/win-rate" replace />} />

            {/* AUTH */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* ================= ADMIN ================= */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="games" element={<Games />} />
              <Route path="packages" element={<Packages />} />
            </Route>

            {/* TOPUP */}
            <Route path="/buy" element={<TopUpPageWrapper />} />

            {/* TRANSAKSI */}
            <Route path="/cek-transaksi" element={<CekTransaksi transactions={transactions} />} />

            {/* LEADERBOARD */}
            <Route path="/leaderboard" element={<Leaderboard />} />

            {/* ARTIKEL */}
            <Route
              path="/artikel"
              element={
                <>
                  <ArticleBanner />
                  <div style={{ paddingTop: 40 }}>
                    <ArticleSection />
                  </div>
                </>
              }
            />
            <Route path="/artikel/detail" element={<div style={{ paddingTop: 100 }}><ArticleContent /></div>} />
            <Route path="/artikel/detail1" element={<div style={{ paddingTop: 100 }}><ArticleContent1 /></div>} />
            <Route path="/artikel/detail2" element={<div style={{ paddingTop: 100 }}><ArticleContent2 /></div>} />

            {/* 404 */}
            <Route
              path="*"
              element={
                <div style={{ paddingTop: 120, color: "white", textAlign: "center" }}>
                  <h2>404 - Halaman tidak ditemukan</h2>
                </div>
              }
            />
          </Routes>
        </main>

        {isArticlePage ? <ArticleFooter /> : <Footer />}
      </div>
    </>
  );
}

export default App;