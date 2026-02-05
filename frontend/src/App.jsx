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

// ===== COMPONENTS UTAMA =====
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
import ContactUs from "./pages/ContactUs";
import Invoice from "./invoice/Invoice";
import Transactions from "./Transactions/Transactions";
import ResetPassword from "./password/ResetPassword";
import ForgotPassword from "./password/ForgotPassword";

// PERBAIKAN: Path profile sekarang diarahkan ke folder /profile/ sesuai pemindahanmu
import Profile from "./profile/profile"; 

// PERBAIKAN: Jika folder 'pages/account' masih ada, biarkan. 
// Jika sudah dipindah ke folder lain, sesuaikan path di bawah ini:
import Mutations from "./pages/account/Mutations";
import Affiliations from "./pages/account/Affiliations";
import Settings from "./pages/account/Settings";

// ===== ARTIKEL =====
import ArticleNavbar from "./articles/ArticleNavbar";
import ArticleBanner from "./articles/ArticleBanner";
import ArticleFooter from "./articles/ArticleFooter";
import ArticleSection from "./articles/ArticleSection";
import ArticleContent from "./articles/ArticleContent";
import ArticleContent1 from "./articles/ArticleContent1";
import ArticleContent2 from "./articles/ArticleContent2";

// ===== KALKULATOR =====
import KalkulatorWinRate from "./kalkulator/KalkulatorWinRate";
import KalkulatorMagicWheel from "./kalkulator/KalkulatorMagicWheel";
import Kalkulatorzodiac from "./kalkulator/Kalkulatorzodiac";

// ===== AUTH =====
import Login from "./pages/Login";
import Register from "./pages/Register";

// ===== ADMIN =====
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import AdminRoute from "./admin/Adminroute";
import Orders from "./admin/pages/Orders";
import Games from "./admin/pages/Game";
import Packages from "./admin/pages/Packages";
import CustomerServiceAdmin from "./admin/pages/CustomerService";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // ===== PAGE TYPE DETECTION =====
  const isArticlePage = location.pathname.startsWith("/artikel");
  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  // ===== STATE =====
  const [currentBanner, setCurrentBanner] = useState(0);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // ===== FETCH GAME =====
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/games");
        const formatted = res.data.map((game) => ({
          id: game.id,
          slug: game.slug,
          name: game.name,
          image: game.image,
          publisher: game.code,
          banner: `/images/banner-${game.slug}.png`,
        }));
        setGames(formatted);
      } catch (err) {
        console.error("Gagal load game:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  // ===== STATIC =====
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

  // ===== GAME NAV =====
  const handleGameClick = (game) => {
    navigate("/buy", { state: { gameData: game } });
  };

  const TopUpPageWrapper = () => {
    const { state } = useLocation();
    if (!state?.gameData) return <Navigate to="/" replace />;
    return (
      <TopUpGamePage
        game={state.gameData}
        onBack={() => navigate("/")}
      />
    );
  };

  useEffect(() => {
  const theme = localStorage.getItem("theme") || "dark";
  document.body.dataset.theme = theme;
}, []);


  return (
    <>
      {/* ===== NAVBAR ===== */}
      {!isAuthPage && (
        isArticlePage ? (
          <ArticleNavbar />
        ) : (
          <Navbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            games={games}
          />
        )
      )}

      <div className="app-wrapper">
        <main className="app-main">
          <Routes>

            {/* ===== HOME ===== */}
            <Route
              path="/"
              element={
                <>
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

                  {loading ? (
                    <div style={{ textAlign: "center", padding: 50, color: "white" }}>
                      <h3>Sedang memuat game...</h3>
                    </div>
                  ) : (
                    <GameGrid games={games} onGameClick={handleGameClick} />
                  )}

                  <ArticleSection isPreview />
                </>
              }
            />

            {/* ===== AUTH ===== */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* ===== USER ===== */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/mutasi" element={<Mutations />} />
            <Route path="/afiliasi" element={<Affiliations />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/invoice/:invoiceId" element={<Invoice />} />

            {/* ===== TRANSAKSI ===== */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/selesai" element={<Selesai />} />
            <Route path="/payment/upload/:orderNumber" element={<UploadPembayaran />} />
            <Route path="/cek-transaksi" element={<CekTransaksi transactions={transactions} />} />

            {/* ===== TOPUP ===== */}
            <Route path="/buy" element={<TopUpPageWrapper />} />

            {/* ===== LEADERBOARD ===== */}
            <Route path="/leaderboard" element={<Leaderboard />} />

            {/* ===== KALKULATOR ===== */}
            <Route path="/kalkulator/win-rate" element={<KalkulatorWinRate />} />
            <Route path="/kalkulator/magic-wheel" element={<KalkulatorMagicWheel />} />
            <Route path="/kalkulator/zodiac" element={<Kalkulatorzodiac />} />
            <Route path="/kalkulator" element={<Navigate to="/kalkulator/win-rate" replace />} />

            {/* ===== ARTIKEL ===== */}
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
            <Route path="/artikel/detail" element={<ArticleContent />} />
            <Route path="/artikel/detail1" element={<ArticleContent1 />} />
            <Route path="/artikel/detail2" element={<ArticleContent2 />} />

            {/* ===== ADMIN ===== */}
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
              <Route path="customer-service" element={<CustomerServiceAdmin />} />
            </Route>

            {/* ===== 404 ===== */}
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

        {/* ===== FOOTER ===== */}
        {!isAuthPage && (
          isArticlePage ? <ArticleFooter /> : <Footer />
        )}
      </div>
    </>
  );
}

export default App;