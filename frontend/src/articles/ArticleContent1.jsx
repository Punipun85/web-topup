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
          Build Badang Cooldown: Cepat, Tahan Lama, dan Menguasai Pertempuran
        </h1>
        
        <div className={styles.authorMeta}>
          Ditulis Oleh <span className={styles.authorYellow}>Mintime</span> Pada Dec 27, 2025 02:00 PM
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
          <img src="/images/Badang.png" alt="Build Badang Cooldown" className={styles.mainImage} />
          <div className={styles.watermark}>A6TOPUP</div>
        </div>

        {/* ISI ARTIKEL */}
        <div className={styles.articleBody}>
          <p>
            Badang merupakan hero fighter yang sangat kuat ketika fokus pada Cooldown Reduction.
            Build berikut akan membuatnya lebih lincah, tahan lama, dan sulit ditaklukkan lawan.
          </p>

          <hr className={styles.divider} />

          <section className={styles.heroSection}>
            <h3>1. Tough Boots</h3>
            <ul>
              <li><strong>Manfaat:</strong> Meningkatkan movement speed dan mempercepat bebas dari crowd control hingga 30%.</li>
              <li><strong>Keterangan:</strong> Cocok untuk meningkatkan mobilitas Badang di medan perang.</li>
            </ul>
          </section>

          <hr className={styles.divider} />

          <section className={styles.heroSection}>
            <h3>2. Thunder Belt</h3>
            <ul>
              <li><strong>Statistik:</strong> +800 HP, +15 Physical Defense, +15 Magic Defense, +20 Movement Speed.</li>
              <li><strong>Pasif Unik:</strong> Memberikan true damage dan meningkatkan Hybrid Defense permanen.</li>
            </ul>
          </section>

          <hr className={styles.divider} />

          <section className={styles.heroSection}>
            <h3>3. Oracle</h3>
            <ul>
              <li><strong>Manfaat:</strong> Meningkatkan efek shield dan regenerasi HP hingga 30%.</li>
            </ul>
          </section>

          <hr className={styles.divider} />

          <section className={styles.heroSection}>
            <h3>4. Queen’s Wings</h3>
            <ul>
              <li><strong>Pasif Demonize:</strong> Memberikan 30% Damage Reduction saat HP dibawah 40%.</li>
            </ul>
          </section>

          <hr className={styles.divider} />

          <section className={styles.heroSection}>
            <h3>5. Brute Force Breastplate</h3>
            <ul>
              <li><strong>Statistik:</strong> +600 HP, +23 Physical Defense, +10% Cooldown Reduction.</li>
            </ul>
          </section>

          <hr className={styles.divider} />

          <section className={styles.heroSection}>
            <h3>6. Athena’s Shield (Opsional)</h3>
            <ul>
              <li><strong>Fungsi:</strong> Melawan hero mage burst. Bisa diganti dengan Immortality sesuai kebutuhan.</li>
            </ul>
          </section>

          <hr className={styles.divider} />

          <p>
            Untuk memaksimalkan Cooldown Reduction, gunakan <strong>Custom Support Emblem</strong>.
          </p>

          <p>
            Top up Diamond Mobile Legends aman dan harga terbaik langsung di <strong>A6TOPUP</strong>.
          </p>
        </div>
      </main>

      {/* SIDEBAR (KANAN) */}
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Artikel Populer</h2>
        <div className={styles.popularContainer}>
          {/* Path diarahkan ke detail (Fredrinn) dan detail2 (Leomord) */}
          <PopularItem 
            image="/images/BUILD.png"   
            title="Build Fredrinn Jungle Terkuat! Tebal, Sustain, dan Bikin Musuh Frustrasi" 
            date="May 22, 2025" 
            path="/artikel/detail"
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

// Komponen PopularItem dengan Link navigasi
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