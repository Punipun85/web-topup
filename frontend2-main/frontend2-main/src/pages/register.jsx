import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeadset } from "react-icons/fa";
import api from "../api/api";
import "../styles/register.css";

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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/register", {
        ...form,
        whatsapp: form.country_code + form.whatsapp,
      });

      alert("Registrasi berhasil, silakan login");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registrasi gagal");
    }
  };

  return (
    <div className="register-container">
      {/* CLOSE BUTTON */}
      <button className="close-btn" onClick={() => navigate("/")}>
        ✕
      </button>

      {/* LEFT */}
      <div className="register-left">
        <h1>Daftar</h1>
        <p className="subtitle">
          Masukkan informasi pendaftaran yang valid.
        </p>

        <form onSubmit={submit}>
          {/* NAME & USERNAME */}
          <div className="row">
            <input
              name="name"
              placeholder="Nama lengkap"
              onChange={handleChange}
              required
            />
            <input
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Alamat email"
            onChange={handleChange}
            required
          />

          {/* PHONE */}
          <div className="phone-group">
            <select
              name="country_code"
              value={form.country_code}
              onChange={handleChange}
              required
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

          {/* PASSWORD */}
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

          {/* TERMS */}
          <div className="terms">
          <input type="checkbox" required />
          <label>
            Saya setuju dengan{" "}
            <span
              className="terms-link"
              onClick={() => navigate("/terms")}
            >
              Syarat & Ketentuan
            </span>
            {" "}dan{" "}
            <span
              className="terms-link"
              onClick={() => navigate("/terms")}
            >
              kebijakan privasi
            </span>
            </label>
            </div>


          {/* SUBMIT */}
          <button className="btn-submit" type="submit">
            Daftar
          </button>

          {/* LOGIN */}
          <p className="login-link">
            Sudah memiliki akun?{" "}
            <span onClick={() => navigate("/login")}>Masuk</span>
          </p>
        </form>
      </div>

      {/* RIGHT */}
<div className="register-right">
  <div className="customer-service">
    <FaHeadset />
    <span>CUSTOMER SERVICE</span>
  </div>
</div>
    </div>
  );
}
