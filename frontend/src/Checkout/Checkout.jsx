import { useLocation, useNavigate } from "react-router-dom";
import "./checkout.css";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <div className="checkout-error">Data checkout tidak ditemukan.</div>;
  }

  const {
    invoice,
    total,
    status,
    payment_method,
    bank,
    customer,
    item,
  } = state;

  const isQRIS = payment_method?.toUpperCase().includes("QRIS");

  return (
    <div className="checkout-container">
      <h2>Pesanan Berhasil Dibuat</h2>

      <div className="checkout-card">
        {/* ===== INFO UTAMA ===== */}
        <div className="row">
          <span>Invoice</span>
          <strong>{invoice}</strong>
        </div>

        <div className="row">
          <span>Status</span>
          <strong className="pending">{status}</strong>
        </div>

        <div className="row">
          <span>Total Bayar</span>
          <strong className="price">
            Rp {total.toLocaleString("id-ID")}
          </strong>
        </div>

        <hr />

        {/* ===== DATA CUSTOMER ===== */}
        <h4>Data Akun</h4>

        <div className="row">
          <span>User ID</span>
          <strong>
            {customer.userId}
            {customer.zoneId && ` (${customer.zoneId})`}
          </strong>
        </div>

        <div className="row">
          <span>Email</span>
          <strong>{customer.email}</strong>
        </div>

        <hr />

        {/* ===== ITEM ===== */}
        <h4>Item Dibeli</h4>

        <div className="row">
          <span>Item</span>
          <strong>
            {item.name} x{item.quantity}
          </strong>
        </div>

        <hr />

        {/* ===== PEMBAYARAN ===== */}
        {isQRIS ? (
  <>
    <h4>Scan QRIS untuk Pembayaran</h4>

    <div className="qris-box">
      <img
        src="/images/QRIS_payment.png"
        alt="QRIS Payment"
        className="qris-image"
        onError={(e) => {
          e.target.src = "https://placehold.co/240x240?text=QRIS";
        }}
      />
      <p className="qris-note">
        Scan menggunakan e-wallet atau mobile banking yang mendukung QRIS.
      </p>
    </div>

    <button
      className="btn-next"
      onClick={async () => {
        await fetch(
          `http://127.0.0.1:8000/api/transaction/${invoice}/qris-paid`,
          { method: "POST" }
        );

        navigate(`/selesai?invoice=${invoice}`);
      }}
    >
      Saya Sudah Bayar
    </button>
  </>
) : (

          <>
            <h4>Transfer Manual</h4>

            <div className="bank-box">
              <p><b>Bank:</b> {bank.name}</p>
              <p><b>No Rek:</b> {bank.account}</p>
              <p><b>A/N:</b> {bank.holder}</p>
            </div>

            <button
              className="btn-next"
              onClick={() =>
                navigate("/upload-pembayaran", {
                  state: {
                    invoice,
                    customer,
                    item,
                  },
                })
              }
            >
              Upload Bukti Pembayaran
            </button>
          </>
        )}
      </div>
    </div>
  );
}
