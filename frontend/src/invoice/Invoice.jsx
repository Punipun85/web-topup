import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./invoice.css";

export default function Invoice() {
  const { invoiceId } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchInvoice = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/transaction/ref/${invoiceId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Invoice tidak ditemukan");

        const json = await res.json();

        // ⬇️ PENTING: sesuaikan dengan response backend
        const payload = json.data ?? json;

        setInvoice(payload);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceId, navigate, token]);

  if (loading) return <p className="loading">Memuat invoice…</p>;
  if (!invoice) return <p className="error">Invoice tidak tersedia</p>;

  const status = invoice.status ?? "-";

  return (
    <div className="invoice-page">
      <div className="invoice-card">
        <h2>Invoice</h2>

        <div className="row">
          <span>ID Invoice</span>
          <b>{invoice.invoice_id || "-"}</b>
        </div>

        <div className="row">
          <span>Status</span>
          <b className={`status ${status}`}>
            {status.toUpperCase()}
          </b>
        </div>

        <div className="row">
          <span>Metode</span>
          <b>{invoice.payment_method || "-"}</b>
        </div>

        <div className="row">
          <span>Total</span>
          <b>Rp {invoice.amount.toLocaleString("id-ID")}</b>
        </div>

        <div className="row">
          <span>Tanggal</span>
          <b>
            {new Date(invoice.created_at).toLocaleString("id-ID")}
          </b>
        </div>

        <button className="btn-back" onClick={() => navigate(-1)}>
          Kembali
        </button>
      </div>
    </div>
  );
}
