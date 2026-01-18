import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../assets/account.css";
import AccountLayout from "../../layouts/AccountLayout";

export default function Affiliations() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/account/affiliates").then(res => setData(res.data));
  }, []);

  if (!data) return null;

  return (
    <AccountLayout title="Afiliasi" subtitle="Informasi afiliasi Anda">
    <div className="account-page">
      <h1>Afiliasi</h1>
      <p>Kode Referral: <b>{data.referral_code}</b></p>
      <p>Total Referral: {data.total_referral}</p>
      <p>Total Komisi: {data.total_commission}</p>
    </div>
    </AccountLayout>
  );
}
