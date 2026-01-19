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
            },
          }
        );

        if (!res.ok) throw new Error("Invoice tidak ditemukan");

        const json = await res.json();
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

  // ✅ FORMAT TANGGAL AMAN (TANPA KONVERSI JAM ANEH)
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";

    // kalau backend sudah kirim string WIB, tampilkan langsung
    if (typeof dateStr === "string" && dateStr.includes(":")) {
      return dateStr;
    }

    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "-";

    return d.toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
    });
  };

  return (
    <div className="invoice-page">
      <div className="invoice-card">
        <h2>Invoice</h2>

        <div className="row">
          <span>ID Invoice</span>
          <b>{invoice.invoice || invoice.invoice_id || "-"}</b>
        </div>

        <div className="row">
          <span>Status</span>
          <b className={`status ${status.toLowerCase()}`}>
            {status.toUpperCase()}
          </b>
        </div>

        <div className="row">
          <span>Metode</span>
          <b>{invoice.payment_method || "-"}</b>
        </div>

        <div className="row">
          <span>Total</span>
          <b>
            Rp {Number(invoice.amount || 0).toLocaleString("id-ID")}
          </b>
        </div>

        <div className="row">
          <span>Tanggal</span>
          <b>{formatDate(invoice.created_at)}</b>
        </div>

        <button className="btn-back" onClick={() => navigate(-1)}>
          Kembali
        </button>
      </div>
    </div>
  );
}
