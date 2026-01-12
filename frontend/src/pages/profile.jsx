import { useEffect, useState } from "react";
import api from "../services/api";
import ProfileSidebar from "../sidebar/ProfileSidebar";
import { FaCog } from "react-icons/fa";
import "../assets/dashboard.css";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", phone: "" });

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/profile");
        setProfile(res.data);
        setForm({
          name: res.data.name || "",
          phone: res.data.phone || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put("/profile", form);
    alert("Profil diperbarui");
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("avatar", file);

    const res = await api.post("/profile/avatar", fd);
    setProfile((p) => ({ ...p, avatar: res.data.avatar }));
  };

  if (loading) {
    return <div className="profile-loading">Loading profile…</div>;
  }

  return (
    <>
      <div className="dashboard-page">
        <ProfileSidebar />

        <div className="dashboard-content">
          {/* ===== PROFILE CARD ===== */}
          <div className="profile-card">
            <div className="profile-top">
              <label htmlFor="avatar-upload" className="avatar-wrapper">
                <img
                  src={
                    profile.avatar
                      ? `http://127.0.0.1:8000/storage/${profile.avatar}`
                      : "/default-avatar.png"
                  }
                  alt="Avatar"
                />
              </label>

              <input
                type="file"
                id="avatar-upload"
                hidden
                accept="image/*"
                onChange={handleAvatarChange}
              />

              <div className="profile-meta">
                <div className="name-row">
                  <h2>{profile.name}</h2>
                  <FaCog />
                </div>
                <span className="role-badge">{profile.role}</span>

                <div className="contact-info">
                  <p>📧 {profile.email}</p>
                  <p>📞 {profile.phone || "-"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ===== EDIT PROFILE ===== */}
          <div className="edit-card">
            <h3>Edit Profil</h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nama</label>
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Nomor HP</label>
                <input
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                />
              </div>

              <div className="form-actions">
                <button className="btn-primary">
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
