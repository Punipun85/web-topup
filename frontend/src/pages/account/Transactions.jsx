import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../assets/account.css";
import AccountLayout from "../../layouts/AccountLayout";

export default function Transactions() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/account/transactions").then(res => setData(res.data));
  }, []);

  return (
    <AccountLayout title="Transaksi" subtitle="Riwayat transaksi Anda">
    <div className="account-page">
      <h1>Transaksi</h1>

      {data.length === 0 ? (
        <p>Belum ada transaksi</p>
      ) : (
        <ul>
          {data.map(t => (
            <li key={t.id}>
              {t.invoice_id} — {t.amount} — {t.status}
            </li>
          ))}
        </ul>
      )}
    </div>
    </AccountLayout>
  );
}
