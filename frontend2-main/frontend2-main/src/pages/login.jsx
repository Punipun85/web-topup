import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/login.css";
import { FaHeadset } from "react-icons/fa";


export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/login", form);
      alert("Login berhasil");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Username atau password salah");
    }
  };

  return (
    <div className="login-container">
      {/* CLOSE */}
      <button className="close-btn" onClick={() => navigate("/")}>
        ✕
      </button>

      {/* LEFT */}
      <div className="login-left">
        <h1>Masuk</h1>
        <p className="subtitle">
          Masuk dengan akun yang telah kamu daftarkan.
        </p>

        <form onSubmit={submit}>
          <label>Username</label>
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />

          <label>Kata sandi</label>
          <input
            type="password"
            name="password"
            placeholder="Kata sandi"
            onChange={handleChange}
            required
          />

          <div className="options">
            <label className="remember">
              <input
                type="checkbox"
                name="remember"
                onChange={handleChange}
              />
              Ingat akun ku
            </label>

            <span
              className="forgot"
              onClick={() => alert("Fitur lupa password")}
            >
              Lupa kata sandi mu?
            </span>
          </div>

          {/* ❌ CAPTCHA DIHAPUS */}

          <button className="btn-submit" type="submit">
            Masuk
          </button>

          <p className="register-link">
            Belum memiliki akun?{" "}
            <span onClick={() => navigate("/register")}>Daftar</span>
          </p>
        </form>
      </div>

        {/* RIGHT */}
        <div className="login-right">
        <div className="customer-service">
            <FaHeadset />
            <span>CUSTOMER SERVICE</span>
        </div>
        </div>

    </div>
  );
}
