import GameCard from "./GameCard";

export default function GameGrid({ games, onSelectGame }) {
  if (!games.length) {
    return (
      <p className="text-center text-white/50 mt-10">
        Game belum tersedia
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-20">
      {games.map(game => (
        <GameCard
          key={game.id}
          game={game}
          onClick={onSelectGame}
        />
      ))}
    </div>
  );
}
