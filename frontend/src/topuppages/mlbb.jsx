import React, { useState } from "react";
import "./topuppages.css"; // Pastikan CSS ini ada dan sesuai yang terakhir kita buat

export default function Mlbb() {
  // --- DATA STATIS KHUSUS MLBB ---
  const gameInfo = {
    name: "Mobile Legends",
    region: "REGION INDONESIA",
    banner: "/images/banner3.jpg", // Pastikan path gambar benar
  };

  // Data Item dengan Kategori
  const mlbbItems = [
    // KATEGORI 1: FLASH SALE
    { id: 1, category: "⚡ FLASH SALE", name: "Weekly Diamond Pass", price: 27777, originalPrice: 30000, label: "HEMAT" },
    { id: 2, category: "⚡ FLASH SALE", name: "Twilight Pass", price: 138000, originalPrice: 150000, label: "PROMO" },
    { id: 3, category: "⚡ FLASH SALE", name: "5 Diamonds", price: 1425, originalPrice: 2000, label: "MURAH" },

    // KATEGORI 2: MEMBERSHIP
    { id: 4, category: "👑 MEMBERSHIP", name: "Starlight Member", price: 165000 },
    { id: 5, category: "👑 MEMBERSHIP", name: "Starlight Premium", price: 330000 },

    // KATEGORI 3: DIAMONDS
    { id: 6, category: "💎 DIAMONDS FAST", name: "86 Diamonds (78+8)", price: 19650 },
    { id: 7, category: "💎 DIAMONDS FAST", name: "172 Diamonds (156+16)", price: 39300 },
    { id: 8, category: "💎 DIAMONDS FAST", name: "257 Diamonds (234+23)", price: 58900 },
    { id: 9, category: "💎 DIAMONDS FAST", name: "344 Diamonds (312+32)", price: 78500 },
    { id: 10, category: "💎 DIAMONDS FAST", name: "429 Diamonds (390+39)", price: 98100 },
    { id: 11, category: "💎 DIAMONDS FAST", name: "706 Diamonds (625+81)", price: 158500 },
  ];

  // --- STATE ---
  const [userId, setUserId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [qty, setQty] = useState(1);
  const [promoCode, setPromoCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("QRIS"); // Default QRIS
  const [whatsapp, setWhatsapp] = useState("");

  // Logic Hitung Total
  const totalPrice = selectedItem ? selectedItem.price * qty : 0;

  // Logic Mengelompokkan Item per Kategori
  const groupedItems = mlbbItems.reduce((acc, item) => {
    const cat = item.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div className="topup-page">
      
      {/* 1. HERO BANNER */}
      <section className="hero-section">
        <img src={gameInfo.banner} alt="MLBB Banner" className="hero-bg" />
        <div className="hero-content">
          <h1 className="hero-title">{gameInfo.name}</h1>
          <div style={{ marginTop: '10px' }}>
             <span className="official-badge">OFFICIAL</span>
             <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{gameInfo.region}</span>
          </div>
        </div>
      </section>

      {/* 2. LAYOUT UTAMA */}
      <div className="main-layout">
        
        {/* KOLOM KIRI (FORM) */}
        <div className="left-column">
          
          {/* NOMOR 1: DATA AKUN (User ID & Zone ID) */}
          <div className="card-box">
            <div className="section-header">
              <div className="step-number">1</div>
              <h2 className="section-title">Masukkan Data Akun</h2>
            </div>
            <div className="input-row">
              <input 
                type="text"
                placeholder="User ID" 
                className="custom-input"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              <input 
                type="text"
                placeholder="Zone ID" 
                className="custom-input"
                style={{ maxWidth: '35%' }}
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value)}
              />
            </div>
            <p className="helper-text">*Contoh: 12345678 (1234). Cek ID di profil game kiri atas.</p>
          </div>

          {/* NOMOR 2: PILIH NOMINAL (DENGAN KATEGORI) */}
          <div className="card-box">
            <div className="section-header">
              <div className="step-number">2</div>
              <h2 className="section-title">Pilih Nominal</h2>
            </div>

            {/* Render Setiap Kategori */}
            {Object.keys(groupedItems).map((categoryName) => (
              <div key={categoryName} className="category-group">
                <h3 className="category-header">{categoryName}</h3>
                
                <div className="nominal-grid">
                  {groupedItems[categoryName].map((item) => (
                    <div 
                      key={item.id}
                      className={`item-card ${selectedItem?.id === item.id ? 'active' : ''}`}
                      onClick={() => setSelectedItem(item)}
                    >
                      {/* Badge Label */}
                      {item.label && <div className="flash-badge">{item.label}</div>}
                      
                      <div className="item-name">{item.name}</div>
                      
                      <div className="price-area">
                        {item.originalPrice && (
                          <div className="price-coret">Rp {item.originalPrice.toLocaleString()}</div>
                        )}
                        <div className="price-main">Rp {item.price.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* NOMOR 3: JUMLAH PEMBELIAN */}
          <div className="card-box">
            <div className="section-header">
              <div className="step-number">3</div>
              <h2 className="section-title">Masukkan Jumlah Pembelian</h2>
            </div>
            <div className="qty-wrapper">
              <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
              <div className="qty-value">{qty}</div>
              <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
            </div>
          </div>

          {/* NOMOR 4: KODE PROMO */}
          <div className="card-box">
            <div className="section-header">
              <div className="step-number">4</div>
              <h2 className="section-title">Kode Promo</h2>
            </div>
            <div className="promo-group">
              <input 
                placeholder="Masukkan Kode Promo (Opsional)" 
                className="custom-input"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button className="btn-apply">Gunakan</button>
            </div>
          </div>

          {/* NOMOR 5: PEMBAYARAN */}
          <div className="card-box">
            <div className="section-header">
              <div className="step-number">5</div>
              <h2 className="section-title">Pilih Pembayaran</h2>
            </div>
            
            <div className="payment-header">E-Wallet / QRIS</div>
            <div className="payment-items">
              {['QRIS', 'GoPay', 'DANA', 'OVO'].map(p => (
                <div key={p} 
                     className={`pay-card ${paymentMethod === p ? 'active' : ''}`}
                     onClick={() => setPaymentMethod(p)}>{p}</div>
              ))}
            </div>

            <div className="payment-header">Virtual Account</div>
            <div className="payment-items">
              {['BCA VA', 'Mandiri VA', 'BRI VA', 'BNI VA'].map(p => (
                <div key={p} 
                     className={`pay-card ${paymentMethod === p ? 'active' : ''}`}
                     onClick={() => setPaymentMethod(p)}>{p}</div>
              ))}
            </div>
          </div>

          {/* NOMOR 6: NOMOR WHATSAPP */}
          <div className="card-box">
            <div className="section-header">
              <div className="step-number">6</div>
              <h2 className="section-title">Nomor WhatsApp</h2>
            </div>
            <input 
              type="number"
              placeholder="08xxxxxxxxxx" 
              className="custom-input"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <p className="helper-text">*Bukti pembayaran akan dikirim otomatis ke WhatsApp ini.</p>
          </div>

        </div>

        {/* KOLOM KANAN (SIDEBAR STICKY) */}
        <div className="right-column">
          <div className="sticky-sidebar">
            
            {/* Rating Box */}
            <div className="rating-card">
               <div className="logo-circle">TK</div>
               <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>4.99 <span style={{ color: '#ffd600' }}>★★★★★</span></div>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>Trusted by 10k+ Gamers</div>
               </div>
            </div>

            {/* Detail Pesanan */}
            <div className="card-box detail-box">
              <h3 style={{ margin: 0, borderBottom: '1px solid #444', paddingBottom: '15px', marginBottom: '15px' }}>Detail Pesanan</h3>
              
              <div className="detail-row">
                 <span>Item:</span>
                 <b>{selectedItem ? selectedItem.name : '-'}</b>
              </div>
              <div className="detail-row">
                 <span>ID:</span>
                 <b>{userId || '-'} {zoneId ? `(${zoneId})` : ''}</b>
              </div>
              <div className="detail-row">
                 <span>Metode:</span>
                 <b>{paymentMethod}</b>
              </div>
              
              <div className="total-price" style={{ marginTop: '20px' }}>
                 Rp {totalPrice.toLocaleString()}
              </div>

              <button className="btn-pesan">
                PESAN SEKARANG
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}