import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import { FaHeadset, FaCog, FaChartBar, FaUser } from "react-icons/fa"; 
import "./profile.css";

// ✅ URL Backend Laravel
const API_BASE_URL = "http://127.0.0.1:8000/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // State Profile
  const [profile, setProfile] = useState({
    name: "",
    email: "", 
    phone: "-", 
    level: "Member",
    avatar: ""
  });

  // State Stats
  const [stats, setStats] = useState({
    total_trx: 0,
    total_sales: 0,
    pending: 0,
    process: 0,
    success: 0,
    failed: 0
  });

  // State Transaksi
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login"); 
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        // Request ke Backend
        const [resUser, resStats, resTrx] = await Promise.all([
            axios.get(`${API_BASE_URL}/user/profile`, config),
            axios.get(`${API_BASE_URL}/user/stats`, config),
            axios.get(`${API_BASE_URL}/transaction/history`, config)
        ]);

        // Set Profile
        const userData = resUser.data.data;
        setProfile({
            name: userData.name || "User", 
            email: userData.email || "-", 
            phone: userData.no_hp || userData.phone || "-", // Handle beda nama kolom
            level: userData.role || "Member",
            avatar: userData.avatar || ""
        });

        // Set Stats
        if(resStats.data) setStats(resStats.data.data);

        // Set Transaksi
        if(resTrx.data) setTransactions(resTrx.data.data);
        
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // --- Helpers ---
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(number);
  };

  const formatDate = (dateString) => {
    if(!dateString) return "-";
    const options = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const getStatusBadge = (status) => {
    if(!status) return <span>-</span>;
    switch (status.toLowerCase()) {
        case 'sukses': case 'success': return <span className="badge-status success">Sukses</span>;
        case 'pending': return <span className="badge-status pending">Pending</span>;
        case 'processing': case 'process': return <span className="badge-status process">Proses</span>;
        case 'gagal': case 'failed': return <span className="badge-status failed">Gagal</span>;
        default: return <span className="badge-status default">{status}</span>;
    }
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <>
      <div className="dashboard-page">
        <div className="dashboard-content">
          
          {/* --- HERO SECTION: MODERN PROFILE CARD --- */}
          <div className="profile-card-container">
            <div className="modern-profile-card">
              
              <div className="card-content-wrapper">
                {/* Avatar Section */}
                <div className="avatar-container">
                  <div className="avatar-box">
                    {loading ? "..." : getInitial(profile.name)}
                  </div>
                </div>

                {/* User Info Section */}
                <div className="user-details">
                  <p className="welcome-text">Selamat Datang Kembali,</p>
                  <h2 className="user-name">{loading ? "Memuat..." : profile.name}</h2>
                  
                  <div className="badge-premium">
                    <FaHeadset size={12} />
                    <span>{profile.level}</span>
                  </div>

                  <div className="contact-info">
                     <div className="contact-item">
                        <span>📧 {loading ? "..." : profile.email}</span>
                     </div>
                     <div className="contact-item">
                        <span>📱 {loading ? "..." : profile.phone}</span>
                     </div>
                  </div>
                </div>
              </div>

              {/* Action Button Section */}
              <Link to="/settings" className="btn-edit-profile">
                <FaCog className={loading ? "icon-spin" : ""} />
                <span>Edit Profile</span>
              </Link>

            </div>
          </div>

          {/* --- STATS SECTION --- */}
          <h3 className="section-title">Ringkasan Penjualan</h3>
          <div className="stats-grid">
            <div className="stat-box dark">
              <h3>{loading ? 0 : stats.total_trx}</h3>
              <span>Total Transaksi</span>
            </div>
            <div className="stat-box dark">
              <h3>{loading ? "Rp 0" : formatRupiah(stats.total_sales)}</h3>
              <span>Total Penjualan</span>
            </div>
          </div>
          
          <div className="process-stats-grid">
             <div className="p-stat yellow">
                <h1>{loading ? 0 : stats.pending}</h1>
                <span>Menunggu</span>
             </div>
             <div className="p-stat blue">
                <h1>{loading ? 0 : stats.process}</h1>
                <span>Dalam Proses</span>
             </div>
             <div className="p-stat green">
                <h1>{loading ? 0 : stats.success}</h1>
                <span>Sukses</span>
             </div>
             <div className="p-stat red">
                <h1>{loading ? 0 : stats.failed}</h1>
                <span>Gagal</span>
             </div>
          </div>

          {/* --- TABLE SECTION --- */}
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
                    {loading ? (
                        <tr><td colSpan="7" style={{textAlign: "center", padding: "40px"}}>Sedang memuat data...</td></tr>
                    ) : transactions.length > 0 ? (
                        transactions.map((trx, index) => (
                            <tr key={index}>
                                <td>{trx.invoice_number || trx.invoice || "-"}</td>
                                <td>{trx.trx_id || "-"}</td>
                                <td>{trx.item_name || "-"}</td>
                                <td>{trx.target_id || trx.target || "-"}</td>
                                <td>{formatRupiah(trx.price || 0)}</td>
                                <td>{formatDate(trx.created_at)}</td>
                                <td>{getStatusBadge(trx.status)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="empty-state">
                                <div className="empty-content">
                                    <FaChartBar size={40} style={{opacity: 0.3, marginBottom: '10px'}}/>
                                    <h4>Data tidak ditemukan!</h4>
                                    <p>Belum ada riwayat transaksi.</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
      
      // ... di dalam file Dashboard.jsx ...

{/* ... kode sebelumnya ... */}
<div className="profile-card-container">
  <div className="modern-profile-card">
    
    <div className="card-content-wrapper">
      {/* ... (Avatar & User Info tetap sama) ... */}
      <div className="avatar-container">
        {/* ... */}
      </div>
      <div className="user-details">
        {/* ... */}
      </div>
    </div>

    {/* === 🌟 TAMBAHAN BARU: WIDGET LEVEL & PROGRESS 🌟 === */}
    <div className="level-progress-widget">
      <div className="widget-glow"></div> {/* Efek cahaya latar */}
      
      <div className="level-header">
        <span className="level-label">Current Level</span>
        <div className="level-number">
          <span className="lvl-text">LVL.</span>
          <span className="lvl-value">5</span> {/* Nanti bisa dibuat dinamis */}
        </div>
      </div>

      <div className="progress-container">
        <div className="progress-bar-bg">
          {/* Ubah width untuk mengatur progres (misal 65%) */}
          <div className="progress-bar-fill" style={{ width: '65%' }}>
            <div className="progress-glow"></div>
          </div>
        </div>
      </div>

          <div className="xp-details">
            <span>6,500 / 10,000 XP</span>
            <span className="xp-to-go">3,500 XP to Level 6</span>
          </div>
        </div>
        {/* ===================================================== */}

        {/* Action Button Section (Tetap di kanan) */}
        <Link to="/settings" className="btn-edit-profile">
          <FaCog className={loading ? "icon-spin" : ""} />
          <span>Edit Profile</span>
        </Link>

      </div>
    </div>
    {/* ... kode setelahnya ... */}
    </>
  );
}