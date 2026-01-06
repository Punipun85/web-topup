import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!state) {
    return <p className="text-center mt-10">Data checkout tidak valid</p>;
  }

  const { game, product, userId, serverId, email, whatsapp, topupId } = state;

  const handleSubmit = async () => {
  if (!paymentMethod) {
    alert("Pilih metode pembayaran");
    return;
  }

  setSubmitting(true);

  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topup_id: topupId,
        payment_method: paymentMethod,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Gagal membuat order");
    }

    navigate(`/payment/${data.order_number}`);
  } catch (err) {
    console.error(err);
    alert("Gagal membuat order");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="max-w-[500px] mx-auto px-4 pt-10 space-y-6">
      <h1 className="text-2xl font-bold">Checkout</h1>

      {/* RINGKASAN */}
      <div className="bg-[#1c1c24] p-5 rounded-xl border border-white/10">
        <p><b>Game:</b> {game.name}</p>
        <p><b>User ID:</b> {userId}</p>
        {serverId && <p><b>Server:</b> {serverId}</p>}
        <p><b>Produk:</b> {product.name}</p>
        <p className="text-[#f3f305] font-bold mt-2">
          Rp {product.price.toLocaleString("id-ID")}
        </p>
      </div>

      {/* METODE PEMBAYARAN */}
      <div className="bg-[#1c1c24] p-5 rounded-xl border border-white/10 space-y-3">
        <h3 className="font-semibold">Metode Pembayaran</h3>

        {["QRIS", "DANA", "OVO", "VA_BCA"].map((m) => (
          <label
            key={m}
            className={`block p-3 rounded-lg border cursor-pointer
              ${
                paymentMethod === m
                  ? "border-[#f3f305] bg-[#2a2a18]"
                  : "border-white/10"
              }`}
          >
            <input
              type="radio"
              name="payment"
              className="hidden"
              onChange={() => setPaymentMethod(m)}
            />
            {m.replace("_", " ")}
          </label>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full bg-[#f3f305] text-black font-bold py-3 rounded-lg"
      >
        {submitting ? "Memproses..." : "Bayar Sekarang"}
      </button>
    </div>
  );
}
