import React from 'react';
import { ShoppingBag, SearchCode, Trophy, Megaphone, Calculator, LogIn, UserPlus, Search } from 'lucide-react';

export default function Navbar({ menuAktif, setMenuAktif }) {
  return (
    <header className="bg-[#111111] border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center gap-6">
        <img src="/images/logo.png" alt="Logo" className="h-9 cursor-pointer" onClick={() => setMenuAktif('topup')} />
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input type="text" className="w-full bg-[#1e1e1e] border border-gray-800 rounded-lg py-2 pl-11 text-sm text-white focus:outline-none" placeholder="Cari Game atau Voucher" />
        </div>
        <div className="flex gap-4 items-center">
          <button className="flex items-center gap-2 text-xs font-bold hover:text-[#f3f305]"><LogIn size={16}/> Masuk</button>
          <button className="flex items-center gap-2 text-xs font-bold hover:text-[#f3f305]"><UserPlus size={16}/> Daftar</button>
        </div>
      </div>
      <div className="border-t border-white/5 overflow-x-auto no-scrollbar">
        <div className="max-w-[1400px] mx-auto px-4 flex gap-8">
          <NavItem label="Topup" icon={<ShoppingBag size={18} />} active={menuAktif === 'topup'} onClick={() => setMenuAktif('topup')} />
          <NavItem label="Cek Transaksi" icon={<SearchCode size={18} />} active={menuAktif === 'transaksi'} onClick={() => setMenuAktif('transaksi')} />
          <NavItem label="Leaderboard" icon={<Trophy size={18} />} />
          <NavItem label="Artikel" icon={<Megaphone size={18} />} />
          <NavItem label="Kalkulator" icon={<Calculator size={18} />} />
        </div>
      </div>
    </header>
  );
}

function NavItem({ label, icon, active, onClick }) {
  return (
    <div onClick={onClick} className={`flex items-center gap-2 py-4 px-1 cursor-pointer relative transition-all font-black text-[11px] uppercase tracking-widest whitespace-nowrap ${active ? 'text-[#f3f305]' : 'text-gray-500 hover:text-white'}`}>
      {icon} <span>{label}</span>
      {active && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#f3f305] shadow-[0_0_15px_rgba(243,243,5,0.8)]"></div>}
    </div>
  );
}