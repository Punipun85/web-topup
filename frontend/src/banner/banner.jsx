import React, { useEffect } from 'react';
import './banner.css';

export default function Banner({ currentBanner, setCurrentBanner, daftarBanner }) {

  // 🔁 AUTO SLIDE
  useEffect(() => {
    if (!daftarBanner || daftarBanner.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentBanner(prev =>
        prev === daftarBanner.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [daftarBanner, setCurrentBanner]);

  return (
    <div className="banner">
      <div className="banner-image-wrapper">
        <img
          src={daftarBanner[currentBanner]}
          alt="Banner"
          className="banner-image"
        />
      </div>

      {/* BUTTON PREV / NEXT */}
      <div className="banner-nav">
        <button
          className="banner-btn"
          onClick={() =>
            setCurrentBanner(c => c === 0 ? daftarBanner.length - 1 : c - 1)
          }
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="3"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <button
          className="banner-btn"
          onClick={() =>
            setCurrentBanner(c => c === daftarBanner.length - 1 ? 0 : c + 1)
          }
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="3"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
