import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Payment() {
  const { orderCode } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/orders/${orderCode}`)
      .then(res => res.json())
      .then(data => setOrder(data))
      .finally(() => setLoading(false));
  }, [orderCode]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!order) return <p className="text-center mt-10">Order tidak ditemukan</p>;

  return (
    <div className="max-w-[500px] mx-auto px-4 pt-10 space-y-6">
      <h1 className="text-2xl font-bold">Instruksi Pembayaran</h1>

      <div className="bg-[#1c1c24] p-5 rounded-xl space-y-2">
        <p><b>Order:</b> {order.order_code}</p>
        <p><b>Game:</b> {order.game_name}</p>
        <p><b>Paket:</b> {order.package_name}</p>
        <p><b>Total:</b> Rp {order.amount.toLocaleString("id-ID")}</p>
        <p><b>Metode:</b> {order.payment_method}</p>
        <p className="mt-2 text-yellow-400">
          Status: {order.status}
        </p>
      </div>

      {order.payment_method === "QRIS" && (
        <div className="bg-[#1c1c24] p-5 rounded-xl text-center">
          <p className="mb-3">Scan QR berikut</p>
          <img src={order.qr_image} alt="QRIS" className="mx-auto" />
        </div>
      )}

      {order.payment_method === "VA_BCA" && (
        <div className="bg-[#1c1c24] p-5 rounded-xl">
          <p>No Virtual Account:</p>
          <p className="text-xl font-bold mt-2">{order.va_number}</p>
        </div>
      )}
    </div>
  );
}
