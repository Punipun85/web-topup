import React, { useState } from "react";
import { FaStar, FaUndo, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Perhatikan path ini. Apakah file zodiac.css ada di folder yang sama?
// Jika tidak, sesuaikan path-nya (misal: "../styles/zodiac.css")
import "./zodiac.css";

// === KOMPONEN SVG RASI BINTANG (TIDAK BERUBAH) ===
const HorizontalConstellation = ({ active }) => (
  <svg viewBox="0 0 600 250" className={`h-constellation ${active ? 'active' : ''}`} preserveAspectRatio="xMidYMid meet">
    <defs>
      <filter id="blue-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <g className="star-content" filter={active ? "url(#blue-glow)" : ""}>
      <path d="M40,120 L120,100 L220,130" className="c-line main-path" />
      <path d="M220,130 L240,60 L330,50 L360,110 L220,130" className="c-line box-shape" />
      <path d="M360,110 L480,140 L550,180" className="c-line leg-path" />
      <path d="M120,100 L110,160" className="c-line branch-bottom" />
      <path d="M330,50 L340,15" className="c-line branch-top" />

      <circle cx="40" cy="120" r="4" className="c-star" />
      <circle cx="120" cy="100" r="5" className="c-star" />
      <circle cx="110" cy="160" r="4" className="c-star" />
      <circle cx="220" cy="130" r="6" className="c-star s-center" />
      <circle cx="240" cy="60" r="5" className="c-star" />
      <circle cx="330" cy="50" r="6" className="c-star" />
      <circle cx="360" cy="110" r="6" className="c-star" />
      <circle cx="340" cy="15" r="5" className="c-star" />
      <circle cx="480" cy="140" r="5" className="c-star" />
      <circle cx="550" cy="180" r="10" className="c-star spica-star" />
      
      <path 
        d="M550,165 L550,195 M535,180 L565,180" 
        className={`cross-flare ${active ? 'visible' : ''}`}
        stroke="white" strokeWidth="2" 
      />

      <circle cx="80" cy="60" r="2" className="c-star faint" />
      <circle cx="180" cy="180" r="2" className="c-star faint" />
      <circle cx="300" cy="90" r="2" className="c-star faint" />
      <circle cx="420" cy="40" r="2" className="c-star faint" />
      <circle cx="520" cy="80" r="2" className="c-star faint" />
    </g>
  </svg>
);

const Kalkulatorzodiac = () => {
  const navigate = useNavigate();
  const [point, setPoint] = useState(0);
  const [neededDiamond, setNeededDiamond] = useState(1700);

  // === LOGIC MATEMATIKA YANG DIPERBARUI ===
  const calculateDiamonds = (val) => {
    let currentPoint = parseInt(val) || 0;
    
    // Validasi input min/max
    if (currentPoint > 100) currentPoint = 100;
    if (currentPoint < 0) currentPoint = 0;

    let result = 0;

    // === RUMUS UTAMA ===
    if (currentPoint <= 89) {
      // 0 - 89 Poin: 1700 - (Poin * 17)
      result = 1700 - (currentPoint * 17);
    } else {
      // 90 - 100 Poin: 200 - ((Poin - 90) * 20)
      result = 200 - ((currentPoint - 90) * 20);
    }

    // Mencegah hasil negatif
    if (result < 0) result = 0;

    // Update State
    setPoint(currentPoint);
    setNeededDiamond(result);
  };

  const handleChange = (e) => {
    calculateDiamonds(e.target.value);
  };

  const handleReset = () => {
    setPoint(0);
    setNeededDiamond(1700);
  };

  return (
    <div className="z-page">
      <div className="z-bg-stars"></div>
      
      <div className="z-layout-wide">
        
        {/* Visualisasi Horizontal */}
        <div className="z-visual-horizontal">
           <div className="z-drawing-area">
               <div className="z-layer-h base">
                 <HorizontalConstellation active={false} />
               </div>

               <div 
                 className="z-layer-h lit"
                 style={{ 
                   clipPath: `inset(0 ${100 - point}% 0 0)` 
                 }}
               >
                  <HorizontalConstellation active={true} />
               </div>

               <div 
                 className="z-floating-indicator" 
                 style={{ 
                   left: `${point}%`,
                   opacity: point > 0 ? 1 : 0 
                 }}
               >
                 <div className="z-laser-line"></div>
                 <div className="z-glow-dot"></div>
                 <span className="z-float-text">{Math.round(point)}%</span>
               </div>
           </div>
        </div>

        {/* === UI CARD === */}
        <div className="z-card-wide glass">
          <div className="z-row-top">
             <div className="z-text-info">
               <h3>Zodiac Summon</h3>
               <p>Geser slider untuk estimasi diamond</p>
             </div>
             
             <div className="z-result-box">
                <small>BUTUH SEKITAR</small>
                <div className="z-dm-val">
                  <span className="gem-icon">💎</span>
                  {/* UPDATE: Menggunakan variabel state hasil hitungan */}
                  <span>{neededDiamond}</span> 
                </div>
             </div>
          </div>

          {/* Slider Panjang */}
          <div className="z-slider-container">
            <input
              type="range"
              min="0"
              max="100"
              value={point}
              // UPDATE: Menggunakan handleChange agar hitungan berjalan real-time
              onChange={handleChange} 
              className="z-slider-wide"
            />
             <div className="z-slider-track-highlight" style={{ width: `${point}%` }}></div>
          </div>

          <div className="z-actions">
             <div className="z-manual-wrap">
               <FaStar color="#a855f7" />
               <input 
                 type="number" 
                 value={point} 
                 // UPDATE: Input manual juga memicu hitungan
                 onChange={handleChange}
                 placeholder="0"
               />
             </div>
             
             <div className="z-btn-group">
                <button className="z-btn-reset" onClick={handleReset} title="Reset">
                  <FaUndo />
                </button>
                <button className="z-btn-topup" onClick={() => navigate('/topup')}>
                  Top Up <FaChevronRight />
                </button>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Kalkulatorzodiac;