import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import {
  FaCheckCircle,
  FaCopy,
  FaSpinner,
  FaGamepad,
  FaBoxOpen,
  FaUniversity,
  FaStore,
  FaMobileAlt,
} from "react-icons/fa";
import { MdQrCodeScanner } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import "./checkout.css";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  // HARD GUARD
  if (!state || !state.order || !state.payment) {
    return (
      <div className="checkout-container">
        <div className="checkout-error">
          <h3>Data Checkout Tidak Valid</h3>
          <button onClick={() => navigate("/")}>Kembali ke Beranda</button>
        </div>
      </div>
    );
  }

  const { order, payment, game, product } = state;
  const amount = Number(order.amount || 0);

  // DETEKSI METODE
  const paymentCode = payment.code?.toUpperCase() || "";
  const isQRIS = paymentCode.includes("QRIS");
  const isVA = paymentCode.includes("VA") || paymentCode.includes("BANK");
  const isRetail = paymentCode.includes("ALFA") || paymentCode.includes("INDO");
  const isEwallet = !isQRIS && !isVA && !isRetail;

  // COPY
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} berhasil disalin`);
  };

  // QRIS ONLY
  const handleCheckPayment = async () => {
    if (!isQRIS || processing) return;

    setProcessing(true);
    const loadingToast = toast.loading("Memproses pembayaran...");

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/payment/qris-dummy",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_number: order.order_number }),
        }
      );

      if (!res.ok) throw new Error("Gagal memproses QRIS");

      toast.dismiss(loadingToast);
      toast.success("Pembayaran berhasil (QRIS)");

      navigate(`/selesai?ref=${order.order_number}`);
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.message || "Terjadi kesalahan");
    } finally {
      setProcessing(false);
    }
  };

  // RENDER PAYMENT BOX
  const renderPaymentContent = () => {
    if (isQRIS) {
      return (
        <div className="payment-box">
          <div className="qris-header">
            <MdQrCodeScanner size={22} />
            <span>Scan QRIS</span>
          </div>
          <img
            src={order.qr_url || "/images/QRIS_payment.png"}
            alt="QRIS"
            className="qris-image"
          />
        </div>
      );
    }

    if (isVA) {
      return (
        <div className="payment-box">
          <FaUniversity size={28} />
          <p>{payment.name}</p>
          <div className="va-number-box">
            <span>{order.va_number || "-"}</span>
            <button onClick={() => copyToClipboard(order.va_number, "VA")}>
              <FaCopy />
            </button>
          </div>
        </div>
      );
    }

    if (isRetail) {
      return (
        <div className="payment-box">
          <FaStore size={28} />
          <p>{payment.name}</p>
          <div className="va-number-box">
            <span>{order.payment_code || "-"}</span>
            <button
              onClick={() =>
                copyToClipboard(order.payment_code, "Kode Pembayaran")
              }
            >
              <FaCopy />
            </button>
          </div>
        </div>
      );
    }

    if (isEwallet) {
      return (
        <div className="payment-box">
          <FaMobileAlt size={28} />
          <p>Bayar via {payment.name}</p>
          <a
            href={order.checkout_url || "#"}
            target="_blank"
            rel="noreferrer"
            className="btn-process"
          >
            Buka {payment.name}
          </a>
        </div>
      );
    }
  };

  return (
    <div className="checkout-container">
      <Toaster position="top-center" />

      <Motion.div
        className="checkout-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="checkout-header">
          <FaCheckCircle />
          <h2>Pesanan Dibuat</h2>
        </div>

        <div className="order-details">
          <div className="row">
            <span>Invoice</span>
            <b onClick={() => copyToClipboard(order.order_number, "Invoice")}>
              {order.order_number}
            </b>
          </div>
          <div className="row">
            <span>Total</span>
            <b>Rp {amount.toLocaleString("id-ID")}</b>
          </div>

          <div className="row">
            <FaGamepad /> {game?.name}
          </div>
          <div className="row">
            <FaBoxOpen /> {product?.name}
          </div>
        </div>

        {renderPaymentContent()}

        {/* === ACTION BUTTON FINAL === */}
        {isQRIS ? (
          <button
            className="btn-process"
            disabled={processing}
            onClick={handleCheckPayment}
          >
            {processing ? <FaSpinner className="spin" /> : "Saya Sudah Bayar"}
          </button>
        ) : (
          <button
            className="btn-process"
            style={{ background: "#ff9800" }}
            onClick={() =>
              navigate(`/payment/upload/${order.order_number}`)
            }
          >
            Upload Bukti Pembayaran
          </button>
        )}
      </Motion.div>
    </div>
  );
}
