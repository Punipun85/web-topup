import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./selesai.css";

export default function Selesai() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const invoice = params.get("invoice");

  const [trx, setTrx] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/transaction/${invoice}`)
      .then((res) => setTrx(res.data.data))
      .catch(() => setError("Data transaksi tidak valid"))
      .finally(() => setLoading(false));
  }, [invoice]);

  if (!invoice) {
    return (
      <div className="selesai-container">
        <div className="selesai-card">
          <h2>Data Tidak Valid</h2>
          <p>Invoice tidak ditemukan</p>
          <button className="btn-home" onClick={() => navigate("/")}>
            Kembali ke Home
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="selesai-container">Memuat transaksi...</div>;
  }

  if (error || !trx) {
    return (
      <div className="selesai-container">
        <div className="selesai-card">
          <h2>Data Tidak Valid</h2>
          <p>{error}</p>
          <button className="btn-home" onClick={() => navigate("/")}>
            Kembali ke Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="selesai-container">
      <div className="selesai-card">
        <h2>Pembayaran Diproses</h2>

        <div className="invoice">{trx.invoice}</div>

        <div className={`status ${trx.status === "PAID" ? "paid" : "waiting"}`}>
          Status: {trx.status}
        </div>

        <div className="summary">
          <div>
            <span>User ID</span>
            <span>
              {trx.customer.userId}
              {trx.customer.zoneId && ` (${trx.customer.zoneId})`}
            </span>
          </div>

          <div>
            <span>Email</span>
            <span>{trx.customer.email}</span>
          </div>

          <div>
            <span>Item</span>
            <span>
              {trx.item.name} x{trx.item.quantity}
            </span>
          </div>

          <div>
            <span>Total</span>
            <strong>
              Rp {trx.total.toLocaleString("id-ID")}
            </strong>
          </div>
        </div>

        <button className="btn-home" onClick={() => navigate("/")}>
          Kembali ke Home
        </button>
      </div>
    </div>
  );
}
