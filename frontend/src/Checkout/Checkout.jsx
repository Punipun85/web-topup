import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./checkout.css";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  // HARD GUARD
  if (!state || !state.order || !state.payment) {
    return (
      <div className="checkout-error">
        Data checkout tidak valid.
        <br />
        <button onClick={() => navigate("/")}>Kembali ke Beranda</button>
      </div>
    );
  }

  const { order, payment, game, product, quantity } = state;
  const amount = Number(order.amount || 0);
  const isQRIS = payment.code?.toUpperCase().includes("QRIS");

  const handleQrisPay = async () => {
    if (processing) return;

    setProcessing(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/payment/qris-dummy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_number: order.order_number
        })
      });

      // ✔️ SUCCESS ATAU SUDAH DIPROSES → LANJUT
      if (res.ok || res.status === 422) {
        navigate(`/selesai?invoice=${order.order_number}`);
        return;
      }

      // ❌ ERROR LAIN
      const data = await res.json();
      alert(data.message || "Gagal memproses pembayaran");

    } catch  {
      alert("Koneksi ke server gagal");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Pesanan Berhasil Dibuat</h2>

      <div className="checkout-card">
        <div className="row">
          <span>Invoice</span>
          <strong>{order.order_number}</strong>
        </div>

        <div className="row">
          <span>Status</span>
          <strong className="pending">{order.status}</strong>
        </div>

        <div className="row">
          <span>Total Bayar</span>
          <strong className="price">
            Rp {amount.toLocaleString("id-ID")}
          </strong>
        </div>

        <hr />

        <h4>Detail Pembelian</h4>

        <div className="row">
          <span>Game</span>
          <strong>{game?.name}</strong>
        </div>

        <div className="row">
          <span>Paket</span>
          <strong>
            {product?.name} x{quantity}
          </strong>
        </div>

        <hr />

        {isQRIS && (
          <>
            <h4>Pembayaran QRIS</h4>

            <div className="qris-box">
              <img
                src="/images/QRIS_payment.png"
                alt="QRIS Payment"
                className="qris-image"
              />
              <p className="qris-note">
                Scan QRIS menggunakan e-wallet atau mobile banking.
              </p>
            </div>

            <button
              className="btn-next"
              disabled={processing}
              onClick={handleQrisPay}
            >
              {processing ? "Memproses..." : "Saya Sudah Bayar"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
