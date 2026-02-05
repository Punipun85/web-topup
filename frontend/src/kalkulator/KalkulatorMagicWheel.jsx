import React, { useState } from "react";
import { FaGem, FaMagic, FaUndo } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
import "./magicwheel.css"; 

const KalkulatorMagicWheel = () => {
  const navigate = useNavigate();
  
  // State
  const [point, setPoint] = useState(0);
  const [neededDiamond, setNeededDiamond] = useState(10800);

  // Fungsi Logika Perhitungan
  const calculateDiamonds = (val) => {
    let result = 0;
    const currentPoint = parseInt(val) || 0;

    // Batas maksimal poin Magic Wheel adalah 200
    if (currentPoint >= 200) {
      setNeededDiamond(0);
      return;
    }

    // LOGIKA:
    // 0–194: Setiap 5 poin mengurangi 270 diamond dari total 10800
    if (currentPoint <= 194) {
      const step = Math.floor(currentPoint / 5);
      result = 10800 - (step * 270);
    } 
    // 195–199: Rule manual (Makin dekat makin murah)
    else {
      const custom = {
        195: 270,
        196: 240,
        197: 180,
        198: 120,
        199: 60,
      };
      result = custom[currentPoint] ?? 60;
    }

    // Mencegah hasil negatif
    if (result < 0) result = 0;
    
    setNeededDiamond(result);
  };

  // Handle Perubahan Input (Slider & Text)
  const handleChange = (val) => {
    // Validasi agar tidak lebih dari 200
    if (val > 200) val = 200;
    if (val < 0) val = 0;
    
    setPoint(val);
    calculateDiamonds(val);
  };

  // Tombol Reset
  const handleReset = () => {
    setPoint(0);
    setNeededDiamond(10800);
  };

  return (
    <div className="calc-wrapper">
      {/* Background Blobs (Biru Magic) */}
      <div className="calc-blob blob-primary"></div>
      <div className="calc-blob blob-secondary"></div>

      <div className="calc-container">
        {/* KARTU KIRI: Input Data */}
        <div className="calc-card">
          <div className="calc-header">
            <div className="icon-wrapper">
              <FaMagic size={24} />
            </div>
            <div className="calc-title">
              <h1>Magic Wheel</h1>
              <p>Hitung sisa diamond untuk skin Legend.</p>
            </div>
          </div>

          {/* Input Angka Manual */}
          <div className="input-group">
            <label className="input-label">
              <FaGem /> Poin Magic Wheel Saat Ini
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                className="calc-input"
                placeholder="Contoh: 150"
                value={point}
                onChange={(e) => handleChange(e.target.value)}
                min="0"
                max="200"
              />
              <span className="input-suffix">Pts</span>
            </div>
          </div>

          {/* Input Slider (Geser) */}
          <div className="input-group">
            <label className="input-label" style={{ justifyContent: 'space-between' }}>
              <span>Geser untuk estimasi cepat</span>
              <span>{point} / 200</span>
            </label>
            <input 
              type="range" 
              min="0" 
              max="200" 
              value={point} 
              onChange={(e) => handleChange(e.target.value)}
              className="calc-range"
            />
          </div>

          {/* Tombol Aksi */}
          <div className="btn-group">
            <button className="btn-reset" onClick={handleReset} title="Reset">
              <FaUndo />
            </button>
            <button className="btn-primary" onClick={() => navigate('/buy')}>
              Top Up Diamond Sekarang
            </button>
          </div>
        </div>

        {/* KARTU KANAN: Hasil Perhitungan */}
        <div className="result-card">
          <div className="result-inner">
            <span className="res-label">Estimasi Biaya</span>
            
            {/* Angka Besar */}
            <div className="res-number">
              {neededDiamond.toLocaleString("id-ID")}
            </div>
            
            <div className="res-subtitle">Diamond Dibutuhkan</div>

            {/* Detail Kecil */}
            <div className="res-details">
              <div className="detail-row">
                <span>Poin Saat Ini</span>
                <span className="text-highlight">{point} Poin</span>
              </div>
              <div className="detail-row">
                <span>Maksimal Poin</span>
                <span className="text-mono">200 Poin</span>
              </div>
              <div className="detail-row">
                <span>Sisa Poin</span>
                <span className="text-mono">{200 - point} Poin</span>
              </div>
            </div>

            <p className="res-quote">
              "Skin Legend sudah di depan mata, ayo lengkapi koleksimu!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KalkulatorMagicWheel;