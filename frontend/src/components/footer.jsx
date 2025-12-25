import React from 'react';
import { Sun, Headset } from 'lucide-react';

export default function Footer() {
  return (
    <>
      {/* --- FOOTER SECTION --- */}
      <footer className="bg-[#000000] pt-16 pb-32 border-t border-white/5 relative z-10">
        <div className="max-w-[1200px] mx-auto px-4">
          {/* Teks Deskripsi */}
          <div className="text-gray-400 text-center text-[13px] leading-relaxed mb-16 max-w-6xl mx-auto px-4">
            a6topup adalah Sahabat Para Gamers Dan Platform Top Up Game Termurah di Indonesia.
            Penuhi Kebutuhan Gaming Mu Bersama a6topup. Store Specialist Game Mobile Legends No.1
            Murah, Aman, Terpercaya Dan Legal 100% (Open 24 Jam). Takapedia Sahabat Para Gamers
            Kami berdedikasi untuk menyediakan layanan terbaik dan terus menerus inovatif untuk
            memenuhi kebutuhan gamers. Jangan lewatkan kesempatan untuk mengikuti kami di sosial
            media dan tetap update dengan informasi terbaru, tips, trik, dan promo-promo menarik
            lainnya.
          </div>

          {/* Grid Menu Footer */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-[14px] mb-16">
            {/* Kolom 1 */}
            <div>
              <h4 className="text-[#f3f305] font-black uppercase tracking-wider mb-6">
                Peta Situs
              </h4>
              <ul className="space-y-4 text-gray-300 font-medium">
                <li className="hover:text-white cursor-pointer transition-colors">Beranda</li>
                <li className="hover:text-white cursor-pointer transition-colors">Masuk</li>
                <li className="hover:text-white cursor-pointer transition-colors">Daftar</li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Cek Transaksi
                </li>
              </ul>
            </div>

            {/* Kolom 2 */}
            <div>
              <h4 className="text-[#f3f305] font-black uppercase tracking-wider mb-6">
                Dukungan
              </h4>
              <ul className="space-y-4 text-gray-300 font-medium">
                <li className="hover:text-white cursor-pointer transition-colors">WhatsApp</li>
                <li className="hover:text-white cursor-pointer transition-colors">Email</li>
                <li className="hover:text-white cursor-pointer transition-colors">Instagram</li>
              </ul>
            </div>

            {/* Kolom 3 */}
            <div>
              <h4 className="text-[#f3f305] font-black uppercase tracking-wider mb-6">
                Legalitas
              </h4>
              <ul className="space-y-4 text-gray-300 font-medium">
                <li className="hover:text-white cursor-pointer transition-colors">
                  Kebijakan Privasi
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Syarat & Ketentuan
                </li>
              </ul>
            </div>

            {/* Kolom 4 */}
            <div>
              <h4 className="text-[#f3f305] font-black uppercase tracking-wider mb-6">
                Social Media
              </h4>
              <ul className="space-y-4 text-gray-300 font-medium">
                <li className="hover:text-white cursor-pointer transition-colors">
                  Tiktok a6topup
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Instagram Takapedia
                </li>
                <li className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors mt-2">
                  <span className="text-yellow-500">🦅</span> Venderpedia
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* --- FLOATING FOOTER BAR --- */}
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-6 pointer-events-none">
          <div className="max-w-[1400px] mx-auto flex items-end justify-between">
            <div className="text-[11px] text-gray-500 font-medium bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 pointer-events-auto">
              © 2025 A6TOPUP. All rights reserved.
            </div>

            <div className="flex flex-col items-end gap-3 pointer-events-auto">
              <button className="w-10 h-10 bg-[#1c1c24] border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all shadow-xl">
                <Sun size={20} />
              </button>

              <button className="flex items-center gap-3 bg-[#f3f305] text-black px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-wider shadow-[0_10px_30px_rgba(243,243,5,0.4)] hover:scale-105 active:scale-95 transition-all">
                <Headset size={20} strokeWidth={3} />
                CUSTOMER SERVICE
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
