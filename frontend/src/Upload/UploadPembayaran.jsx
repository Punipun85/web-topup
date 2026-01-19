import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function UploadPembayaran() {
  const { orderNumber } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!file) return alert("Upload bukti pembayaran dulu");

    const formData = new FormData();
    formData.append("order_number", orderNumber);
    formData.append("proof", file);

    try {
      setLoading(true);
      await axios.post(
        "http://127.0.0.1:8000/api/payment/upload-proof",
        formData
      );

      // 🔥 LANGSUNG KE SELESAI
      navigate(`/selesai?ref=${orderNumber}`);
    } catch  {
      alert("Gagal upload bukti pembayaran");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload Bukti Pembayaran</h2>

      <input type="file" onChange={e => setFile(e.target.files[0])} />

      <button disabled={loading} onClick={handleSubmit}>
        {loading ? "Mengupload..." : "Kirim Bukti"}
      </button>
    </div>
  );
}
