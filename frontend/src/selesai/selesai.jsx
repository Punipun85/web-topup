import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./selesai.css";

export default function Selesai() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const orderNumber = params.get("invoice"); // INI ORDER NUMBER

  const [trx, setTrx] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderNumber) return;

    axios
      .get(`http://127.0.0.1:8000/api/transaction/order/${orderNumber}`)
      .then(res => setTrx(res.data.data))
      .catch(() => setError("Data transaksi tidak ditemukan"))
      .finally(() => setLoading(false));
  }, [orderNumber]);

  if (!orderNumber) {
    return (
      <div className="selesai-container">
        <div className="selesai-card">
          <h2>Data Tidak Valid</h2>
          <button onClick={() => navigate("/")}>Kembali ke Home</button>
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
          <h2>Terjadi Kesalahan</h2>
          <p>{error}</p>
          <button onClick={() => navigate("/")}>Kembali ke Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="selesai-container">
      <div className="selesai-card">
        <h2>Pembayaran Berhasil</h2>

        <div className="invoice">{trx.invoice}</div>

        <div className={`status paid`}>
          Status: {trx.status}
        </div>

        <div className="summary">
          <div>
            <span>Game</span>
            <span>{trx.game}</span>
          </div>

          <div>
            <span>Paket</span>
            <span>{trx.package}</span>
          </div>

          <div>
            <span>User ID</span>
            <span>{trx.player_id}</span>
          </div>

          <div>
            <span>Email</span>
            <span>{trx.email}</span>
          </div>

          <div>
            <span>Total</span>
            <strong>
              Rp {Number(trx.amount).toLocaleString("id-ID")}
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
