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
          Build Leomord Tersakit: Full Damage dan Lincah di Pertempuran
        </h1>
        
        <div className={styles.authorMeta}>
          Ditulis Oleh <span className={styles.authorYellow}>Mintime</span> Pada Dec 27, 2025 02:30 PM
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
          <img src="/images/leomord.png" alt="Build Leomord Tersakit" className={styles.mainImage} />
          <div className={styles.watermark}>A6TOPUP</div>
        </div>

        {/* ISI ARTIKEL */}
        <div className={styles.articleBody}>
          <p>
            Leomord adalah hero fighter yang mematikan ketika dibekali build full damage. Dengan kombinasi item
            dan emblem yang tepat, Leomord bisa menguasai pertempuran dan dengan cepat menekan lawan.
          </p>

          <hr className={styles.divider} />

          <section className={styles.heroSection}>
            <h3>1. Tough Boots</h3>
            <ul>
              <li><strong>Statistik:</strong> +40 Movement Speed, +18 Magic Defense.</li>
              <li><strong>Pasif:</strong> Mengurangi durasi Crowd Control sebesar 25%.</li>
            </ul>
          </section>

          <hr className={styles.divider} />

          <section className={styles.heroSection}>
            <h3>2. Hunter Strike</h3>
            <ul>
              <li><strong>Statistik:</strong> +80 Physical Attack, +10% Cooldown Reduction.</li>
              <li><strong>Pasif Unik:</strong> Menambah 50% Movement Speed setelah menyerang berturut-turut.</li>
            </ul>
          </section>

          <hr className={styles.divider} />

          <section className={styles.heroSection}>
            <h3>3. War Axe</h3>
            <ul>
              <li><strong>Statistik:</strong> +35 Physical Attack, +400 HP, +12% Spell Vamp.</li>
              <li><strong>Pasif:</strong> Memberikan tambahan True Damage saat stack penuh.</li>
            </ul>
          </section>

          <hr className={styles.divider} />

          <section className={styles.heroSection}>
            <h3>4. Great Dragon Spear</h3>
            <ul>
              <li><strong>Statistik:</strong> +70 Physical Attack, +20% Critical Chance.</li>
              <li><strong>Pasif:</strong> Meningkatkan 30% Movement Speed setelah menggunakan Ultimate.</li>
            </ul>
          </section>

          <hr className={styles.divider} />

          <section className={styles.heroSection}>
            <h3>5. Malefic Roar</h3>
            <ul>
              <li><strong>Pasif:</strong> Armor Buster meningkatkan Physical Penetration secara signifikan.</li>
            </ul>
          </section>

          <hr className={styles.divider} />

          <section className={styles.heroSection}>
            <h3>6. Blade of Despair</h3>
            <ul>
              <li><strong>Statistik:</strong> +160 Physical Attack, +5% Movement Speed.</li>
              <li><strong>Pasif:</strong> Meningkatkan damage saat HP musuh di bawah 50%.</li>
            </ul>
          </section>

          <hr className={styles.divider} />

          <p>
            Kombinasi item ini membuat Leomord menjadi hero yang sangat mematikan di fase late game.
          </p>

          <p>
            Dapatkan Diamond Mobile Legends harga termurah hanya di <strong>A6TopUp</strong>.
          </p>
        </div>
      </main>

      {/* SIDEBAR (KANAN) */}
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Artikel Populer</h2>
        <div className={styles.popularContainer}>
          <PopularItem 
            image="/images/BUILD.png" 
            title="Build Fredrinn Jungle Terkuat! Tebal, Sustain, dan Bikin Musuh Frustrasi" 
            date="May 22, 2025" 
            path="/artikel/detail"
          />
          <PopularItem 
            image="/images/Badang.png" 
            title="Build Badang Cooldown: Cepat, Tahan Lama, dan Menguasai Pertempuran" 
            date="October 22, 2024" 
            path="/artikel/detail1"
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

// Komponen PopularItem dengan navigasi internal
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