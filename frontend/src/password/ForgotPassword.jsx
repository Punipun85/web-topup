import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const cleanEmail = email.trim();
    if (!cleanEmail) return toast.error("Email wajib diisi");

    setLoading(true);
    try {
      const res = await fetch("/api/forgot-password/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg =
          data?.message ||
          (data?.errors ? Object.values(data.errors).flat().join(", ") : null) ||
          "Gagal mengirim OTP";
        throw new Error(msg);
      }

      toast.success("Kode OTP sudah dikirim ke email kamu");
      setEmail("");

      setTimeout(() => {
        navigate(`/reset-password?email=${encodeURIComponent(cleanEmail)}`);
      }, 1200);
    } catch (err) {
      toast.error(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Toaster position="top-center" />
      <div className="auth-card">
        <h2>Lupa Password</h2>
        <p>Masukkan email kamu. Kami akan kirim kode OTP untuk reset password.</p>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@contoh.com"
          autoComplete="email"
        />

        <button onClick={submit} disabled={loading}>
          {loading ? "Mengirim..." : "Kirim OTP"}
        </button>

        <button className="link" onClick={() => navigate("/login")}>
          Kembali ke Login
        </button>
      </div>
    </div>
  );
}
