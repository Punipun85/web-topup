import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./upload.css";

export default function UploadPembayaran() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!state) {
    return <div className="upload-error">Data tidak ditemukan.</div>;
  }

  const { invoice, customer, item } = state;

  const handleSubmit = async () => {
  if (!file) {
    alert("Silakan upload bukti pembayaran.");
    return;
  }

  if (!file.type.startsWith("image/")) {
    alert("File harus berupa gambar.");
    return;
  }

  const formData = new FormData();
  formData.append("invoice", invoice);
  formData.append("proof", file);

  try {
    setLoading(true);
    await axios.post(
      "http://127.0.0.1:8000/api/upload-payment",
      formData
    );

    navigate("/selesai", {
      state: {
        invoice,
        status: "WAITING_CONFIRMATION",
        customer,
        item,
      },
    });
  } catch {
    alert("Gagal mengupload bukti pembayaran.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="upload-container">
      <h2>Upload Bukti Pembayaran</h2>

      <div className="upload-card">
        <div className="row">
          <span>Invoice</span>
          <strong>{invoice}</strong>
        </div>

        <div className="row">
          <span>Item</span>
          <strong>
            {item.name} x{item.quantity}
          </strong>
        </div>

        <div className="row">
          <span>User ID</span>
          <strong>
            {customer.userId}
            {customer.zoneId && ` (${customer.zoneId})`}
          </strong>
        </div>

        <hr />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          className="btn-submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Mengupload..." : "Kirim Bukti Pembayaran"}
        </button>
      </div>
    </div>
  );
}
