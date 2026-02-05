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
      } catch  {
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

  const pending = stats.status_summary?.pending ?? 0;
  const success = stats.status_summary?.success ?? 0;
  const failed  = stats.status_summary?.failed ?? 0;
  const revenueToday = Number(stats.kpi?.revenue_today ?? 0);

  return (
    <>
      <h1>Dashboard</h1>

      <div className="cards">
        <Card title="Pending" value={pending} />
        <Card title="Success" value={success} />
        <Card title="Failed" value={failed} />
        <Card
          title="Revenue Hari Ini"
          value={`Rp ${revenueToday.toLocaleString("id-ID")}`}
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
