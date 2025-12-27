import React from "react";
import "./article.css";

export default function ArticleSection() {
  const articles = [
    {
      title: "Build Saber Tersakit! Musuh Auto Kena Mental - Experiment Labs Mobile Legends",
      image: "/images/hok.png",
      tag: "Mintime",
    },
    {
      title: "Cara Melihat Limit Weekly Diamond Pass (WDP)",
      image: "/images/genshinimpact.png",
      tag: "Mintime",
    },
    {
      title: "Update Patch Notes Original Server Versi 2.1.30",
      image: "/images/A6 TOPUP.png",
      tag: "Mintime",
    },
  ];

  return (
    <section className="article-section">
      <div className="article-header">
        <h2>ARTIKEL TERBARU & BERITA GAME</h2>
        <p>
          Dapatkan informasi terbaru seputar dunia game, panduan, dan update
          terkini.
        </p>
      </div>

      <div className="article-grid">
        {articles.map((item, index) => (
          <div className="article-card" key={index}>
            {/* INNER supaya RGB tidak ketutup */}
            <div className="article-inner">
              <div className="article-image">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="article-overlay"></div>

              <div className="article-content">
                <span className="article-tag">{item.tag}</span>
                <h3>{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
