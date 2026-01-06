import { useEffect, useState } from "react";
import api from "../../services/api";
import StatusBadge from "../components/StatusBadge";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/admin/topups")
      .then(res => setOrders(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = (id, status) => {
    api.put(`/admin/topups/${id}/status`, { status })
      .then(() => {
        setOrders(prev =>
          prev.map(o =>
            o.id === id ? { ...o, status } : o
          )
        );
      });
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <>
      <h1>Orders</h1>

      <table>
        <thead>
          <tr>
            <th>Kode</th>
            <th>Game</th>
            <th>Target</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.topup_code}</td>
              <td>{o.game?.name}</td>
              <td>{o.player_id}</td>
              <td>Rp {o.amount}</td>
              <td><StatusBadge status={o.status} /></td>
              <td>
                {o.status === "pending" && (
                  <>
                    <button
                      className="success"
                      onClick={() => updateStatus(o.id, "success")}
                    >
                      Success
                    </button>
                    <button
                      className="danger"
                      onClick={() => updateStatus(o.id, "failed")}
                    >
                      Failed
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
