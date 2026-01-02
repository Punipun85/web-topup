import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Leaderboard.css'; // Kita buat CSS-nya di langkah 2

const Leaderboard = () => {
    const [topSultans, setTopSultans] = useState([]);
    const [loading, setLoading] = useState(true);

    // Simulasi Fetch Data dari Backend
    useEffect(() => {
    const fetchLeaderboard = async () => {
        try {
            // Arahkan ke IP Laravel Anda (biasanya port 8000)
            const res = await axios.get('http://127.0.0.1:8000/api/leaderboard');
            
            setTopSultans(res.data); // Masukkan data dari Laravel ke State
            setLoading(false);
        } catch (error) {
            console.error("Gagal ambil data:", error);
            setLoading(false);
        }
    };

    fetchLeaderboard();
}, []);

    // Helper untuk format Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    return (
        <div className="leaderboard-section">
            <div className="container">
                <div className="leaderboard-header">
                    <h2 className="text-yellow">🏆 TOP SULTAN BULAN INI</h2>
                    <p>Orang-orang paling berkuasa di Land of Dawn</p>
                </div>

                <div className="leaderboard-card">
                    {loading ? (
                        <p className="loading-text">Sedang memuat data sultan...</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="leaderboard-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Player</th>
                                        <th>Total Top Up</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topSultans.map((user, index) => (
                                        <tr key={index} className={`rank-${user.rank}`}>
                                            <td className="rank-col">
                                                {user.rank === 1 && <span className="crown-icon">👑</span>}
                                                {user.rank === 2 && <span className="medal-icon">🥈</span>}
                                                {user.rank === 3 && <span className="medal-icon">🥉</span>}
                                                <span className="rank-number">{user.rank}</span>
                                            </td>
                                            <td className="user-col">
                                                <div className="user-info">
                                                    <span className="username">{user.username}</span>
                                                    {user.rank === 1 && <span className="badge-vip">SULTAN</span>}
                                                </div>
                                            </td>
                                            <td className="total-col text-yellow">
                                                {formatRupiah(user.total)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;