import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CekTransaksi from "./pages/CekTransaksi";
import Topup from "./pages/topup";

function App() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/transactions" element={<CekTransaksi />} />
        <Route path="/topup/:gameSlug" element={<Topup />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
