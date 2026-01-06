import React, { useState, useEffect } from "react";
import axios from "axios";
import "./topuppages.css";

const TopUpGamePage = ({ game, onBack }) => {

  const [bannerSrc, setBannerSrc] = useState(game?.banner);
  useEffect(() => {
     if(game?.banner) setBannerSrc(game.banner);
  }, [game]);

  // =========================================
  // 1. STATE DEFINITIONS
  // =========================================
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // State Input User
  const [userId, setUserId] = useState("");
  const [zoneId, setZoneId] = useState("");
  
  // State Baru: EMAIL
  const [email, setEmail] = useState(""); 
  
  // State Pilihan
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); 

  // =========================================
  // 2. DATA STATIC (Payment Methods)
  // =========================================
  const paymentMethods = [
    {
      group: "QRIS",
      items: [
        { id: "qris", name: "QRIS (All Payment)", price: 0, icon: "🔍" }
      ]
    },
    {
      group: "Transfer Bank (Virtual Account)",
      items: [
        { id: "bca", name: "BCA Virtual Account", price: 1000, icon: "🏦" },
        { id: "mandiri", name: "Mandiri Virtual Account", price: 1000, icon: "🏦" },
        { id: "bri", name: "BRI Virtual Account", price: 1000, icon: "🏦" },
        { id: "bni", name: "BNI Virtual Account", price: 1000, icon: "🏦" }
      ]
    },
    {
      group: "E-Wallet",
      items: [
        { id: "gopay", name: "GoPay", price: 200, icon: "👛" },
        { id: "dana", name: "DANA", price: 200, icon: "👛" },
        { id: "ovo", name: "OVO", price: 200, icon: "👛" },
        { id: "shopeepay", name: "ShopeePay", price: 200, icon: "👛" }
      ]
    }
  ];

  // =========================================
  // 3. LOGIC & CALCULATIONS
  // =========================================
  
  const totalPrice = selectedProduct ? selectedProduct.price * quantity : 0;
  const adminFee = selectedPayment ? selectedPayment.price : 0;
  const grandTotal = totalPrice + adminFee;

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleBuy = () => {
      if (!selectedProduct) return;
      alert(`Memproses pembelian:\nItem: ${selectedProduct.name} (x${quantity})\nEmail: ${email}\nMetode: ${selectedPayment.name}\nTotal Bayar: ${formatRupiah(grandTotal)}`);
  };

  // =========================================
  // 4. FETCH DATA
  // =========================================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        const url = `http://127.0.0.1:8000/api/games/${game.slug}`;
        console.log("Fetching URL:", url);

        const response = await axios.get(url);
        console.log("Data API Diterima:", response.data); 

        const dataItems = response.data.packages || response.data.products || [];
        
        setProducts(dataItems);

      } catch (error) {
        console.error("Gagal mengambil produk:", error);
        setProducts([]); 
      } finally {
        setLoading(false);
      }
    };

    if (game && game.slug) {
      fetchProducts();
    }
  }, [game]);

  const bannerImage = game?.banner || "https://placehold.co/1920x600/1a1a1a/ffd600?text=Banner+Game";

  return (
    <div className="topup-page dark-theme">
      
      {/* === HERO SECTION === */}
      <section className="hero-section">
        <div className="hero-bg-wrapper">
            <img 
              src={bannerSrc} 
              alt="Banner" 
              className="hero-bg"
              onError={() => setBannerSrc("https://placehold.co/1920x600/1a1a1a/ffd600?text=Banner+Missing")}
          />
        <img 
            src="/images/banner-effect.gif" 
            alt="Effect" 
            className="hero-gif-overlay" 
        />
        <div className="hero-overlay"></div>
    </div>

        <div className="hero-content container">
          <div className="hero-navbar">
              <div className="logo-placeholder" onClick={onBack} style={{cursor: 'pointer'}}>
                  ← KEMBALI
              </div>
              <div className="nav-links">
                  <span>Aman</span>
                  <span>Murah</span>
                  <span>Terpercaya</span>
              </div>
          </div>

          <div className="hero-text">
            <h1 className="hero-title">Top up<br/>{game.name}</h1>
            <p className="hero-subtitle">
              Top up {game.name} resmi region Indonesia. Lebih cepat, aman, dan terpercaya.
            </p>
            <button className="btn-yellow hero-btn" onClick={() => document.getElementById('section-nominal').scrollIntoView({behavior: 'smooth'})}>
                Beli Sekarang!
            </button>
          </div>
        </div>
        
        <div className="floating-game-icon container">
            <img src={game.image} alt={game.name} />
        </div>
      </section>

      {/* === MAIN LAYOUT === */}
      <div className="main-layout container">
        
        {/* --- KOLOM KIRI (FORM) --- */}
        <div className="left-column">
          
          {/* 1. DATA AKUN */}
          <div className="card-box">
            <div className="section-header">
              <div className="step-number">1</div>
              <h2 className="section-title">Masukkan Data Akun</h2>
            </div>
            <div className="input-row">
              <div className="input-group">
                  <label>User ID</label>
                  <input 
                    type="text"
                    placeholder="Ketikan User ID" 
                    className="custom-input"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
              </div>
              <div className="input-group">
                  <label>Zone ID (Opsional)</label>
                  <input 
                    type="text"
                    placeholder="Ketikan Zone ID" 
                    className="custom-input"
                    value={zoneId}
                    onChange={(e) => setZoneId(e.target.value)}
                  />
              </div>
            </div>
            <p className="helper-text">*Cek User ID Anda di bagian profil menu game.</p>
          </div>

          {/* 2. PILIH NOMINAL */}
          <div className="card-box" id="section-nominal">
            <div className="section-header">
              <div className="step-number">2</div>
              <h2 className="section-title">Pilih Nominal</h2>
            </div>

            {loading ? (
                <div className="loading-state">Sedang memuat produk...</div>
            ) : products.length === 0 ? (
                <div className="empty-state">
                    Belum ada produk tersedia untuk {game.name}.
                    <br/><small>(Pastikan API endpoint benar)</small>
                </div>
            ) : (
                <div className="nominal-grid">
                  {products.map((product) => (
                    <div 
                      key={product.id}
                      className={`item-card ${selectedProduct?.id === product.id ? 'active' : ''}`}
                      onClick={() => setSelectedProduct(product)}
                    >
                      {product.meta && product.meta.promo && (
                          <div className="flash-badge">
                            {product.meta.promo.label || "PROMO"}
                          </div>
                      )}
                      
                      {!product.meta && product.active && (
                          <div className="flash-badge">HOT</div>
                      )}

                      <div className="item-name">{product.name}</div>
                      <div className="price-area">
                        <div className="price-main">{formatRupiah(product.price)}</div>
                      </div>
                    </div>
                  ))}
                </div>
            )}
          </div>

          {/* 3. MASUKKAN JUMLAH */}
          <div className="card-box">
            <div className="section-header">
                <div className="step-number">3</div>
                <h3 className="section-title">Masukkan Jumlah</h3>
            </div>

            <div className="quantity-wrapper">
                <button className="qty-btn" onClick={handleDecrease}>−</button>
                <input 
                    type="text" 
                    className="qty-input" 
                    value={quantity} 
                    readOnly 
                />
                <button className="qty-btn" onClick={handleIncrease}>+</button>
            </div>
            
            <p className="helper-text" style={{marginTop: '10px'}}>
                Total item yang akan dikirim: 
                <span className="text-yellow"> {selectedProduct ? selectedProduct.name : '0'} x {quantity}</span>
            </p>
          </div>

          {/* 4. MASUKKAN EMAIL (BARU DITAMBAHKAN) */}
          <div className="card-box">
            <div className="section-header">
                <div className="step-number">4</div>
                <h2 className="section-title">Masukkan Email</h2>
            </div>
            
            <div className="input-group">
                <label style={{marginBottom: '8px', display:'block'}}>Alamat Email</label>
                <input 
                    type="email" 
                    placeholder="contoh: nama@email.com" 
                    className="custom-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p className="helper-text" style={{marginTop: '10px'}}>
                    *Bukti pembayaran dan kode voucher akan dikirim otomatis ke email ini.
                </p>
            </div>
          </div>
          
          {/* 5. PEMBAYARAN (Nomor Diupdate Jadi 5) */}
          <div className="card-box">
            <div className="section-header">
              <div className="step-number">5</div>
              <h2 className="section-title">Pilih Pembayaran</h2>
            </div>

            <div className="payment-container">
              {paymentMethods.map((group, index) => (
                <div key={index} className="payment-group">
                  <h4 className="payment-group-title">{group.group}</h4>
                  
                  <div className="payment-grid">
                    {group.items.map((method) => (
                      <div 
                        key={method.id}
                        className={`payment-option ${selectedPayment?.id === method.id ? 'selected' : ''}`}
                        onClick={() => setSelectedPayment(method)}
                      >
                        <div className="payment-info">
                            <span className="payment-icon">{method.icon}</span>
                            <span className="payment-name">{method.name}</span>
                        </div>
                        {selectedProduct && (
                            <div className="payment-price">
                                {formatRupiah((selectedProduct.price * quantity) + method.price)}
                            </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* --- KOLOM KANAN (SIDEBAR STICKY) --- */}
        <div className="right-column">
          <div className="sticky-sidebar">
            
            <div className="rating-card">
               <div className="rating-score">4.99</div>
               <div className="rating-stars">★★★★★</div>
               <div className="rating-text">Trusted by Gamers</div>
            </div>

            <div className="card-box summary-box">
              <h3 className="summary-title">Detail Pesanan</h3>
              
              <div className="summary-content">
                 {selectedProduct ? (
                    <>
                        <div className="summary-row">
                            <span>Item:</span>
                            <b>{selectedProduct.name} x{quantity}</b>
                        </div>
                        <div className="summary-row">
                            <span>ID:</span>
                            <b>{userId || "-"}</b>
                        </div>
                        <div className="summary-row">
                            <span>Email:</span>
                            <b>{email || "-"}</b>
                        </div>
                        
                        <div className="summary-row">
                            <span>Harga:</span>
                            <span>{formatRupiah(totalPrice)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Biaya Admin:</span>
                            <span>{formatRupiah(adminFee)}</span>
                        </div>
                        <div className="summary-hr"></div>

                        <div className="summary-row total-row">
                            <span>Total Bayar:</span>
                            <b className="text-yellow" style={{fontSize: '1.2rem'}}>
                                {formatRupiah(grandTotal)}
                            </b>
                        </div>
                        
                        <div className="summary-row" style={{fontSize: '0.8rem', color: '#888', marginTop:'5px'}}>
                            <span>Metode:</span>
                            <span>{selectedPayment ? selectedPayment.name : '-'}</span>
                        </div>
                    </>
                 ) : (
                    <div className="empty-msg">Pilih item terlebih dahulu</div>
                 )}
              </div>

              <button 
                className="btn-yellow btn-full btn-pesan"
                disabled={!selectedProduct || !userId || !selectedPayment || !email} 
                onClick={handleBuy}
              >
                Pesan Sekarang!
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default TopUpGamePage;