import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function TopUp() {
  const { gameSlug } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  const [userId, setUserId] = useState("");
  const [serverId, setServerId] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`/api/games/${gameSlug}`).then(res => res.json()),
      fetch(`/api/games/${gameSlug}/packages`).then(res => res.json()),
    ])
      .then(([gameData, packagesData]) => {
        setGame({
          ...gameData,
          products: packagesData
        });
      })
      .finally(() => setLoading(false));
  }, [gameSlug]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!game) return <p className="text-center mt-10">Game tidak ditemukan</p>;

  const canCheckout =
    userId &&
    selectedProduct &&
    (email || whatsapp);

  const handleCheckout = async () => {
  try {
    const res = await fetch("/api/topups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        game_id: game.id,
        package_id: selectedProduct.id,
        player_id: userId,
        server_id: serverId || null,
        email: email || null,
        payment_method: "UNSELECTED"
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Gagal membuat topup");
      return;
    }

    navigate("/checkout", {
      state: {
        topupId: data.data.topup_id,
        game,
        product: selectedProduct,
        userId,
        serverId,
        email,
        whatsapp
      }
    });

  } catch (e) {
    console.error(e);
    alert("Terjadi kesalahan");
  }
};

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-10 space-y-10">
      {/* HEADER */}
      <div className="flex items-center gap-5">
        <img
          src={game.image}
          alt={game.name}
          className="w-24 h-24 rounded-xl object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold">{game.name}</h1>
          <p className="text-gray-400 text-sm mt-1">
            Top up resmi & cepat, proses otomatis
          </p>
        </div>
      </div>

      {/* USER DATA */}
      <div className="bg-[#1c1c24] p-6 rounded-2xl border border-white/10 space-y-4">
        <h2 className="font-semibold">Data Player</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User ID"
            className="bg-[#121218] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#f3f305]"
          />
          <input
            value={serverId}
            onChange={(e) => setServerId(e.target.value)}
            placeholder="Server ID (opsional)"
            className="bg-[#121218] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#f3f305]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email untuk invoice"
            type="email"
            className="bg-[#121218] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#f3f305]"
          />
          <input
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="No WhatsApp (opsional)"
            className="bg-[#121218] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#f3f305]"
          />
        </div>

        <p className="text-xs text-gray-400">
          Minimal isi Email atau WhatsApp
        </p>
      </div>

      {/* PRODUK */}
      <div>
        <h2 className="text-xl font-bold mb-4">Pilih Nominal</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {game.products?.map((prod) => {
            const promo = prod.meta?.promo;
            const isSelected = selectedProduct?.id === prod.id;

            return (
              <button
                key={prod.id}
                onClick={() => setSelectedProduct(prod)}
                className={`relative text-left p-4 rounded-xl border transition
                  ${
                    isSelected
                      ? "border-[#f3f305] bg-[#2a2a18]"
                      : "border-white/10 bg-[#1c1c24] hover:border-[#f3f305]/50"
                  }`}
              >
                {promo && (
                  <span className="absolute top-2 right-2 text-xs bg-[#f3f305] text-black px-2 py-1 rounded">
                    {promo.label}
                  </span>
                )}

                <h3 className="font-semibold">{prod.name}</h3>

                {promo && (
                  <p className="text-xs text-green-400 mt-1">
                    Bonus +{promo.bonus_amount}
                  </p>
                )}

                <p className="mt-3 font-bold text-[#f3f305]">
                  Rp {prod.price.toLocaleString("id-ID")}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTION */}
      <button
        disabled={!canCheckout}
        onClick={handleCheckout}
        className={`w-full py-4 rounded-xl font-semibold transition
          ${
            canCheckout
              ? "bg-[#f3f305] text-black hover:brightness-110"
              : "bg-gray-600 text-gray-300 cursor-not-allowed"
          }`}
      >
        Lanjutkan Pembayaran
      </button>
    </div>
  );
}
