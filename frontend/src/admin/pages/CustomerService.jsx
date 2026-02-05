import { useEffect, useState } from "react";
import api from "../../services/api";
import "../assets/customer-service.css";

export default function CustomerServiceAdmin() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  // ===== FETCH DATA (ESLINT-SAFE) =====
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/contact-messages");
      setMessages(res.data);
    } catch (err) {
      console.error("Gagal memuat pesan CS", err);
    } finally {
      setLoading(false);
    }
  };

  // ===== LOAD SAAT MOUNT =====
  useEffect(() => {
    fetchMessages();
  }, []);

  // ===== UPDATE STATUS =====
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/contact-messages/${id}/status`, { status });
      setSelected(null);
      fetchMessages();
    } catch (err) {
      console.error("Gagal update status", err);
    }
  };

  return (
    <div className="cs-admin">
      <h1>Customer Service</h1>

      <div className="cs-admin-grid">
        {/* ===== LIST ===== */}
        <div className="cs-list">
          {loading && <p style={{ padding: 16 }}>Memuat pesan...</p>}

          {!loading && messages.length === 0 && (
            <p style={{ padding: 16 }}>Belum ada pesan</p>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`cs-item ${m.status}`}
              onClick={() => setSelected(m)}
            >
              <strong>{m.name}</strong>
              <span>{m.category}</span>
              <small>{m.status}</small>
            </div>
          ))}
        </div>

        {/* ===== DETAIL ===== */}
        {selected && (
          <div className="cs-detail">
            <h3>Detail Pesan</h3>

            <p><b>Nama:</b> {selected.name}</p>
            <p><b>Email:</b> {selected.email}</p>
            <p><b>WhatsApp:</b> {selected.whatsapp}</p>
            <p><b>Kategori:</b> {selected.category}</p>

            <p className="message">{selected.message}</p>

            <div className="actions">
              <button onClick={() => updateStatus(selected.id, "read")}>
                Tandai Dibaca
              </button>

              <button
                className="resolve"
                onClick={() => updateStatus(selected.id, "resolved")}
              >
                Selesai
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
