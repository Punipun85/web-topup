import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../assets/account.css";
import AccountLayout from "../../layouts/AccountLayout";

export default function Mutations() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/account/mutations").then(res => setData(res.data));
  }, []);

  return (
    <AccountLayout title="Mutasi" subtitle="Riwayat mutasi Anda">
    <div className="account-page">
      <h1>Mutasi</h1>

      {data.length === 0 ? (
        <p>Belum ada mutasi</p>
      ) : (
        <ul>
          {data.map((m, i) => (
            <li key={i}>
              +{m.amount} ({m.created_at})
            </li>
          ))}
        </ul>
      )}
    </div>
    </AccountLayout>
  );
}
