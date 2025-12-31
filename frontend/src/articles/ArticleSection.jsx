import React from "react"
import { Link } from "react-router-dom"
import "./article.css"

export default function ArticleSection({ isPreview = false }) {
  const articles = [
    {
      id: 1,
      title: "Build Fredrinn Tersakit! Musuh Auto Kena Mental - Experiment Labs Mobile Legends",
      image: "/images/BUILD.png",
      tag: "Mintime",
      path: "/artikel/detail" // Mengarah ke ArticleContent.jsx
    },
    {
      id: 2,
      title: "Build Badang Cooldown: Cepat, Tahan Lama, dan Menguasai Pertempuran",
      image: "/images/Badang.png",
      tag: "Mintime",
      path: "/artikel/detail1" // MENGARAH KE ArticleContent1.jsx (Tengah)
    },
    {
      id: 3,
      title: "Update Patch Notes Original Server Versi 2.1.30",
      image: "/images/leomord.png",
      tag: "Mintime",
      path: "/artikel/detail2" // Kembali ke ArticleContent.jsx
    }
  ]

  // Jika di halaman home (preview), batasi jumlah
  const displayedArticles = isPreview ? articles.slice(0, 3) : articles

  return (
    <section className="article-section">
      <div className="article-header">
        <h2>ARTIKEL TERBARU & BERITA GAME</h2>
        <p>
          Dapatkan informasi terbaru seputar dunia game, panduan, dan update terkini.
        </p>
      </div>

      <div className="article-grid">
        {displayedArticles.map((item) => (
          <Link
            key={item.id}
            to={item.path} // PERUBAHAN: Sekarang dinamis mengikuti path di atas
            state={{ article: item }}
            target={isPreview ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="article-card"
            style={{ textDecoration: "none" }}
          >
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
          </Link>
        ))}
      </div>
    </section>
  )
}