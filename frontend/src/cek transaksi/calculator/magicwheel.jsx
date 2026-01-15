import { useState } from "react";
import Navbar from "../../../navbar/navbar";
import Footer from "../../../footer/footer";
import { FaHeadset } from "react-icons/fa";
import "../../styles/magicwheel.css";

export default function MagicWheel() {
  const [point, setPoint] = useState(0);
  const [diamond, setDiamond] = useState(10800);

  const hitungDiamond = (value) => {
    let result = 0;

    // 0–194 mengikuti pola -270 tiap 5 poin
    if (value <= 194) {
      const step = Math.floor(value / 5);
      result = 10800 - step * 270;
    } 
    // 195–199 manual rule
    else {
      const custom = {
        195: 270,
        196: 240,
        197: 180,
        198: 120,
        199: 60,
      };
      result = custom[value] ?? 60;
    }

    if (result < 60) result = 60;
    setDiamond(result);
  };

  const handleChange = (e) => {
    const val = Number(e.target.value);
    setPoint(val);
    hitungDiamond(val);
  };

  return (
    <>
      <Navbar />

      <div className="magic-page">
        <img
          src="/images/logo.png"
          alt="Magic Wheel"
          className="magic-logo"
        />

        <h1>Kalkulator Magic Wheel</h1>
        <p className="subtitle">
          Digunakan untuk menghitung estimasi diamond yang dibutuhkan
          untuk mendapatkan skin Legend.
        </p>

        <div className="slider-box">
          <p className="slider-label">
            Geser sesuai dengan poin Magic Wheel kamu
          </p>

          <input
            type="range"
            min="0"
            max="199"
            value={point}
            onChange={handleChange}
            className="slider"
          />

          <div className="magic-info">
            <span>Poin Bintang: <b>{point}</b></span>
            <span>Butuh <b>{diamond}</b> Diamond</span>
          </div>

          <button className="btn-primary">
            Top Up Diamond Sekarang
          </button>
        </div>
      </div>

      <div className="customer-service">
        <FaHeadset />
        <span>CUSTOMER SERVICE</span>
      </div>

      <Footer />
    </>
  );
}
