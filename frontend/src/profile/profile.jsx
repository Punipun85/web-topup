import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import {
  FaCog,
  FaShieldAlt,
  FaPhoneAlt,
  FaCrown,
  FaEnvelopeOpenText,
  FaUser,
} from "react-icons/fa";
import "./profile.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Dashboard() {
  const navigate = useNavigate();

  // =========================
  // STATE
  // =========================
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    email: "",
    isPremium: false,
    initial: "?",
  });

  const [transactions, setTransactions] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingTx, setLoadingTx] = useState(true);
  const lastTx = transactions.length > 0 ? transactions[0] : null;

  const token = localStorage.getItem("token");

  // =========================
  // FETCH PROFILE
  // =========================
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Gagal mengambil profil");

        const data = await res.json();

        setProfile({
          name: data.username || data.name,
          phone: data.phone || "-",
          email: data.email,
          isPremium: false,
          initial: (data.username || data.name || "U")
            .charAt(0)
            .toUpperCase(),
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [navigate, token]);

  // =========================
  // FETCH TRANSACTIONS
  // =========================
  useEffect(() => {
    if (!token) return;

    const fetchTransactions = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/account/transactions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Gagal mengambil transaksi");

        const data = await res.json();

        // 🔥 FILTER HARI INI
        const today = new Date().toISOString().slice(0, 10);
        const todayTx = data.filter(
          (t) => t.created_at.slice(0, 10) === today
        );

        setTransactions(todayTx);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingTx(false);
      }
    };

    fetchTransactions();
  }, [token]);

  // =========================
  // STATISTICS
  // =========================
  const totalTransaksi = transactions.length;

  const statusCount = {
    pending: transactions.filter((t) => t.status === "pending").length,
    process: transactions.filter((t) => t.status === "process").length,
    success: transactions.filter((t) => t.status === "success").length,
    failed: transactions.filter((t) => t.status === "failed").length,
  };

  // =========================
  // RENDER
  // =========================
  return (
    <div className="dashboard-page luxury-theme">
      <Motion.div
        className="dashboard-content"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* ALERT */}
        <Motion.div className="security-alert-gold" variants={fadeInUp}>
          <FaShieldAlt className="gold-text" />
          <div className="alert-text">
            <span className="gold-label">PROTEKSI SISTEM AKTIF:</span>{" "}
            {loadingProfile ? "Memuat..." : `Halo ${profile.name}, terminal aman.`}
            <Link to="/settings" className="gold-link">
              {" "}
              Konfigurasi
            </Link>
          </div>
        </Motion.div>

        {/* PROFILE + EMAIL */}
        <div className="hero-grid-modern">
          <Motion.div
            className="card-lux profile-card-pos"
            variants={fadeInUp}
            whileHover={{ y: -5 }}
          >
            <div className="card-accent-line"></div>

            <Link to="/settings" className="cog-icon-top-right">
              <FaCog />
            </Link>

            <div className="profile-flex">
              <div className="avatar-wrapper">
                <div className="avatar-gold">
                  {loadingProfile ? "…" : profile.initial}
                </div>
              </div>

              <div className="user-meta">
                <h4>{loadingProfile ? "…" : profile.name}</h4>

                {profile.isPremium ? (
                  <div className="badge-premium">
                    <FaCrown /> PREMIUM
                  </div>
                ) : (
                  <div className="badge-basic">
                    <FaUser /> MEMBER
                  </div>
                )}

                <div className="phone-info">
                  <FaPhoneAlt size={10} /> {profile.phone}
                </div>
              </div>
            </div>
          </Motion.div>

        <Motion.div
  className="card-lux"
  variants={fadeInUp}
  whileHover={{ y: -5 }}
>
  <div className="card-accent-line"></div>

  <div className="inbox-header">
    <div className="inbox-title">
      <FaEnvelopeOpenText className="gold-text" />
      <span>Email & Pesan</span>
    </div>

    {/* tombol utama */}
    <Link to="/transactions" className="btn-view-all">
      LIHAT SEMUA
    </Link>
  </div>

  <div className="inbox-body">
    <div className="empty-inbox-state">
      <div className="icon-bg">
        <FaEnvelopeOpenText className="gold-dim" size={30} />
      </div>

      {/* PREVIEW NOTIF */}
      {loadingTx ? (
        <p className="text-dim">Memuat notifikasi…</p>
      ) : lastTx ? (
        <>
          <p className="text-dim">
            Invoice <b>{lastTx.invoice_id}</b>
          </p>
          <p className="text-dim">
            Status:{" "}
            <span className={`status-text ${lastTx.status}`}>
              {lastTx.status.toUpperCase()}
            </span>
          </p>
        </>
      ) : (
        <p className="text-dim">
          Belum ada notifikasi transaksi
        </p>
      )}
    </div>
  </div>
</Motion.div>
        </div>

        {/* TRANSAKSI */}
        <Motion.h3 className="section-title-lux" variants={fadeInUp}>
          TRANSAKSI HARI INI
        </Motion.h3>

        <Motion.div className="stats-row-single" variants={fadeInUp}>
          <div className="stat-box-lux-large">
            <p className="stat-label">TOTAL TRANSAKSI</p>
            <Motion.h2 className="gold-text-large">
              {loadingTx ? "…" : totalTransaksi}
            </Motion.h2>
          </div>
        </Motion.div>

        <Motion.div className="status-grid-lux" variants={fadeInUp}>
          {[
            { key: "pending", label: "Menunggu" },
            { key: "process", label: "Proses" },
            { key: "success", label: "Sukses" },
            { key: "failed", label: "Gagal" },
          ].map((item, i) => (
            <div key={i} className={`status-pill ${item.key}`}>
              <strong>{loadingTx ? "…" : statusCount[item.key]}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </Motion.div>
      </Motion.div>
    </div>
  );
}
