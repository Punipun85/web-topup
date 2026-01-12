import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeadset } from "react-icons/fa";
import api from "../services/api";
import { useAuth } from "../Context/useAuth";
import "../assets/login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const [form, setForm] = useState({
    login: "",
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
        login: form.login,
        password: form.password,
      });

      const storage = form.remember ? localStorage : sessionStorage;
      storage.setItem("token", data.token);

      authLogin(data.token, data.user);

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Username / email atau kata sandi salah");
    }
  };

  return (
    <div className="auth-wrapper">
      {/* LEFT */}
      <div className="auth-left">
        <button className="close-btn" onClick={() => navigate("/")}>
          ✕
        </button>

        <div className="auth-form">
          <h1>Masuk</h1>
          <p className="subtitle">
            Masuk dengan akun yang telah kamu daftarkan.
          </p>

          <form onSubmit={submit}>
            <label>Username atau Email</label>
            <input
              type="text"
              name="login"
              placeholder="Username atau Email"
              value={form.login}
              onChange={handleChange}
              required
            />

            <label>Kata sandi</label>
            <input
              type="password"
              name="password"
              placeholder="Kata sandi"
              value={form.password}
              onChange={handleChange}
              required
            />

            <div className="options">
              <label className="remember">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                />
                Ingat akun ku
              </label>

              <span
                className="forgot"
                onClick={() => navigate("/forgot-password")}
              >
                Lupa kata sandi mu?
              </span>
            </div>

            <button className="btn-login" type="submit">
              Masuk
            </button>

            <p className="register-link">
              Belum memiliki akun?{" "}
              <span onClick={() => navigate("/register")}>Daftar</span>
            </p>
          </form>
        </div>
      </div>

      {/* RIGHT */}
      <div className="auth-right">
        <div className="customer-service">
          <FaHeadset />
          <span>CUSTOMER SERVICE</span>
        </div>
      </div>
    </div>
  );
}
