export default function GameCard({ game, onClick }) {
  return (
    <div
      onClick={() => onClick(game)}
      className="bg-[#1c1c24] p-4 rounded-2xl cursor-pointer
                 hover:scale-105 transition shadow-lg"
    >
      <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-[#252531]">
        <img
          src={game.image}
          alt={game.name}
          className="w-full h-full object-cover"
        />
      </div>

      <p className="text-center text-xs font-bold">
        {game.name}
      </p>
    </div>
  );
}
