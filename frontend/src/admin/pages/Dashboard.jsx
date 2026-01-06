import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setStats(res.data);
      } catch {
        setError("Gagal memuat dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!stats) return <p>Data kosong</p>;

  return (
    <>
      <h1>Dashboard</h1>

      <div className="cards">
        <Card title="Pending" value={stats.pending} />
        <Card title="Success" value={stats.success} />
        <Card title="Failed" value={stats.failed} />
        <Card
          title="Revenue Hari Ini"
          value={`Rp ${Number(stats.today_total).toLocaleString("id-ID")}`}
        />
      </div>
    </>
  );
}

function Card({ title, value }) {
  return (
    <div className="card">
      <small>{title}</small>
      <div className="value">{value}</div>
    </div>
  );
}
