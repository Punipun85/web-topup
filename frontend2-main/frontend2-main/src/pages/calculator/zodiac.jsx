import { useState } from "react";
import Navbar from "../../../navbar/navbar";
import Footer from "../../../footer/footer";
import { FaHeadset } from "react-icons/fa";
import "../../styles/zodiac.css";

export default function Zodiac() {
  const [point, setPoint] = useState(0);
  const [diamond, setDiamond] = useState(1700);

  const hitungDiamond = (value) => {
    let result = 0;

    if (value <= 89) {
      result = 1700 - value * 17;
    } else {
      result = 200 - (value - 90) * 20;
    }

    if (result < 0) result = 0;
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

      <div className="zodiac-page">
        <img src="/images/logo.png" alt="Zodiac" className="zodiac-logo" />

        <h1>Kalkulator Zodiac</h1>
        <p className="subtitle">
          Digunakan untuk mengetahui total estimasi diamond yang dibutuhkan untuk
          mendapatkan skin Zodiac.
        </p>

        <div className="slider-box">
          <p className="slider-label">
            Geser sesuai dengan Titik Zodiac Kamu
          </p>

          <input
            type="range"
            min="0"
            max="99"
            value={point}
            onChange={handleChange}
            className="slider"
          />

          <div className="zodiac-info">
            <span>Poin Bintang Kamu <b>{point}</b></span>
            <span>Membutuhkan Maksimal <b>{diamond}</b> Diamond</span>
          </div>

          <button className="btn-primary">
            Top Up Diamond Sekarang!
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
