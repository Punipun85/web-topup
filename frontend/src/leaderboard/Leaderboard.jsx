import { useEffect, useState } from "react";
import axios from "axios";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [topSultans, setTopSultans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/leaderboard");
        setTopSultans(res.data || []);
      } catch (error) {
        console.error("Gagal ambil data leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number || 0);

  return (
    <section className="leaderboard-section">
      <div className="leaderboard-container">
        <header className="leaderboard-header">
          <h2>🏆 Top Sultan Bulan Ini</h2>
          <p>Player dengan total top up tertinggi</p>
        </header>

        <div className="leaderboard-card">
          {loading ? (
            <p className="loading-text">Memuat data leaderboard...</p>
          ) : topSultans.length === 0 ? (
            <p className="empty-text">Belum ada data leaderboard</p>
          ) : (
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Player</th>
                  <th>Total Top Up</th>
                </tr>
              </thead>
              <tbody>
                {topSultans.map((user, index) => {
                  const rank = user.rank ?? index + 1;
                  const rankClass =
                    rank <= 3 ? `rank-${rank}` : "rank-default";

                  return (
                    <tr key={index} className={rankClass}>
                      <td className="rank-col">
                        {rank === 1 && <span className="crown-icon">👑</span>}
                        {rank === 2 && <span>🥈</span>}
                        {rank === 3 && <span>🥉</span>}
                        <span className="rank-number">{rank}</span>
                      </td>
                      <td>
                        <span className="username">{user.username}</span>
                        {rank === 1 && (
                          <span className="badge-vip">SULTAN</span>
                        )}
                      </td>
                      <td className="total-col">
                        {formatRupiah(user.total)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
