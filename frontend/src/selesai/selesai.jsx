import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./selesai.css";

export default function Selesai() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  // Bisa ORD / INV
  const ref = params.get("invoice");

  const [trx, setTrx] = useState(null);

  useEffect(() => {
    if (!ref) return;

    axios
      .get(`http://127.0.0.1:8000/api/transaction/ref/${ref}`)
      .then(res => setTrx(res.data.data))
      .catch(() => navigate("/")); // ❗ gagal → pulang
  }, [ref, navigate]);

  // ❌ PARAM TIDAK ADA
  if (!ref) {
    return (
      <div className="selesai-container">
        <div className="selesai-card">
          <h2>Data Tidak Valid</h2>
          <button onClick={() => navigate("/")}>Kembali ke Home</button>
        </div>
      </div>
    );
  }

  // ⏳ BELUM ADA DATA
  if (!trx) {
    return (
      <div className="selesai-container">
        <div className="selesai-card">Memuat transaksi...</div>
      </div>
    );
  }

  // ✅ SUCCESS
  return (
    <div className="selesai-container">
      <div className="selesai-card">
        <h2>Pembayaran Berhasil</h2>

        <div className="invoice">{trx.invoice}</div>

        <div className="status paid">
          Status: {trx.status}
        </div>

        <div className="summary">
          <div><span>Game</span><span>{trx.game}</span></div>
          <div><span>Paket</span><span>{trx.package}</span></div>
          <div><span>User ID</span><span>{trx.player_id}</span></div>
          <div><span>Email</span><span>{trx.email}</span></div>
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
