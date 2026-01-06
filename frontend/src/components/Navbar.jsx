import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  SearchCode,
  Trophy,
  Megaphone,
  Calculator,
  LogIn,
  UserPlus,
  Search,
} from "lucide-react";

// Menerima props dari App.jsx agar fitur search berfungsi
export default function Navbar({ searchTerm, setSearchTerm, games }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State untuk mengontrol tampilan dropdown hasil pencarian
  const [showDropdown, setShowDropdown] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Logika Filter Game
  const filteredGames = games?.filter((game) =>
    game.name.toLowerCase().includes(searchTerm?.toLowerCase() || "")
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  const handleGameClick = (game) => {
    setSearchTerm(""); // Kosongkan search bar
    setShowDropdown(false); // Tutup dropdown
    navigate('/buy', { state: { gameData: game } }); // Pindah ke halaman beli
  };

  return (
    <header className="bg-[#111111] border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center gap-6">
        {/* LOGO (Gunakan logo.png yang aman) */}
        <Link to="/">
          <img src="/images/logo.png" alt="Logo" className="h-9 cursor-pointer" />
        </Link>

        {/* SEARCH BAR DENGAN LOGIKA */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Delay biar klik item sempat terbaca
            className="w-full bg-[#1e1e1e] border border-gray-800 rounded-lg py-2 pl-11 text-sm text-white focus:outline-none focus:border-[#f3f305] transition-colors"
            placeholder="Cari Game atau Voucher..."
          />

          {/* DROPDOWN HASIL PENCARIAN */}
          {showDropdown && searchTerm && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#1e1e1e] border border-gray-700 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
              {filteredGames?.length > 0 ? (
                filteredGames.map((game) => (
                  <div
                    key={game.id}
                    onClick={() => handleGameClick(game)}
                    className="flex items-center gap-3 p-3 hover:bg-[#2a2a2f] cursor-pointer transition-colors border-b border-gray-800 last:border-0"
                  >
                    <img src={game.image} alt={game.name} className="w-8 h-8 rounded object-cover" />
                    <div>
                      <h4 className="text-white text-sm font-bold">{game.name}</h4>
                      <p className="text-xs text-gray-400">{game.publisher}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-400 text-sm">
                  Game tidak ditemukan
                </div>
              )}
            </div>
          )}
        </div>

        {/* TOMBOL LOGIN & REGISTER */}
        <div className="flex gap-4 items-center">
          <Link
            to="/login"
            className="flex items-center gap-2 text-xs font-bold text-white hover:text-[#f3f305] transition-colors"
          >
            <LogIn size={16} /> Masuk
          </Link>

          <Link
            to="/register"
            className="flex items-center gap-2 text-xs font-bold text-white hover:text-[#f3f305] transition-colors"
          >
            <UserPlus size={16} /> Daftar
          </Link>
        </div>
      </div>

      {/* MENU NAVIGASI BAWAH */}
      <div className="border-t border-white/5 overflow-x-auto no-scrollbar">
        <div className="max-w-[1400px] mx-auto px-4 flex gap-8">
          <NavItem
            to="/"
            label="Topup"
            icon={<ShoppingBag size={18} />}
            active={isActive("/")}
          />

          {/* Perbaiki Link ke /cek-transaksi (sesuai App.jsx) */}
          <NavItem
            to="/cek-transaksi"
            label="Cek Transaksi"
            icon={<SearchCode size={18} />}
            active={isActive("/cek-transaksi")}
          />

          <NavItem 
            to="/leaderboard"
            label="Leaderboard" 
            icon={<Trophy size={18} />} 
            active={isActive("/leaderboard")}
          />
          
          <NavItem 
            to="/artikel"
            label="Artikel" 
            icon={<Megaphone size={18} />} 
            active={isActive("/artikel")}
          />
          
          {/* Kalkulator belum ada rutenya, biarkan kosong dulu */}
          <NavItem label="Kalkulator" icon={<Calculator size={18} />} />
        </div>
      </div>
    </header>
  );
}

function NavItem({ to, label, icon, active }) {
  const baseClass =
    "flex items-center gap-2 py-4 px-1 cursor-pointer relative transition-all font-black text-[11px] uppercase tracking-widest whitespace-nowrap";

  const activeClass = active
    ? "text-[#f3f305]"
    : "text-gray-500 hover:text-white";

  if (!to) {
    return (
      <div className={`${baseClass} ${activeClass}`}>
        {icon} <span>{label}</span>
      </div>
    );
  }

  return (
    <Link to={to} className={`${baseClass} ${activeClass}`}>
      {icon} <span>{label}</span>
      {active && (
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#f3f305] shadow-[0_0_15px_rgba(243,243,5,0.8)]"></div>
      )}
    </Link>
  );
}