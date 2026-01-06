import { useState } from "react";
import Navbar from "../../../navbar/navbar";
import Footer from "../../../footer/footer";
import { FaHeadset } from "react-icons/fa";
import "../../styles/winrate.css";

export default function WinrateCalculator() {
  const [match, setMatch] = useState("");
  const [winrate, setWinrate] = useState("");
  const [target, setTarget] = useState("");
  const [result, setResult] = useState(null);

  const hitung = () => {
    const m = parseInt(match);
    const currentWR = parseFloat(winrate) / 100;
    const targetWR = parseFloat(target) / 100;

    // VALIDASI
    if (
      !m ||
      isNaN(currentWR) ||
      isNaN(targetWR) ||
      currentWR <= 0 ||
      currentWR >= 1 ||
      targetWR <= 0 ||
      targetWR >= 1
    ) {
      alert("Masukkan data yang valid");
      return;
    }

    // JIKA SUDAH TERCAPAI
    if (currentWR >= targetWR) {
      setResult("Winrate kamu sudah mencapai target 🎉");
      return;
    }

    // 🔥 RUMUS TAKAPEDIA ASLI
    const tambahanMatch = Math.ceil(
      (m * (targetWR - currentWR)) / (1 - targetWR)
    );

    setResult(
      `Kamu membutuhkan sekitar ${tambahanMatch} pertandingan lagi tanpa kalah untuk mencapai ${target}% win rate`
    );
  };

  return (
    <>
      <Navbar />

      <div className="winrate-page">
        {/* LOGO TENGAH */}
        <img
          src="/images/logo.png"
          alt="Logo"
          className="logo-center"
        />

        <h1>Kalkulator Win Rate</h1>
        <p className="subtitle">
          Digunakan untuk menghitung jumlah pertandingan tambahan untuk mencapai
          target win rate yang diinginkan.
        </p>

        <div className="winrate-form">
          <label>Total Pertandingan Kamu Saat Ini</label>
          <input
            type="number"
            placeholder="Contoh: 951"
            value={match}
            onChange={(e) => setMatch(e.target.value)}
          />

          <label>Win Rate Kamu Saat Ini (%)</label>
          <input
            type="number"
            step="0.1"
            placeholder="Contoh: 53.6"
            value={winrate}
            onChange={(e) => setWinrate(e.target.value)}
          />

          <label>Target Win Rate (%)</label>
          <input
            type="number"
            placeholder="Contoh: 60"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />

          <div className="btn-group">
            <button className="btn-primary" onClick={hitung}>
              Hitung
            </button>
            <button className="btn-secondary">
              Pesan Joki
            </button>
          </div>

          {result && <div className="result-box">{result}</div>}
        </div>
      </div>

      {/* CUSTOMER SERVICE FLOATING */}
      <div className="customer-service">
        <FaHeadset />
        <span>CUSTOMER SERVICE</span>
      </div>

      <Footer />
    </>
  );
}
