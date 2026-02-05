import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./ForgotPassword.css";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const q = useQuery();

  const email = q.get("email") || "";

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email) return toast.error("Email tidak valid.");
    if (!otp || otp.length !== 6) return toast.error("OTP harus 6 digit.");
    if (!password || password.length < 8)
      return toast.error("Password minimal 8 karakter");
    if (password !== passwordConfirmation)
      return toast.error("Konfirmasi password tidak cocok");

    setLoading(true);
    try {
      const res = await fetch("/api/reset-password/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg =
          data?.message ||
          (data?.errors ? Object.values(data.errors).flat().join(", ") : null) ||
          "Gagal reset password";
        throw new Error(msg);
      }

      toast.success("Password berhasil direset. Silakan login.");
      setTimeout(() => navigate("/login"), 1200);
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
        <h2>Reset Password</h2>
        <p>
          Untuk akun: <b>{email || "-"}</b>
        </p>

        <label>OTP</label>
        <input
          type="text"
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
          }
          placeholder="6 digit OTP"
          inputMode="numeric"
          autoComplete="one-time-code"
        />

        <label>Password Baru</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password baru"
          autoComplete="new-password"
        />

        <label>Konfirmasi Password</label>
        <input
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="Konfirmasi password"
          autoComplete="new-password"
        />

        <button onClick={submit} disabled={loading}>
          {loading ? "Memproses..." : "Simpan Password Baru"}
        </button>

        <button className="link" onClick={() => navigate("/forgot-password")}>
          Kirim ulang OTP
        </button>
      </div>
    </div>
  );
}
