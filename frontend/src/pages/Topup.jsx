import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TopUp() {
  const { gameSlug } = useParams();
  const [game, setGame] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/games/${gameSlug}`)
      .then((res) => res.json())
      .then((data) => setGame(data))
      .finally(() => setLoading(false));
  }, [gameSlug]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!game) return <p className="text-center mt-10">Game tidak ditemukan</p>;

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-10 space-y-10">
      {/* HEADER GAME */}
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

      {/* USER ID */}
      <div className="bg-[#1c1c24] p-6 rounded-2xl border border-white/10">
        <h2 className="font-semibold mb-4">Masukkan User ID</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="User ID"
            className="bg-[#121218] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#f3f305]"
          />
          <input
            type="text"
            placeholder="Server ID (opsional)"
            className="bg-[#121218] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#f3f305]"
          />
        </div>
      </div>

      {/* PAKET TOPUP */}
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
        disabled={!selectedProduct}
        className={`w-full py-4 rounded-xl font-semibold transition
          ${
            selectedProduct
              ? "bg-[#f3f305] text-black hover:brightness-110"
              : "bg-gray-600 text-gray-300 cursor-not-allowed"
          }`}
      >
        Lanjutkan Pembayaran
      </button>
    </div>
  );
}
