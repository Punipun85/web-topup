import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../assets/account.css";
import AccountLayout from "../../layouts/AccountLayout";

export default function Settings() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    api.get("/account/settings").then(res => setSettings(res.data));
  }, []);

  if (!settings) return null;

  return (
    <AccountLayout title="Pengaturan" subtitle="Atur preferensi akun Anda">
    <div className="account-page">
      <h1>Pengaturan</h1>

      <label>
        <input type="checkbox" checked={settings.dark_mode} readOnly />
        Dark Mode
      </label>

      <br />

      <label>
        <input type="checkbox" checked={settings.email_notification} readOnly />
        Email Notification
      </label>
    </div>
    </AccountLayout>
  );
}
