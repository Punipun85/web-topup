import React from "react";
import { Link } from "react-router-dom"; // Import Link untuk navigasi
import Navbar from "../../navbar/navbar";
import Footer from "../../footer/footer";
import Sidebar from "../../sidebar/sidebar";
import { FaHeadset, FaCog, FaChartBar } from "react-icons/fa"; 
import "../styles/dashboard.css";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="dashboard-page">
        <Sidebar />

        <div className="dashboard-content">
          
          {/* ALERT SECTION */}
          <div className="security-alert">
            <div className="alert-content">
              <h3>Tingkatkan keamanan!</h3>
              {/* Menggunakan Link untuk navigasi ke /settings */}
              <p>
                Klik <Link to="/settings" style={{ color: 'inherit', fontWeight: 'bold' }}>disini</Link> untuk melakukan pengaturan!
              </p>
            </div>
            <div className="shield-icon">🛡️</div>
          </div>

          {/* HERO SECTION (PROFILE & COIN) */}
          <div className="hero-grid">
            
            {/* CARD 1: USER PROFILE */}
            <div className="card profile-card">
              <div className="profile-details">
                <div className="avatar">D</div>
                <div className="info">
                  <div className="name-row">
                    <h4>Djenar priya asoka</h4>
                    {/* Gear icon juga biasanya diarahkan ke settings */}
                    <Link to="/settings" style={{ color: 'inherit' }}>
                      <FaCog className="settings-icon" />
                    </Link>
                  </div>
                  <span className="badge-member">Member</span>
                </div>
              </div>
              <div className="profile-footer">
                <p className="phone">📞 +62 817 7944 7038</p>
              </div>
            </div>

            {/* CARD 2: COINPEDIA */}
            <div className="card coin-card">
              <div className="coin-header">
                <div className="coin-title">
                  <span className="coin-icon-sm">A6</span> Asixcoin
                </div>
                <div className="coin-actions">
                  <button className="btn-topup">Top Up</button>
                  <button className="btn-redeem">Redeem</button>
                </div>
              </div>
              <div className="coin-balance">
                <h2>0 <span>ASIXCOIN</span> <small>IDR</small></h2>
              </div>
            </div>
          </div>

          {/* STATS SECTION */}
          <h3 className="section-title">Transaksi Hari Ini</h3>
          <div className="stats-grid">
            <div className="stat-box dark">
              <h3>0</h3>
              <span>Total Transaksi</span>
            </div>
            <div className="stat-box dark">
              <h3>0</h3>
              <span>Total Penjualan</span>
            </div>
          </div>
          
          <div className="process-stats-grid">
             <div className="p-stat yellow">
                <h1>0</h1>
                <span>Menunggu</span>
             </div>
             <div className="p-stat blue">
                <h1>0</h1>
                <span>Dalam Proses</span>
             </div>
             <div className="p-stat green">
                <h1>0</h1>
                <span>Sukses</span>
             </div>
             <div className="p-stat red">
                <h1>0</h1>
                <span>Gagal</span>
             </div>
          </div>


          {/* TABLE SECTION */}
          <div className="table-section">
            <div className="table-header">
                <h3>Riwayat Transaksi Terbaru Hari Ini</h3>
            </div>
            <div className="table-responsive">
                <table>
                <thead>
                    <tr>
                    <th>Nomor Invoice</th>
                    <th>ID Trx</th>
                    <th>Item</th>
                    <th>User Input</th>
                    <th>Harga</th>
                    <th>Tanggal</th>
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td colSpan="7" className="empty-state">
                        <div className="empty-content">
                            <FaChartBar size={40} style={{opacity: 0.3, marginBottom: '10px'}}/>
                            <h4>Data tidak ditemukan!</h4>
                            <p>Tidak ada aktifitasi data.</p>
                        </div>
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>

      {/* FLOAT CS */}
      <div className="customer-service-float">
        <FaHeadset />
        <span>CUSTOMER SERVICE</span>
      </div>

      <Footer />
    </>
  );
}