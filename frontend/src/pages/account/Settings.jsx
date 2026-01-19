import React, { useEffect, useState } from "react";
import "../../assets/settings.css";

export default function Settings() {
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState({
    phone: "",
    email: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // =========================
  // FETCH PROFILE
  // =========================
  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8000/api/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile({
          phone: data.phone || "",
          email: data.email || "",
        });
      });
  }, [token]);

  // =========================
  // UPDATE PHONE
  // =========================
  const updatePhone = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ phone: profile.phone }),
      });

      if (!res.ok) throw new Error("Gagal update nomor HP");

      setMessage("Nomor HP berhasil diperbarui");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UPDATE EMAIL
  // =========================
  const updateEmail = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8000/api/profile/email", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: profile.email }),
      });

      if (!res.ok) throw new Error("Gagal update email");

      setMessage("Email berhasil diperbarui");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UPDATE PASSWORD
  // =========================
  const updatePassword = async () => {
    if (
      !passwordForm.current_password ||
      !passwordForm.password ||
      !passwordForm.password_confirmation
    ) {
      setMessage("Semua field password wajib diisi");
      return;
    }

    if (passwordForm.password !== passwordForm.password_confirmation) {
      setMessage("Konfirmasi password tidak cocok");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8000/api/profile/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwordForm),
      });

      if (!res.ok) throw new Error("Gagal update password");

      setMessage("Password berhasil diperbarui");
      setPasswordForm({
        current_password: "",
        password: "",
        password_confirmation: "",
      });
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <h2>Pengaturan Akun</h2>

      {message && <p className="settings-message">{message}</p>}

      {/* ================= PHONE ================= */}
      <div className="settings-card">
        <h4>Nomor HP</h4>
        <input
          type="text"
          value={profile.phone}
          onChange={(e) =>
            setProfile({ ...profile, phone: e.target.value })
          }
        />
        <button onClick={updatePhone} disabled={loading}>
          Simpan Nomor
        </button>
      </div>

      {/* ================= EMAIL ================= */}
      <div className="settings-card">
        <h4>Email</h4>
        <input
          type="email"
          value={profile.email}
          onChange={(e) =>
            setProfile({ ...profile, email: e.target.value })
          }
        />
        <button onClick={updateEmail} disabled={loading}>
          Ganti Email
        </button>
      </div>

      {/* ================= PASSWORD ================= */}
      <div className="settings-card">
        <h4>Password</h4>
        <input
          type="password"
          placeholder="Password lama"
          value={passwordForm.current_password}
          onChange={(e) =>
            setPasswordForm({
              ...passwordForm,
              current_password: e.target.value,
            })
          }
        />
        <input
          type="password"
          placeholder="Password baru"
          value={passwordForm.password}
          onChange={(e) =>
            setPasswordForm({
              ...passwordForm,
              password: e.target.value,
            })
          }
        />
        <input
          type="password"
          placeholder="Konfirmasi password baru"
          value={passwordForm.password_confirmation}
          onChange={(e) =>
            setPasswordForm({
              ...passwordForm,
              password_confirmation: e.target.value,
            })
          }
        />
        <button onClick={updatePassword} disabled={loading}>
          Ganti Password
        </button>
      </div>
    </div>
  );
}
