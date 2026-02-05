import React, { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import "../assets/contact-us.css";

export default function ContactUs() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    category: "",
    name: "",
    email: "",
    whatsapp: "",
    message: "",
    captcha: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.captcha) {
      toast.error("Verifikasi captcha terlebih dahulu");
      return;
    }

    try {
      setLoading(true);
      await api.post("/contact", {
        category: form.category,
        name: form.name,
        email: form.email,
        whatsapp: form.whatsapp,
        message: form.message,
      });

      toast.success("Pesan berhasil dikirim");
      setForm({
        category: "",
        name: "",
        email: "",
        whatsapp: "",
        message: "",
        captcha: false,
      });
    } catch  {
      toast.error("Gagal mengirim pesan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      {/* HEADER */}
      <section className="contact-header">
        <h1>Hubungi Kami!</h1>
        <p>
          Mengalami masalah dengan transaksi?  
          Silakan hubungi kami melalui formulir di bawah ini.
        </p>

        <div className="contact-info">
          <span>Banyuwangi, Jawa Timur, Indonesia</span>
          <span>support@a6topup.com</span>
          <span>+62 812-3456-7890</span>
        </div>
      </section>

      {/* FORM */}
      <section className="contact-form-wrapper">
        <h2>Formulir Laporan / Permintaan</h2>
        <p className="desc">
          Isi formulir berikut dengan data yang valid agar tim kami
          dapat menindaklanjuti laporan kamu.
        </p>

        <form className="contact-form" onSubmit={submit}>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Kategori</option>
            <option value="transaksi">Masalah Transaksi</option>
            <option value="akun">Masalah Akun</option>
            <option value="lainnya">Lainnya</option>
          </select>

          <input
            type="text"
            name="name"
            placeholder="Nama Kamu"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="whatsapp"
            placeholder="Nomor WhatsApp"
            value={form.whatsapp}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            rows="4"
            placeholder="Jelaskan masalah kamu..."
            value={form.message}
            onChange={handleChange}
            required
          />

          {/* CAPTCHA DUMMY */}
          <label className="captcha-box">
            <input
              type="checkbox"
              name="captcha"
              checked={form.captcha}
              onChange={handleChange}
            />
            <span>I'm not a robot</span>
          </label>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Kirim Pesan"}
          </button>
        </form>
      </section>
    </div>
  );
}
