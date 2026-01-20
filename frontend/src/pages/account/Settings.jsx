import React, { useEffect, useMemo, useState } from "react";
import "../../assets/settings.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  const token = useMemo(() => localStorage.getItem("token"), []);
  const API_BASE = "http://";

  const [profile, setProfile] = useState({
    phone: "",
    email: "",
  });

  const [emailPassword, setEmailPassword] = useState("");

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info"); // "success" | "error" | "info"

  const setMsg = (text, type = "info") => {
    setMessage(text);
    setMessageType(type);
  };

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  });

  const parseErrorMessage = async (res) => {
    // coba ambil json error Laravel (message / errors)
    let data = null;
    try {
      data = await res.json();
    } catch {
      // fallback kalau bukan json
    }

    if (data?.message) return data.message;
    if (data?.errors) {
      const flat = Object.values(data.errors).flat();
      if (flat.length) return flat.join(", ");
    }
    return `Request gagal (${res.status})`;
  };

  // =========================
  // FETCH PROFILE
  // =========================
  useEffect(() => {
    if (!token) {
      setMsg("Kamu belum login. Token tidak ditemukan.", "error");
      return;
    }

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/me`, {
          headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const errMsg = await parseErrorMessage(res);
          throw new Error(errMsg);
        }

        const data = await res.json();

        setProfile({
          phone: data?.phone || "",
          email: data?.email || "",
        });
      } catch (err) {
        setMsg(err.message || "Gagal mengambil data profil", "error");
      }
    })();
  }, [token]);

  // =========================
  // UPDATE PHONE
  // =========================
  const updatePhone = async () => {
    if (!token) return setMsg("Token tidak ada. Silakan login ulang.", "error");
    if (!profile.phone?.trim()) return setMsg("Nomor HP tidak boleh kosong.", "error");

    setLoading(true);
    setMsg("");

    try {
      const res = await fetch(`${API_BASE}/api/profile/phone`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ phone: profile.phone.trim() }),
      });

      if (!res.ok) {
        const errMsg = await parseErrorMessage(res);
        throw new Error(errMsg);
      }

      const data = await res.json().catch(() => null);
      setMsg(data?.message || "Nomor HP berhasil diperbarui.", "success");
    } catch (err) {
      setMsg(err.message || "Gagal update nomor HP.", "error");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UPDATE EMAIL (WAJIB kirim password sesuai backend)
  // =========================
  const updateEmail = async () => {
    if (!token) return setMsg("Token tidak ada. Silakan login ulang.", "error");
    if (!profile.email?.trim()) return setMsg("Email tidak boleh kosong.", "error");
    if (!emailPassword) return setMsg("Masukkan password untuk konfirmasi email.", "error");

    setLoading(true);
    setMsg("");

    try {
      const res = await fetch(`${API_BASE}/api/profile/email`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({
          email: profile.email.trim(),
          password: emailPassword,
        }),
      });

      if (!res.ok) {
        const errMsg = await parseErrorMessage(res);
        throw new Error(errMsg);
      }

      const data = await res.json().catch(() => null);
      setMsg(data?.message || "Email berhasil diperbarui.", "success");
      setEmailPassword("");
    } catch (err) {
      setMsg(err.message || "Gagal update email.", "error");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UPDATE PASSWORD
  // (Backend kamu minta current_password, password, password_confirmation)
  // =========================
  const updatePassword = async () => {
    if (!token) return setMsg("Token tidak ada. Silakan login ulang.", "error");

    const { current_password, password, password_confirmation } = passwordForm;

    if (!current_password || !password || !password_confirmation) {
      return setMsg("Semua field password wajib diisi.", "error");
    }
    if (password !== password_confirmation) {
      return setMsg("Konfirmasi password tidak cocok.", "error");
    }

    setLoading(true);
    setMsg("");

    try {
      const res = await fetch(`${API_BASE}/api/profile/password`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(passwordForm),
      });

      if (!res.ok) {
        const errMsg = await parseErrorMessage(res);
        throw new Error(errMsg);
      }

      const data = await res.json().catch(() => null);
      setMsg(data?.message || "Password berhasil diperbarui.", "success");

      setPasswordForm({
        current_password: "",
        password: "",
        password_confirmation: "",
      });
    } catch (err) {
      setMsg(err.message || "Gagal update password.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-section">
        {/* HEADER */}
        <div className="settings-header">
          <button
            className="btn-back-settings"
            onClick={() => navigate(-1)}
            aria-label="Kembali"
            type="button"
          >
            <FaArrowLeft />
          </button>
          <h2>Pengaturan Akun</h2>
        </div>

        <p className="section-desc">
          Kelola nomor HP, email, dan password akun kamu.
        </p>

        {message ? (
          <p className={`settings-message ${messageType}`}>{message}</p>
        ) : null}

        <div className="settings-grid">
          {/* PHONE */}
          <div className="settings-group">
            <label>Nomor HP</label>
            <input
              className="settings-input"
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              placeholder="+62..."
              autoComplete="tel"
            />
            <button className="btn-yellow" onClick={updatePhone} disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan Nomor"}
            </button>
          </div>

          {/* EMAIL */}
          <div className="settings-group">
            <label>Email</label>
            <input
              className="settings-input"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              placeholder="email@contoh.com"
              autoComplete="email"
            />

            <label>Password (konfirmasi)</label>
            <input
              className="settings-input"
              type="password"
              value={emailPassword}
              onChange={(e) => setEmailPassword(e.target.value)}
              placeholder="Masukkan password akun"
              autoComplete="current-password"
            />

            <button className="btn-yellow" onClick={updateEmail} disabled={loading}>
              {loading ? "Memproses..." : "Ganti Email"}
            </button>
          </div>

          <div className="settings-group full-width">
            <hr className="settings-divider" />
          </div>

          {/* PASSWORD */}
          <div className="settings-group full-width">
            <label>Password Lama</label>
            <input
              className="settings-input"
              type="password"
              placeholder="Password lama"
              value={passwordForm.current_password}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, current_password: e.target.value })
              }
              autoComplete="current-password"
            />

            <label>Password Baru</label>
            <input
              className="settings-input"
              type="password"
              placeholder="Password baru"
              value={passwordForm.password}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, password: e.target.value })
              }
              autoComplete="new-password"
            />

            <label>Konfirmasi Password Baru</label>
            <input
              className="settings-input"
              type="password"
              placeholder="Konfirmasi password baru"
              value={passwordForm.password_confirmation}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  password_confirmation: e.target.value,
                })
              }
              autoComplete="new-password"
            />

            <button className="btn-yellow" onClick={updatePassword} disabled={loading}>
              {loading ? "Memproses..." : "Ganti Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
