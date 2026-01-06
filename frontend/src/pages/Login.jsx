import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../assets/login.css";
import { FaHeadset } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
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

    try {
      const { data } = await api.post("/login", {
        email: form.email,
        password: form.password,
      });

      const storage = form.remember ? localStorage : sessionStorage;

      // 🔑 WAJIB
      storage.setItem("token", data.token);
      storage.setItem("user", JSON.stringify(data.user));

      // 🔑 ROLE-BASED REDIRECT
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error(err.response?.data || err);
      alert("Email atau password salah");
    }
  };

  return (
    <div className="login-container">
      <button className="close-btn" onClick={() => navigate("/")}>✕</button>

      <div className="login-left">
        <h1>Masuk</h1>
        <p className="subtitle">
          Masuk dengan akun yang telah kamu daftarkan.
        </p>

        <form onSubmit={submit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
          />

          <label>Kata sandi</label>
          <input
            type="password"
            name="password"
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
          </div>

          <button className="btn-submit" type="submit">
            Masuk
          </button>
        </form>
      </div>

      <div className="login-right">
        <div className="customer-service">
          <FaHeadset />
          <span>CUSTOMER SERVICE</span>
        </div>
      </div>
    </div>
  );
}
