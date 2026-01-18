import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Tambah useNavigate buat kick kalau belum login
import { motion } from "framer-motion";
import Footer from "../footer/footer";
import { 
  FaHeadset, FaCog, FaShieldAlt, FaPhoneAlt, 
  FaCrown, FaEnvelopeOpenText, FaArrowRight, FaUser 
} from "react-icons/fa"; 
import "./profile.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Dashboard() {
  const navigate = useNavigate();
  
  // STATE DATA USER (Sesuai kolom DB kamu: username, phone)
  const [profile, setProfile] = useState({
    name: "",      // Akan diisi kolom 'username' atau 'name' dari DB
    phone: "",     // Akan diisi kolom 'phone' dari DB
    email: "",     // Akan diisi kolom 'email' dari DB
    isPremium: false, // Karena di DB belum ada kolom 'role/premium', nanti kita set default dulu
    initial: "?"
  });

  const [loading, setLoading] = useState(true);

  // --- FUNGSI AMBIL DATA ASLI (FETCH) ---
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 1. AMBIL TOKEN (Biasanya disimpan pas login)
        const token = localStorage.getItem("token"); 

        // Kalau tidak ada token, tendang ke login (Security)
        if (!token) {
          // navigate("/login"); // Uncomment ini kalau mau auto-kick user yang belum login
          console.log("User belum login / Token tidak ditemukan");
          setLoading(false);
          return;
        }

        // 2. PANGGIL API BACKEND KAMU
        // GANTI URL INI sesuai endpoint backend kamu (Misal: /api/user/me atau /api/profile)
        const response = await fetch("http://localhost:5000/api/me", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Kirim token biar backend tau ini siapa
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data user");
        }

        const dbData = await response.json();
        // dbData adalah JSON yang dikirim backend dari tabel 'users'

        // 3. MASUKKAN DATA DB KE STATE REACT
        setProfile({
          name: dbData.username || dbData.name, // Prioritas tampilkan username (sesuai screenshot 'rammm')
          phone: dbData.phone || "-",           // Ambil kolom phone
          email: dbData.email,
          isPremium: false,                     // Default False karena di DB kamu belum ada kolom 'role'
          initial: (dbData.username || "U").charAt(0).toUpperCase()
        });
        
        setLoading(false);

      } catch (error) {
        console.error("Error Fetching:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="dashboard-page luxury-theme">
      <motion.div 
        className="dashboard-content"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        
        {/* ALERT SECTION */}
        <motion.div className="security-alert-gold" variants={fadeInUp}>
          <FaShieldAlt className="gold-text" />
          <div className="alert-text">
            <span className="gold-label">PROTEKSI SISTEM AKTIF:</span> 
            Halo {loading ? "..." : profile.name}, terminal aman. <Link to="/settings" className="gold-link">Konfigurasi</Link>
          </div>
        </motion.div>

        {/* HERO GRID */}
        <div className="hero-grid-modern">
          
          {/* KARTU PROFIL (DATA ASLI DARI DB) */}
          <motion.div className="card-lux profile-card-pos" variants={fadeInUp} whileHover={{ y: -5 }}>
            <div className="card-accent-line"></div>
            
            <Link to="/settings" className="cog-icon-top-right">
                <FaCog className="cog-icon-rotate" />
            </Link>

            <div className="profile-flex">
              {/* AVATAR */}
              <div className="avatar-wrapper">
                {loading ? (
                  <div className="skeleton-avatar"></div>
                ) : (
                  <div className="avatar-gold">{profile.initial}</div>
                )}
              </div>

              {/* USER META */}
              <div className="user-meta">
                <div className="name-row">
                  {loading ? (
                    <div className="skeleton-text name"></div>
                  ) : (
                    <h4>{profile.name}</h4>
                  )}
                </div>

                {/* STATUS MEMBER (Hardcode Basic dulu karena di DB gak ada kolom status) */}
                {loading ? (
                   <div className="skeleton-text badge"></div>
                ) : (
                   profile.isPremium ? (
                    <div className="badge-premium">
                      <FaCrown /> PREMIUM MEMBER
                    </div>
                   ) : (
                    <div className="badge-basic">
                      <FaUser /> MEMBER
                    </div>
                   )
                )}

                <div className="phone-info">
                  {loading ? (
                    <div className="skeleton-text phone"></div>
                  ) : (
                    <>
                      <FaPhoneAlt size={10} /> {profile.phone}
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* KARTU PESAN MASUK */}
          <motion.div className="card-lux" variants={fadeInUp} whileHover={{ y: -5 }}>
            <div className="card-accent-line"></div>
            <div className="inbox-header">
              <div className="inbox-title">
                <FaEnvelopeOpenText className="gold-text" /> 
                <span>Email & Pesan</span>
              </div>
              <button className="btn-view-all">LIHAT SEMUA</button>
            </div>
            <div className="inbox-body">
              <div className="empty-inbox-state">
                <div className="icon-bg">
                   <FaEnvelopeOpenText className="gold-dim" size={30} />
                </div>
                <p className="text-dim">
                  {loading ? "Memuat..." : `Email terdaftar: ${profile.email || "Tidak ada"}`}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* TRANSAKSI SECTION */}
        <motion.h3 className="section-title-lux" variants={fadeInUp}>TRANSAKSI HARI INI</motion.h3>
        
        <motion.div className="stats-row-single" variants={fadeInUp}>
          <div className="stat-box-lux-large">
            <p className="stat-label">TOTAL TRANSAKSI</p>
            <motion.h2 className="gold-text-large">0</motion.h2>
          </div>
        </motion.div>

        <motion.div className="status-grid-lux" variants={fadeInUp}>
          {['Menunggu', 'Proses', 'Sukses', 'Gagal'].map((label, i) => (
            <motion.div key={i} className={`status-pill ${label.toLowerCase()}`}>
                <strong>0</strong> <span>{label}</span>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
      <Footer />
    </div>
  );
}