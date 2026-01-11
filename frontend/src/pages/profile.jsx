import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import { FaCog } from "react-icons/fa";
import ProfileSidebar from "../sidebar/ProfileSidebar";
import "../assets/dashboard.css";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  // =====================
  // FETCH PROFILE
  // =====================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        setProfile(res.data);
        setForm({
          name: res.data.name || "",
          phone: res.data.phone || "",
        });
      } catch (err) {
        console.error("Gagal ambil profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // =====================
  // UPDATE PROFILE
  // =====================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/profile", form);
      alert("Profile berhasil diperbarui");
    } catch (err) {
      console.error(err);
      alert("Gagal update profile");
    }
  };

  // =====================
  // UPLOAD AVATAR
  // =====================
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await api.post("/profile/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfile((prev) => ({
        ...prev,
        avatar: res.data.avatar,
      }));
    } catch (err) {
      console.error("Upload avatar gagal:", err);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: 100, color: "white" }}>
        Loading profile...
      </div>
    );
  }

  return (
    <>
      <div className="dashboard-page">
        {/* SIDEBAR KHUSUS PROFILE */}
        <ProfileSidebar />

        <div className="dashboard-content">
          {/* ================= PROFILE CARD ================= */}
          <div className="card profile-card">
            <div className="profile-details">
              <label htmlFor="avatar-upload" style={{ cursor: "pointer" }}>
                <img
                  src={
                    profile?.avatar
                      ? `http://127.0.0.1:8000/storage/${profile.avatar}`
                      : "/default-avatar.png"
                  }
                  alt="Avatar"
                  className="avatar-img"
                />
              </label>

              <input
                type="file"
                id="avatar-upload"
                hidden
                accept="image/*"
                onChange={handleAvatarChange}
              />

              <div className="info">
                <div className="name-row">
                  <h4>{profile.name}</h4>
                  <FaCog />
                </div>
                <span className="badge-member">{profile.role}</span>
              </div>
            </div>

            <div className="profile-footer">
              <p>📧 {profile.email}</p>
              <p>📞 {profile.phone || "-"}</p>
            </div>
          </div>

          {/* ================= EDIT FORM ================= */}
          <div className="card" style={{ marginTop: 30 }}>
            <h3>Edit Profile</h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nama</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Nomor HP</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                />
              </div>

              <button type="submit" className="btn-primary">
                Simpan Perubahan
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}