import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle, FaCopy, FaSpinner, FaGamepad, FaBoxOpen, FaUniversity, FaStore, FaMobileAlt } from "react-icons/fa";
import { MdQrCodeScanner } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import "./checkout.css";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  // --- HARD GUARD ---
  if (!state || !state.order || !state.payment) {
    return (
      <div className="checkout-container">
        <div className="checkout-error">
          <h3>Data Checkout Tidak Valid</h3>
          <button className="btn-error-back" onClick={() => navigate("/")}>Kembali ke Beranda</button>
        </div>
      </div>
    );
  }

  const { order, payment, game, product } = state;
  const amount = Number(order.amount || 0);

  // --- LOGIC DETEKSI TIPE ---
  const paymentCode = payment.code?.toUpperCase() || "";
  const isQRIS = paymentCode.includes("QRIS");
  const isVA = paymentCode.includes("VA") || paymentCode.includes("BANK");
  const isRetail = paymentCode.includes("ALFA") || paymentCode.includes("INDO");
  const isEwallet = !isQRIS && !isVA && !isRetail;

  // --- 🌟 LOGIC LOGO BANK OTOMATIS 🌟 ---
  // Fungsi ini mengembalikan URL Logo berdasarkan nama bank di payment.name
  const getBankLogo = (paymentName) => {
    const name = paymentName.toUpperCase();

    // Ganti URL ini dengan file lokal Anda nanti (misal: /images/bca.png)
    if (name.includes("BCA")) return "https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg";
    if (name.includes("MANDIRI")) return "https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg";
    if (name.includes("BRI")) return "https://upload.wikimedia.org/wikipedia/commons/6/68/BANK_BRI_logo.svg";
    if (name.includes("BNI")) return "https://upload.wikimedia.org/wikipedia/id/5/55/BNI_logo.svg";
    if (name.includes("CIMB")) return "https://upload.wikimedia.org/wikipedia/commons/b/bc/CIMB_Niaga_logo.svg";
    if (name.includes("PERMATA")) return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/PermataBank_logo.svg/1200px-PermataBank_logo.svg.png";
    if (name.includes("ALFA")) return "https://upload.wikimedia.org/wikipedia/commons/8/86/Alfamart_logo.svg";
    if (name.includes("INDO")) return "https://upload.wikimedia.org/wikipedia/commons/9/9d/Logo_Indomaret.png";
    
    return null; // Jika tidak ada logo yang cocok, return null
  };

  const bankLogoUrl = getBankLogo(payment.name || paymentCode);

  // --- FUNGSI COPY ---
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} berhasil disalin!`);
  };

  // --- LOGIC BAYAR ---
  // --- LOGIC BAYAR (MODIFIKASI: PAKSA SUKSES / DUMMY) ---
  const handleCheckPayment = async () => {
    if (processing) return;
    setProcessing(true);
    const loadingToast = toast.loading("Memproses pembayaran (Dummy Mode)...");

    try {
      // 1. UBAH URL KE ENDPOINT DUMMY (QRIS-DUMMY)
      // Ini akan memaksa status order di database menjadi 'success'
      const res = await fetch("http://127.0.0.1:8000/api/payment/qris-dummy", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ order_number: order.order_number })
      });

      // 2. CEK RESPON
      const data = await res.json();

      if (res.ok) {
        toast.dismiss(loadingToast);
        toast.success("Pembayaran Berhasil (Simulasi)!");
        
        // Redirect ke halaman sukses
        setTimeout(() => navigate(`/selesai?invoice=${order.order_number}`), 1000);
      } else {
        throw new Error(data.message || "Gagal memproses dummy payment");
      }

    } catch (err) {
      toast.dismiss(loadingToast);
      console.error(err);
      toast.error(err.message || "Terjadi kesalahan sistem.");
    } finally {
      setProcessing(false);
    }
  };

  // --- RENDER CONTENT ---
  const renderPaymentContent = () => {
    // 1. QRIS
    if (isQRIS) {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="payment-box">
          <div className="qris-header">
            <MdQrCodeScanner size={24} color="#fff"/>
            <span className="payment-title">Scan QRIS</span>
          </div>
          <div className="qris-image-container">
            <img src={order.qr_url || "/images/QRIS_payment.png"} alt="QRIS" className="qris-image" />
          </div>
          <p className="instruction-text">Scan menggunakan E-Wallet / M-Banking</p>
        </motion.div>
      );
    }

    // 2. VIRTUAL ACCOUNT (DENGAN LOGO LOGIC)
    if (isVA) {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="payment-box">
          <div className="payment-header-row">
            {/* Jika Logo Ketemu tampilkan Logo, jika tidak tampilkan Icon Gedung */}
            {bankLogoUrl ? (
                <img src={bankLogoUrl} alt={payment.name} className="bank-logo" />
            ) : (
                <FaUniversity size={30} color="#f1c40f" />
            )}
            <span className="payment-title">{payment.name}</span>
          </div>
          
          <div className="va-number-box">
             <span className="va-text">{order.va_number || "880123456789"}</span>
             <button className="btn-copy-small" onClick={() => copyToClipboard(order.va_number, "Nomor VA")}>
                <FaCopy /> Salin
             </button>
          </div>
          
          <p className="instruction-text">Transfer ke nomor Virtual Account di atas.</p>
        </motion.div>
      );
    }

    // 3. RETAIL (ALFAMART/INDOMARET)
    if (isRetail) {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="payment-box">
          <div className="payment-header-row">
            {bankLogoUrl ? (
                <img src={bankLogoUrl} alt={payment.name} className="bank-logo" />
            ) : (
                <FaStore size={30} color="#f1c40f" />
            )}
            <span className="payment-title">Kode {payment.name}</span>
          </div>

          <div className="va-number-box">
             <span className="va-text">{order.payment_code || "ALFA-123456"}</span>
             <button className="btn-copy-small" onClick={() => copyToClipboard(order.payment_code, "Kode Bayar")}>
                <FaCopy /> Salin
             </button>
          </div>

          <p className="instruction-text">Tunjukkan kode ini ke kasir {payment.name}.</p>
        </motion.div>
      );
    }

    // 4. E-WALLET
    if (isEwallet) {
       return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="payment-box">
           <div className="payment-header-row">
            <FaMobileAlt size={30} color="#f1c40f" />
            <span className="payment-title">Bayar via {payment.name}</span>
          </div>
          <p className="instruction-text" style={{marginBottom: 20}}>
            Selesaikan pembayaran melalui aplikasi {payment.name}.
          </p>
          <a href={order.checkout_url || "#"} target="_blank" rel="noreferrer" className="btn-process" style={{textDecoration:'none', background:'#007bff'}}>
             Buka {payment.name}
          </a>
        </motion.div>
       )
    }
  };

  return (
    <div className="checkout-container">
      <Toaster position="top-center" reverseOrder={false} />

      <motion.div 
        className="checkout-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="checkout-header">
          <FaCheckCircle className="success-icon" />
          <h2>Pesanan Dibuat</h2>
          <p className="subtitle">Selesaikan pembayaran sebelum expired.</p>
        </div>

        <div className="order-details">
          <div className="row">
            <span className="label">Invoice</span>
            <div className="value copy-wrapper" onClick={() => copyToClipboard(order.order_number, "Invoice")}>
              {order.order_number} <FaCopy className="copy-icon" />
            </div>
          </div>
          <div className="row">
             <span className="label">Total Bayar</span>
             <span className="value price-text">Rp {amount.toLocaleString("id-ID")}</span>
          </div>
          <hr className="divider" />
          <div className="section-title">Detail Item</div>
          <div className="row"><span className="label"><FaGamepad /> Game</span><span className="value">{game?.name}</span></div>
          <div className="row"><span className="label"><FaBoxOpen /> Paket</span><span className="value">{product?.name}</span></div>
        </div>

        {renderPaymentContent()}

        <button className="btn-process" disabled={processing} onClick={handleCheckPayment}>
            {processing ? <><FaSpinner className="spin" /> Mengecek...</> : "Saya Sudah Bayar"}
        </button>

      </motion.div>
    </div>
  );
}