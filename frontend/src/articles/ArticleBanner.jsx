import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ArticleBanner.css';

export default function ArticleBanner() {
  const slides = [
    {
      img: "/images/banerartikel1.png",
      category: "Mobile Legends",
      title: "Most Picked Hero Mobile Legends \n Episode 3 - May Week 4"
    },
    {
      img: "/images/banerartikel2.png", // Sesuaikan path gambar Anda
      category: "Mobile Legends",
      title: "Build Badang Cooldown: \n Cepat dan Mematikan"
    },
    {
      img: "/images/banerartikel3.png", // Sesuaikan path gambar Anda
      category: "Mobile Legends",
      title: "Buil Leomord Terkuat 2025"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section className="art-banner-section">
      <div className="art-banner-container">
        <div className="art-banner-inner-grid">
          
          {/* KIRI: AREA GAMBAR */}
          <div className="art-banner-image-side">
            <button className="art-nav-btn art-left" onClick={prevSlide}>
              <ChevronLeft size={24} />
            </button>

            <img
              src={slides[currentIndex].img}
              alt="Banner Article"
              className="art-main-img"
            />

            <button className="art-nav-btn art-right" onClick={nextSlide}>
              <ChevronRight size={24} />
            </button>

            <div className="art-dots-group">
              {slides.map((_, index) => (
                <span
                  key={index}
                  className={`art-dot ${index === currentIndex ? 'art-dot-active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* KANAN: AREA TULISAN (DIPULIHKAN) */}
          <div className="art-content-side">
            <span className="art-badge">{slides[currentIndex].category}</span>
            <h2 className="art-title">
              {slides[currentIndex].title.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line} <br />
                </React.Fragment>
              ))}
            </h2>
          </div>

        </div>
      </div>
    </section>
  );
}