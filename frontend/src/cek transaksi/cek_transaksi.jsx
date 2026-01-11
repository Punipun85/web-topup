import { useState } from "react";
import { SearchCode } from "lucide-react";
import axios from "axios";
import "./cek_transaksi.css";

export default function CekTransaksi() {
  const [invoice, setInvoice] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!invoice.trim()) {
      alert("Masukkan nomor invoice");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setTransactions([]);

      const res = await axios.get(
        `http://127.0.0.1:8000/api/lookup/${invoice.trim()}`
      );

      const data = res.data.data;

     setTransactions([
  {
    date: new Date(data.date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    invoice: data.code,
    status: data.status.toUpperCase(),
  },
]);

    } catch (err) {
      setError(
        err.response?.data?.message || "Data tidak ditemukan"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cek-container">
      <section className="search-section">
        <h1 className="search-title">
          Cek Invoice Kamu <br /> dengan Cepat
        </h1>

        <div className="search-card">
          <input
            type="text"
            placeholder="Masukkan kode (ORD / INV / TP)"
            className="search-input"
            value={invoice}
            onChange={(e) => setInvoice(e.target.value)}
          />

          <button className="search-button" onClick={handleSearch}>
            <SearchCode size={22} strokeWidth={3} />
            {loading ? "MENCARI..." : "CARI"}
          </button>
        </div>

        {error && <p className="error-text">{error}</p>}
      </section>

      <section className="table-section">
        <div className="table-wrapper">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Kode</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {transactions.length === 0 && !loading ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    Belum ada data
                  </td>
                </tr>
              ) : (
                transactions.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td style={{ fontFamily: "monospace" }}>
                      {item.invoice}
                    </td>
                    <td>
                      <span
                        className={`status-badge ${
                          item.status === "PAID" || item.status === "SUCCESS"
                            ? "status-success"
                            : "status-pending"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
