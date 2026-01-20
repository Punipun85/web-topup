import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import {
  FaFileInvoice,
  FaArrowLeft,
} from "react-icons/fa";
import "./transactions.css";

export default function Transactions() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(
          "http:///api/account/transactions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Gagal mengambil transaksi");

        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, token]);

  return (
    <div className="transactions-page luxury-theme">
      <div className="transactions-header">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft /> Kembali
        </button>
        <h2>Riwayat Transaksi</h2>
      </div>

      {loading ? (
        <p className="loading-text">Memuat transaksi…</p>
      ) : transactions.length === 0 ? (
        <p className="empty-text">Belum ada transaksi</p>
      ) : (
        <div className="transactions-list">
          {transactions.map((tx) => (
            <Motion.div
              key={tx.id}
              className="transaction-card"
              whileHover={{ y: -3 }}
              onClick={() =>
                navigate(`/invoice/${tx.invoice_id}`)
              }
            >
              <div className="tx-left">
                <FaFileInvoice className="tx-icon" />
                <div>
                  <div className="tx-invoice">
                    {tx.invoice_id}
                  </div>
                  <div className="tx-date">
                    {new Date(tx.created_at).toLocaleString(
                      "id-ID"
                    )}
                  </div>
                </div>
              </div>

              <div className="tx-right">
                <div className="tx-amount">
                  Rp {tx.amount.toLocaleString("id-ID")}
                </div>
                <span className={`tx-status ${tx.status}`}>
                  {tx.status.toUpperCase()}
                </span>
              </div>
            </Motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
