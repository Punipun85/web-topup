import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import { FaHeadset, FaCog, FaChartBar, FaUserCircle } from "react-icons/fa"; 
import "./profile.css"; // Pastikan file CSS ini ada (lihat di bawah)

// ✅ Konfigurasi URL Backend
const API_BASE_URL = "http://127.0.0.1:8000/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // --- STATE DATA (Diberi nilai awal agar tidak crash) ---
  const [profile, setProfile] = useState({
    name: "Loading...", 
    email: "-", 
    phone: "-", 
    role_label: "Member", 
    avatar: ""
  });

  const [stats, setStats] = useState({
    total_trx: 0, total_sales: 0, pending: 0, process: 0, success: 0, failed: 0
  });

  const [transactions, setTransactions] = useState([]);

  // State Level Gamifikasi
  const [gameStats, setGameStats] = useState({
    currentLevel: 1, currentXP: 0, nextLevelXP: 100000, progressPercent: 0
  });

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // 1. Cek Token
        if (!token) {
          navigate("/login"); 
          return;
        }

        const config = { headers: { Authorization: `Bearer ${token}` } };

        // 2. Request Paralel (Lebih Cepat)
        const [resUser, resStats, resTrx] = await Promise.all([
            axios.get(`${API_BASE_URL}/user/profile`, config),
            axios.get(`${API_BASE_URL}/user/stats`, config),
            axios.get(`${API_BASE_URL}/transaction/history`, config)
        ]);

        // 3. Set Profile Data (Safe Guarding)
        const userData = resUser.data.data || resUser.data; 
        if (userData) {
            setProfile({
                name: userData.name || "User Tanpa Nama", 
                email: userData.email || "-", 
                phone: userData.no_hp || userData.phone || "-",
                role_label: userData.role || "Member",
                avatar: userData.avatar || ""
            });
        }

        // 4. Set Stats & Hitung Level
        const dataStats = resStats.data.data || resStats.data;
        if(dataStats) {
            setStats(dataStats);
            calculateLevel(dataStats.total_sales); // Hitung level
        }

        // 5. Set Riwayat Transaksi
        const dataTrx = resTrx.data.data || resTrx.data;
        setTransactions(Array.isArray(dataTrx) ? dataTrx : []);

      } catch (error) {
        console.error("Error Fetching Data:", error);
        
        // --- AUTO LOGOUT JIKA 401 ---
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

  // --- LOGIKA LEVELING ---
  const calculateLevel = (totalSales) => {
    const xp = parseInt(totalSales) || 0;
    let level = 1;
    let target = 100000; 

    // Tier Level
    if (xp >= 10000000) { level = 5; target = 20000000; }
    else if (xp >= 5000000) { level = 4; target = 10000000; }
    else if (xp >= 2500000) { level = 3; target = 5000000; }
    else if (xp >= 1000000) { level = 2; target = 2500000; }
    
    // Hitung Persentase Bar
    let percent = (xp / target) * 100;
    if(percent > 100) percent = 100;

    setGameStats({
        currentLevel: level,
        currentXP: xp,
        nextLevelXP: target,
        progressPercent: percent
    });
  };

  // --- FORMATTERS ---
  const formatRupiah = (num) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
  const formatNumber = (num) => new Intl.NumberFormat("id-ID").format(num);
  const formatDate = (date) => date ? new Date(date).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : "-";
  
  const getStatusBadge = (status) => {
    const s = status ? status.toLowerCase() : "";
    if (s === 'sukses' || s === 'success') return <span className="badge success">Sukses</span>;
    if (s === 'pending') return <span className="badge pending">Pending</span>;
    if (s === 'failed' || s === 'gagal') return <span className="badge failed">Gagal</span>;
    return <span className="badge process">{status}</span>;
  };

  if (loading) return <div className="loading-screen">Sedang memuat data...</div>;

  return (
    <div className="dashboard-container">
      {/* HEADER PROFILE */}
      <div className="profile-header-card">
        <div className="profile-content">
            <div className="avatar-area">
                <div className="avatar-circle">
                    {profile.name.charAt(0).toUpperCase()}
                </div>
            </div>
            <div className="info-area">
                <h4>Selamat Datang,</h4>
                <h2>{profile?.name}</h2>
                <span className="role-badge"><FaHeadset/> {profile?.role_label}</span>
                <div className="contact-small">
                    <small>{profile?.email} • {profile?.phone}</small>
                </div>
            </div>
            <div className="action-area">
                <Link to="/settings" className="btn-edit"><FaCog/> Edit</Link>
            </div>
        </div>

        {/* GAMIFICATION BAR */}
        <div className="xp-container">
            <div className="xp-header">
                <span>Level {gameStats.currentLevel}</span>
                <span>{formatNumber(gameStats.currentXP)} / {formatNumber(gameStats.nextLevelXP)} XP</span>
            </div>
            <div className="xp-bar-bg">
                <div className="xp-bar-fill" style={{ width: `${gameStats.progressPercent}%` }}></div>
            </div>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="stats-grid">
        <div className="card-stat dark">
            <h3>Total Transaksi</h3>
            <h1>{stats.total_trx}</h1>
        </div>
        <div className="card-stat dark">
            <h3>Total Pengeluaran</h3>
            <h1>{formatRupiah(stats.total_sales)}</h1>
        </div>
      </div>

      <div className="status-grid">
        <div className="stat-item yellow"><h3>{stats.pending}</h3><small>Pending</small></div>
        <div className="stat-item blue"><h3>{stats.process}</h3><small>Proses</small></div>
        <div className="stat-item green"><h3>{stats.success}</h3><small>Sukses</small></div>
        <div className="stat-item red"><h3>{stats.failed}</h3><small>Gagal</small></div>
      </div>

      {/* TRANSACTION TABLE */}
      <div className="table-wrapper">
        <h3>Riwayat Transaksi Terakhir</h3>
        <div className="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>Invoice</th>
                        <th>Produk</th>
                        <th>Tujuan</th>
                        <th>Harga</th>
                        <th>Status</th>
                        <th>Tanggal</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? (
                        transactions.map((trx, i) => (
                            <tr key={i}>
                                <td>#{trx.invoice_number || trx.id}</td>
                                <td>{trx.item_name || "Produk Digital"}</td>
                                <td>{trx.target_id || trx.target}</td>
                                <td>{formatRupiah(trx.price)}</td>
                                <td>{getStatusBadge(trx.status)}</td>
                                <td>{formatDate(trx.created_at)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">Belum ada transaksi</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}