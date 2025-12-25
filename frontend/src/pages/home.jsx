import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import GameGrid from "../components/gamegrid";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  const banners = [
    "/images/baner1.png",
    "/images/baner2.png",
    "/images/banner3.jpg"
  ];

  useEffect(() => {
    fetch("/api/games")
      .then(res => res.json())
      .then(data => setGames(data)) // ⚠️ API kamu langsung array
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto px-4 pt-10">
      <Banner banners={banners} />

      <GameGrid
        games={games}
        onSelectGame={(game) => navigate(`/topup/${game.slug}`)}
      />
    </div>
  );
}
