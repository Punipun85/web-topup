import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import Navbar from "../../navbar/navbar";
import Footer from "../../footer/footer";
import Sidebar from "../../sidebar/sidebar";
import { FaHeadset, FaArrowLeft } from "react-icons/fa";
import "../styles/settings.css";

export default function Settings() {
  const navigate = useNavigate(); // 2. Inisialisasi navigasi

  // State untuk form
  const [profile, setProfile] = useState({
    name: "Djenar priya asoka",
    username: "Djenar",
    email: "djenarpriyaasoka@gmail.com",
    phone: "81779447038"
  });

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    console.log("Mengirim data ke backend:", profile);
    alert("Profil diperbarui (Simulasi Backend)");
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-page">
        <Sidebar />
        <div className="dashboard-content">
          
          {/* 3. Tambahkan onClick untuk kembali ke dashboard */}
          <button 
            className="btn-back-dashboard" 
            onClick={() => navigate("/dashboard")}
          >
            <FaArrowLeft /> Dashboard
          </button>

          {/* SECTION 1: PROFIL */}
          <section className="settings-section">
            <h3>Profil</h3>
            <p className="section-desc">Informasi ini bersifat rahasia, jadi berhati-hatilah dengan apa yang kamu bagikan.</p>
            
            <form onSubmit={handleUpdateProfile} className="settings-grid">
              <div className="settings-group">
                <label>Nama kamu</label>
                <input type="text" className="settings-input" defaultValue={profile.name} />
              </div>
              <div className="settings-group">
                <label>Username</label>
                <input type="text" className="settings-input" defaultValue={profile.username} />
              </div>
              <div className="settings-group">
                <label>Alamat Email</label>
                <input type="email" className="settings-input" defaultValue={profile.email} />
              </div>
              <div className="settings-group">
                <label>No. Handphone</label>
                <div className="phone-input-wrapper">
                  <div className="country-code">🇮🇩</div>
                  <input type="text" className="settings-input" defaultValue={profile.phone} />
                </div>
              </div>
              <button type="submit" className="btn-yellow">Ubah Profil</button>
            </form>
          </section>

          <hr className="settings-divider" />

          {/* SECTION 2: UBAH KATA SANDI */}
          <section className="settings-section">
            <h3>Ubah Kata Sandi</h3>
            <p className="section-desc">Pastikan kamu mengingat kata sandi baru kamu sebelum mengubahnya.</p>
            
            <div className="settings-group full-width">
              <label>Kata Sandi Saat Ini</label>
              <input type="password" placeholder="Kata Sandi Saat Ini" className="settings-input" />
            </div>
            <div className="settings-grid">
              <div className="settings-group">
                <label>Kata Sandi Baru</label>
                <input type="password" placeholder="Kata Sandi Baru" className="settings-input" />
              </div>
              <div className="settings-group">
                <label>Konfirmasi Kata Sandi Baru</label>
                <input type="password" placeholder="Konfirmasi Kata Sandi Baru" className="settings-input" />
              </div>
              <button className="btn-yellow">Ubah Kata Sandi</button>
            </div>
          </section>

          <hr className="settings-divider" />

          {/* SECTION 3: 2FA */}
          <section className="settings-section">
            <h3>Two Factor Authentication</h3>
            <p className="section-desc">Informasi ini bersifat rahasia, jadi berhati-hatilah dengan apa yang kamu bagikan.</p>
            <p className="alert-text">Kamu belum mengaktifkan Two Factor Authentication</p>
            <p className="section-info">
              Ketika Two Factor Authentication, kamu akan diminta untuk token acak yang aman selama autentikasi. 
              Kamu dapat mendapatkan token ini dari aplikasi Google Authenticator atau aplikasi yang serupa di HP kamu.
            </p>
            <button className="btn-yellow">Aktifkan</button>
          </section>

          <hr className="settings-divider" />

          {/* SECTION 4: HUBUNGKAN AKUN */}
          <section className="settings-section">
            <h3>Hubungkan akun</h3>
            <p className="section-desc">Hubungkan akun dengan beberapa provider dibawah untuk kemudahan autentikasi.</p>
            <div className="google-connect-card">
              <div className="google-info">
                <img src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" alt="Google" width="20" />
                <span>Google</span>
              </div>
              <div className="toggle-switch active"></div>
            </div>
          </section>

          <hr className="settings-divider" />

          {/* SECTION 5: KELOLA AKSES */}
          <section className="settings-section">
            <h3>Kelola Akses dan Perangkat</h3>
            <p className="section-desc">Perangkat yang login ini baru-baru ini aktif di akun ini. Kamu dapat keluar dari perangkat yang tidak dikenal atau ubah kata sandimu untuk keamanan tambahan.</p>
            
            <div className="devices-grid">
              <div className="device-card">
                <div className="device-header">
                  <span>💻 Windows - Chrome</span>
                  <button className="btn-signout">Sign out</button>
                </div>
                <div className="device-details">
                  <p>🌐 ID - Surakarta</p>
                  <p>👤 103.126.87.67</p>
                  <p>📅 31/12/2025 19:36:03</p>
                </div>
              </div>
              <div className="device-card">
                <div className="device-header">
                  <span>💻 Windows - Chrome</span>
                  <span className="current-badge">Current Device</span>
                </div>
                <div className="device-details">
                  <p>🌐 ID - Surakarta</p>
                  <p>👤 103.126.87.67</p>
                  <p>📅 01/01/2026 20:00:04</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="customer-service-float">
        <FaHeadset />
        <span>CUSTOMER SERVICE</span>
      </div>
      <Footer />
    </>
  );
}