import React, { useEffect } from 'react' // Tambahkan useEffect
import { Link } from 'react-router-dom' // Tambahkan Link untuk navigasi
import { Facebook, Twitter, Linkedin, Mail, Link as LinkIcon } from 'lucide-react'
import styles from './ArticleContent.module.css'

const ArticleContent = () => {
  // Efek agar layar otomatis scroll ke atas saat artikel dibuka
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* KONTEN UTAMA (KIRI) */}
      <main className={styles.mainContent}>
        <div className={styles.categoryBadge}>Mobile Legends</div>
        <h1 className={styles.mainTitle}>
          Build Fredrinn Jungle Terkuat! Tebal, Sustain, dan Bikin Musuh Frustrasi
        </h1>
        
        <div className={styles.authorMeta}>
          Ditulis Oleh <span className={styles.authorYellow}>Mintime</span> Pada May 22, 2025 08:34 PM
        </div>

        {/* Share Buttons */}
        <div className={styles.shareGroup}>
          <button className={`${styles.shareBtn} ${styles.bgFb}`}><Facebook size={16}/> Facebook</button>
          <button className={`${styles.shareBtn} ${styles.bgTw}`}><Twitter size={16}/> Twitter</button>
          <button className={`${styles.shareBtn} ${styles.bgIn}`}><Linkedin size={16}/> LinkedIn</button>
          <button className={`${styles.shareBtn} ${styles.bgEm}`}><Mail size={16}/> Email</button>
          <button className={`${styles.shareBtn} ${styles.bgCp}`}><LinkIcon size={16}/> Copy Link</button>
        </div>

        {/* Thumbnail Image */}
        <div className={styles.imageContainer}>
          <img src="/images/BUILD.png" alt="Build Fredrinn Jungle" className={styles.mainImage} />
          <div className={styles.watermark}>A6TOPUP</div>
        </div>

        {/* ISI ARTIKEL */}
        <div className={styles.articleBody}>
          <p>
            Fredrinn merupakan salah satu hero tank-fighter yang sangat kuat jika dimainkan
            sebagai jungler. Dengan sustain tinggi dan kemampuan crowd control yang menyebalkan,
            Fredrinn mampu menjadi garis depan yang sulit ditumbangkan, bahkan saat late game.
          </p>

          <hr className={styles.divider} />

          <section className={styles.heroSection}>
            <h3>1. Tough Boots (Ice Hunter’s Blessing)</h3>
            <ul>
              <li><strong>Fungsi Utama:</strong> Menambah movement speed dan mengurangi durasi crowd control.</li>
              <li><strong>Efek Tambahan:</strong> Ice Hunter’s Blessing memberikan efek slow 30%.</li>
            </ul>
          </section>

<hr className={styles.divider} />

          <section className={styles.heroSection}>
            <h3>2. Thunder Belt</h3>
            <ul>
              <li><strong>Keunggulan:</strong> Memberikan HP, Physical Defense, Magic Defense, dan movement speed.</li>
              <li><strong>Pasif Unik:</strong> Basic attack menghasilkan true damage dan slow.</li>
            </ul>
          </section>

<hr className={styles.divider} />


          <section className={styles.heroSection}>
            <h3>3. Oracle</h3>
            <ul>
              <li><strong>Manfaat:</strong> Meningkatkan efek regenerasi HP dan shield hingga 30%.</li>
            </ul>
          </section>

          <hr className={styles.divider} />

          <section className={styles.heroSection}>
            <h3>4. Blade Armor</h3>
            <ul>
              <li><strong>Counter Marksman:</strong> Mengurangi critical damage dan memantulkan damage lawan.</li>
            </ul>
          </section>

          <hr className={styles.divider} />

          <section className={styles.heroSection}>
            <h3>5. Radiant Armor</h3>
            <ul>
              <li><strong>Anti Mage Poke:</strong> Menambah Magic Defense secara bertahap.</li>
            </ul>
          </section>

          <hr className={styles.divider} />

          <section className={styles.heroSection}>
            <h3>6. Winter Crown</h3>
            <ul>
              <li><strong>Skill Aktif:</strong> Membekukan diri dan kebal terhadap damage.</li>
            </ul>
          </section>

          <hr className={styles.divider} />

          <p>
            Dengan kombinasi item di atas, Fredrinn akan menjadi jungler yang sangat sulit ditumbangkan.
          </p>

          <p>
            Top up Diamond Mobile Legends aman dan terpercaya hanya di <strong>A6TOPUP</strong>.
          </p>
        </div>
      </main>

      {/* SIDEBAR (KANAN) */}
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Artikel Populer</h2>
        <div className={styles.popularContainer}>
          {/* Tambahkan properti 'path' sesuai Route di App.js */}
          <PopularItem 
            image="/images/Badang.png" 
            title="Build Badang Cooldown: Cepat, Tahan Lama, dan Menguasai Pertempuran" 
            date="May 22, 2025" 
            path="/artikel/detail1" 
          />
          <PopularItem 
            image="/images/leomord.png" 
            title="Build Leomord Tersakit: Full Damage dan Lincah di Pertempuran" 
            date="October 22, 2024" 
            path="/artikel/detail2"
          />
        </div>

        <h2 className={styles.sidebarTitle}>Top Up Game</h2>
        <div className={styles.topupList}>
          <button className={styles.topupBtn}>MOBILE LEGEND</button>
          <button className={styles.topupBtn}>PUBGM</button>
          <button className={styles.topupBtn}>GENSHIN IMPACT</button>
          <button className={styles.topupBtn}>FREE FIRE</button>
        </div>
      </aside>
    </div>
  )
}

// Komponen PopularItem menggunakan Link untuk koneksi antar halaman
const PopularItem = ({ image, title, date, path }) => (
  <Link to={path} className={styles.popCard} style={{ textDecoration: 'none', color: 'inherit' }}>
    <div className={styles.popThumb}>
        <img src={image} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
    <div className={styles.popInfo}>
      <span className={styles.miniBadge}>Mobile Legends</span>
      <h4>{title}</h4>
      <span>{date}</span>
    </div>
  </Link>
)

export default ArticleContent