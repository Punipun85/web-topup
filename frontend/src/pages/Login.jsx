import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/LoginRegister.css";
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
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const submit = async (e) => {
  e.preventDefault();

  try {
    const { data } = await axios.post("/api/login", {
      username: form.username,
      password: form.password,
    });

    if (!data.token) throw new Error("Token tidak ada");

    const storage = form.remember ? localStorage : sessionStorage;
    storage.setItem("token", data.token);

    navigate("/");
  } catch (err) {
    console.error(err);
    alert("Username atau password salah");
  }
};

  return (
    <div className="login-container">
      <button className="close-btn" onClick={() => navigate("/")}>✕</button>

      <div className="login-left">
        <h1>Masuk</h1>
        <p className="subtitle">Masuk dengan akun yang telah kamu daftarkan.</p>

        <form onSubmit={submit}>
          <label>Username</label>
          <input name="username" onChange={handleChange} required />

          <label>Kata sandi</label>
          <input type="password" name="password" onChange={handleChange} required />

          <div className="options">
            <label className="remember">
              <input type="checkbox" name="remember" onChange={handleChange} />
              Ingat akun ku
            </label>

            <span className="forgot">Lupa kata sandi mu?</span>
          </div>

          <button className="btn-submit" type="submit">Masuk</button>

          <p className="register-link">
            Belum memiliki akun?{" "}
            <span onClick={() => navigate("/register")}>Daftar</span>
          </p>
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
