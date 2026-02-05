import React from "react";
import { NavLink, useLocation } from "react-router-dom"; 
import Navbar from "../../navbar/navbar";
import Footer from "../../footer/footer";
import Sidebar from "../../sidebar/sidebar";
import { FaHeadset } from "react-icons/fa";
import "../styles/afiliasi.css";

export default function Afiliasi() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <div className="dashboard-page">
        <Sidebar />
        <div className="dashboard-content">
          <div className="header-section">
            <h2>Afiliasi</h2>
            <p>Kelola program afiliasi dan pantau pendapatan Anda di sini.</p>
          </div>

          <div className="affiliate-tabs">
            <NavLink 
              to="/afiliasi" 
              className={({ isActive }) => `tab-btn ${isActive && location.pathname === "/afiliasi" ? "active" : ""}`}
              end
            >
              Riwayat
            </NavLink>
            <NavLink 
              to="/afiliasi/settlement" 
              className={({ isActive }) => `tab-btn ${isActive ? "active" : ""}`}
            >
              Pembayaran
            </NavLink>
          </div>

          {/* Konten Khusus Riwayat */}
          <div className="affiliate-container card">
            <div className="alert-box">
              <p>Kamu belum terdaftar sebagai affiliate. Silahkan hubungi admin untuk informasi lebih lanjut.</p>
            </div>
            <div className="help-section">
              <span>Butuh Bantuan? </span>
              <a href="#" className="help-link">Hubungi Kami</a>
            </div>
          </div>
        </div>
      </div>
      <div className="customer-service-float"><FaHeadset /><span>CUSTOMER SERVICE</span></div>
      <Footer />
    </>
  );
}