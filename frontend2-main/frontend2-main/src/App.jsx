import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Terms from "./pages/terms";
import Dashboard from "./pages/dashboard";
import Transaksi from "./pages/transaksi";
import Mutasi from "./pages/mutasi"; 
import Laporan from "./pages/laporan";
import Afiliasi from "./pages/afiliasi"; // Untuk tab Riwayat
import Pembayaran from "./pages/pembayaran"; // 1. Import file Pembayaran baru
import Settings from "./pages/settings";

// calculator
import Winrate from "./pages/calculator/winrate";
import Zodiac from "./pages/calculator/zodiac";
import MagicWheel from "./pages/calculator/magicwheel";

function App() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/terms" element={<Terms />} />

      {/* DASHBOARD & USER */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/settings" element={<Settings />} />
      
      {/* HISTORY & REPORT */}
      <Route path="/transaksi" element={<Transaksi />} />
      <Route path="/mutasi" element={<Mutasi />} />
      <Route path="/laporan" element={<Laporan />} />
      
      {/* AFILIASI - Dipisah menjadi dua file berbeda */}
      <Route path="/afiliasi" element={<Afiliasi />} />
      <Route path="/afiliasi/settlement" element={<Pembayaran />} /> {/* 2. Arahkan ke file Pembayaran */}

      {/* CALCULATOR */}
      <Route path="/calculator/winrate" element={<Winrate />} />
      <Route path="/calculator/zodiac" element={<Zodiac />} />
      <Route path="/calculator/magicwheel" element={<MagicWheel />} />
    </Routes>
  );
}

export default App;