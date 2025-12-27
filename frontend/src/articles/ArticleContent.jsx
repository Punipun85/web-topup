import React from 'react';
import { Calendar, User, Clock } from 'lucide-react';
import styles from './ArticleContent.module.css';

const ArticleContent = () => {
  return (
    <article className={styles.container}>
      {/* Thumbnail */}
      <div className={styles.thumbnailWrapper}>
        <img
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop"
          alt="Game update patch notes"
          className={styles.thumbnail}
        />
      </div>

      <div className={styles.contentBody}>
        {/* Meta Data */}
        <div className={styles.metaData}>
          <div className={styles.metaItem}>
            <Calendar size={16} />
            <span>December 15, 2024</span>
          </div>
          <div className={styles.metaItem}>
            <User size={16} />
            <span>Admin Takapedia</span>
          </div>
          <div className={styles.metaItem}>
            <Clock size={16} />
            <span>5 min read</span>
          </div>
        </div>

        {/* Title */}
        <h1 className={styles.mainTitle}>
          Update Patch Notes Advance Server Terbaru Versi 1.9.74 - Buff, Nerf & Adjustment Hero
        </h1>

        <div className={styles.textContent}>
          <p className={styles.leadText}>
            Mobile Legends: Bang Bang kembali menghadirkan update terbaru untuk Advance Server dengan versi 1.9.74. 
            Update kali ini membawa berbagai perubahan signifikan terhadap beberapa hero.
          </p>

          {/* Hero Buff */}
          <h2 className={styles.subTitle}>Hero Buff</h2>
          <div className={`${styles.card} ${styles.buffCard}`}>
            <h3 className={styles.heroName}>Layla</h3>
            <ul className={styles.list}>
              <li>Base damage increased from 115 to 125</li>
              <li>Skill 1 range extended by 10%</li>
              <li>Ultimate cooldown reduced from 45s to 40s</li>
            </ul>
          </div>

          <div className={`${styles.card} ${styles.buffCard}`}>
            <h3 className={styles.heroName}>Tigreal</h3>
            <ul className={styles.list}>
              <li>Base HP increased from 2650 to 2750</li>
              <li>Skill 2 damage increased by 15%</li>
              <li>Movement speed increased from 260 to 265</li>
            </ul>
          </div>

          {/* Hero Nerf */}
          <h2 className={styles.subTitle}>Hero Nerf</h2>
          <div className={`${styles.card} ${styles.nerfCard}`}>
            <h3 className={styles.heroName}>Ling</h3>
            <ul className={styles.list}>
              <li>Ultimate damage reduced by 12%</li>
              <li>Energy consumption increased for Skill 1</li>
              <li>Base attack speed reduced from 0.9 to 0.85</li>
            </ul>
          </div>

          {/* Item Changes */}
          <h2 className={styles.subTitle}>Item Changes</h2>
          <ul className={styles.itemRef}>
            <li><strong>Blade of Despair:</strong> Physical attack increased from +160 to +170</li>
            <li><strong>Oracle:</strong> Magic resistance increased from +36 to +42</li>
          </ul>

          {/* Note Section */}
          <div className={styles.noteBox}>
            <h3 className={styles.noteTitle}>Catatan Penting</h3>
            <p>
              Semua perubahan ini masih dalam tahap testing di Advance Server dan dapat berubah sebelum dirilis ke Original Server.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleContent;