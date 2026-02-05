import React from "react";
import "./gamegrid.css";
import { useNavigate } from "react-router-dom";



export default function GameGrid({ games, onGameClick }) {
  return (
    
    <section className="game-section">

      {/* TAB MENU (SEJAJAR GRID) */}
      <div className="tab-container">
        {/* <button className="btn active">Game Populer</button> */}
        <button className="btn">Game Populer</button>
        {/* <button className="btn">Specialist PUBGM</button> */}
      </div>

      {/* GRID GAME CARD */}
      <div className="game-grid">
        {games.map((game, index) => (
          <div className="game-card"
            key={index}
            onClick={() => onGameClick(game)}
          >

            {/* BADGE */}
            <span className="badge-hot">HOT</span>

            {/* IMAGE + BUTTON */}
            <div className="game-image-wrapper">
              <button className="game-play-btn">TOP UP</button>

              <img
                src={game.image} 
                alt={game.name} 
                className="game-image" 
                loading="lazy"
              />
            </div>

            {/* INFO */}
<div className="game-info">
  <p className="game-title">{game.name}</p>
  <p className="game-subtitle">{game.publisher}</p>
</div>


          </div>
        ))}
      </div>

    </section>



  );
}
