import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeadset } from "react-icons/fa";
import axios from "axios";
import "../assets/LoginRegister.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    country_code: "+62",
    whatsapp: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    // validasi dasar frontend (WAJIB)
    if (form.password !== form.password_confirmation) {
      alert("Kata sandi dan konfirmasi tidak sama");
      return;
    }

    try {
      await axios.post("/api/register", {
        name: form.name,
        username: form.username,
        email: form.email,
        whatsapp: form.country_code + form.whatsapp,
        password: form.password,
        password_confirmation: form.password_confirmation,
      });

      alert("Registrasi berhasil, silakan login");
      navigate("/login");
    } catch (err) {
      console.error("Registrasi gagal:", err);
      alert("Registrasi gagal");
    }
  };

  return (
    <div className="register-container">
      <button className="close-btn" onClick={() => navigate("/")}>✕</button>

      <div className="register-left">
        <h1>Daftar</h1>
        <p className="subtitle">Masukkan informasi pendaftaran yang valid.</p>

        <form onSubmit={submit}>
          <div className="row">
            <input name="name" placeholder="Nama lengkap" onChange={handleChange} required />
            <input name="username" placeholder="Username" onChange={handleChange} required />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Alamat email"
            onChange={handleChange}
            required
          />

          <div className="phone-group">
            <select
              name="country_code"
              value={form.country_code}
              onChange={handleChange}
            >
              <option value="+62">ID (+62)</option>
              <option value="+60">MY (+60)</option>
              <option value="+65">SG (+65)</option>
              <option value="+1">US (+1)</option>
            </select>

            <input
              name="whatsapp"
              placeholder="Nomor WhatsApp"
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <input
              type="password"
              name="password"
              placeholder="Kata sandi"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password_confirmation"
              placeholder="Konfirmasi kata sandi"
              onChange={handleChange}
              required
            />
          </div>

          <div className="terms">
            <input type="checkbox" required />
            <label>
              Saya setuju dengan <span>Syarat & Ketentuan</span>
            </label>
          </div>

          <button className="btn-submit" type="submit">Daftar</button>

          <p className="login-link">
            Sudah memiliki akun?{" "}
            <span onClick={() => navigate("/login")}>Masuk</span>
          </p>
        </form>
      </div>

      <div className="register-right">
        <div className="customer-service">
          <FaHeadset />
          <span>CUSTOMER SERVICE</span>
        </div>
      </div>
    </div>
  );
}
