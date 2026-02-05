import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion as Motion} from "framer-motion"; // Library Animasi
import { FaCheckCircle, FaHome, FaCopy, FaSpinner, FaGamepad, FaBoxOpen } from "react-icons/fa"; // Library Icon
import toast, { Toaster } from "react-hot-toast"; // Library Notifikasi
import "./selesai.css";

export default function Selesai() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  // Ambil parameter invoice dari URL
  const ref = params.get("ref");
  const [trx, setTrx] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!ref) return;

    // --- LOGIC FETCH DATA (ASLI) ---
    axios
      .get(`http://127.0.0.1:8000/api/transaction/ref/${ref}`)
      .then((res) => setTrx(res.data.data))
      .catch(() => {
        // Jika gagal fetch, set error state (jangan langsung navigate biar smooth)
        setError(true);
        toast.error("Gagal mengambil data transaksi");
      });
  }, [ref]);

  // --- FITUR COPY INVOICE ---
  const handleCopy = () => {
    if (trx?.invoice) {
      navigator.clipboard.writeText(trx.invoice);
      toast.success("Invoice berhasil disalin!");
    }
  };

  // 1. STATE: PARAMETER TIDAK ADA / ERROR
  if (!ref || error) {
    return (
      <div className="selesai-container">
        <Motion.div 
            className="selesai-card error-state"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
        >
          <h2>Data Tidak Ditemukan</h2>
          <p className="sub-message">Mohon periksa kembali link atau transaksi Anda.</p>
          <button className="btn-retry" onClick={() => navigate("/")}>
             Kembali ke Beranda
          </button>
        </Motion.div>
      </div>
    );
  }

  // 2. STATE: LOADING (BELUM ADA DATA)
  if (!trx) {
    return (
      <div className="selesai-container">
        <div className="loading-state">
           <FaSpinner className="spin" />
           <p>Memuat detail transaksi...</p>
        </div>
      </div>
    );
  }

  // 3. STATE: SUKSES (DATA ADA)
  return (
    <div className="selesai-container">
      <Toaster position="top-center" reverseOrder={false} />
      
      <Motion.div 
        className="selesai-card"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        
        {/* Header Icon Animasi */}
        <div className="success-header">
            <Motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
                <FaCheckCircle className="icon-success-animate" />
            </Motion.div>
            <h2>Pembayaran Berhasil</h2>
            <p className="sub-message">Terima kasih, pesanan Anda sedang diproses.</p>
        </div>

        {/* Box Detail Transaksi */}
        <div className="summary-box">
            
            {/* Invoice Copyable */}
            <div className="row">
                <span className="label">Invoice</span>
                <div className="value copy-wrapper" onClick={handleCopy}>
                    {trx.invoice} <FaCopy className="copy-icon"/>
                </div>
            </div>

            {/* Status Badge */}
            <div className="row">
                <span className="label">Status</span>
                <span className={`status-badge ${trx.status === 'PAID' || trx.status === 'SUCCESS' ? 'status-success' : 'status-pending'}`}>
                    {trx.status}
                </span>
            </div>

            <hr className="divider"/>

            {/* Detail Game */}
            <div className="row">
                <span className="label"><FaGamepad/> Game</span>
                <span className="value">{trx.game}</span>
            </div>

            <div className="row">
                <span className="label"><FaBoxOpen/> Paket</span>
                <span className="value">{trx.package}</span>
            </div>

            {/* Detail User */}
            <div className="row">
                <span className="label">User ID</span>
                <span className="value">{trx.player_id}</span>
            </div>
            
            {trx.email && (
                <div className="row">
                    <span className="label">Email</span>
                    <span className="value" style={{fontSize: '0.85rem'}}>{trx.email}</span>
                </div>
            )}

            <hr className="divider"/>

            {/* Total Harga */}
            <div className="row">
                <span className="label">Total Bayar</span>
                <span className="value total-price">
                    Rp {Number(trx.amount).toLocaleString("id-ID")}
                </span>
            </div>
        </div>

        {/* Tombol Home */}
        <button className="btn-home" onClick={() => navigate("/")}>
          <FaHome /> Kembali ke Home
        </button>

      </Motion.div>
    </div>
  );
}