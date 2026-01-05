import React, { useState, useEffect } from "react";
import axios from "axios";
import "./topuppages.css";

const TopUpGame = ({ game, onBack }) => {

  const [bannerSrc, setBannerSrc] = useState(game?.banner);
  useEffect(() => {
     if(game?.banner) setBannerSrc(game.banner);
  }, [game]);

  // =========================================
  // 1. STATE DEFINITIONS
  // =========================================
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State Input User
  const [userId, setUserId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [email, setEmail] = useState(""); 
  
  // State Pilihan
  const [paymentMethods, setPaymentMethods] = useState([]); 
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // =========================================
  // 2. FETCH PAYMENT METHODS
  // =========================================
  useEffect(() => {
      axios.get("http://127.0.0.1:8000/api/payment-methods")
          .then((response) => {
              // Pastikan data dari backend sudah berisi path: /images/nama_bank.png
              setPaymentMethods(response.data);
          })
          .catch((error) => {
              console.error("Gagal ambil payment:", error);
          });
  }, []);

  // =========================================
  // 3. LOGIC & CALCULATIONS
  // =========================================
  
  const totalPrice = selectedProduct ? selectedProduct.price * quantity : 0;
  const adminFee = selectedPayment ? selectedPayment.admin_fee : 0; 
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

  // --- FUNGSI 'getPaymentLogo' DIHAPUS KARENA SUDAH ADA DI DB ---

  // --- LOGIKA PEMBELIAN ---
  const handleBuy = async () => {
      if (!selectedProduct || !userId || !email || !selectedPayment) {
          alert("Mohon lengkapi User ID, Email, dan Pilih Pembayaran.");
          return;
      }

      setIsSubmitting(true);

      const payload = {
          email: email,
          game_user_id: userId,
          zone_id: zoneId,
          game: game.name,
          item_name: selectedProduct.name,
          amount: selectedProduct.amount,
          price: selectedProduct.price,
          quantity: quantity,
          total_price: grandTotal,
          payment_method: selectedPayment.name 
      };

      try {
          const response = await axios.post('http://127.0.0.1:8000/api/transaction', payload);
          
          console.log("Transaksi Berhasil:", response.data);

          alert(
            `✅ Pesanan Berhasil Dibuat!\n\n` +
            `Invoice: ${response.data.data.invoice_id}\n` +
            `Total: Rp ${response.data.data.total_price.toLocaleString()}\n\n` +
            `Silakan transfer manual ke:\n` +
            `BCA: 123-456-7890 (Admin)\n` +
            `A.n: A6Topup\n\n` +
            `Status pesanan Anda saat ini: PENDING`
          );
      } catch (error) {
          console.error("Error:", error);
          const errorMsg = error.response?.data?.message || "Terjadi kesalahan sistem.";
          alert("Gagal membuat pesanan: " + errorMsg);
      } finally {
          setIsSubmitting(false);
      }
  };

  // =========================================
  // 4. FETCH PRODUCTS
  // =========================================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const url = `http://127.0.0.1:8000/api/games/${game.slug}`;
        const response = await axios.get(url);
        const dataItems = response.data.packages || response.data.products || [];
        setProducts(dataItems);
      } catch (error) {
        console.error("Gagal mengambil produk:", error);
        setProducts([]); 
      } finally {
        setLoading(false);
      }
    };

    if (game && game.slug) fetchProducts();
  }, [game]);


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
        <img src="/images/banner-effect.gif" alt="Effect" className="hero-gif-overlay" />
        <div className="hero-overlay"></div>
    </div>

        <div className="hero-content container">
          <div className="hero-navbar">
              <div className="logo-placeholder" onClick={onBack} style={{cursor: 'pointer'}}>← KEMBALI</div>
              <div className="nav-links">
                  <span>Aman</span><span>Murah</span><span>Terpercaya</span>
              </div>
          </div>
          <div className="hero-text">
            <h1 className="hero-title">Top up<br/>{game.name}</h1>
            <p className="hero-subtitle">Top up {game.name} resmi region Indonesia.</p>
            <button className="btn-yellow hero-btn" onClick={() => document.getElementById('section-nominal').scrollIntoView({behavior: 'smooth'})}>Beli Sekarang!</button>
          </div>
        </div>
        <div className="floating-game-icon container">
            <img src={game.image} alt={game.name} />
        </div>
      </section>

      {/* === MAIN LAYOUT === */}
      <div className="main-layout container">
        
        {/* --- KOLOM KIRI --- */}
        <div className="left-column">
          
          {/* 1. DATA AKUN */}
          <div className="card-box">
            <div className="section-header"><div className="step-number">1</div><h2 className="section-title">Masukkan Data Akun</h2></div>
            <div className="input-row">
              <div className="input-group">
                  <label>User ID</label>
                  <input type="text" placeholder="Ketikan User ID" className="custom-input" value={userId} onChange={(e) => setUserId(e.target.value)} />
              </div>
              <div className="input-group">
                  <label>Zone ID (Opsional)</label>
                  <input type="text" placeholder="Ketikan Zone ID" className="custom-input" value={zoneId} onChange={(e) => setZoneId(e.target.value)} />
              </div>
            </div>
            <p className="helper-text">*Cek User ID Anda di bagian profil menu game.</p>
          </div>

          {/* 2. PILIH NOMINAL */}
          <div className="card-box" id="section-nominal">
            <div className="section-header"><div className="step-number">2</div><h2 className="section-title">Pilih Nominal</h2></div>
            {loading ? <div className="loading-state">Sedang memuat...</div> : products.length === 0 ? <div className="empty-state">Produk kosong.</div> : (
                <div className="nominal-grid">
                  {products.map((product) => (
                    <div key={product.id} className={`item-card ${selectedProduct?.id === product.id ? 'active' : ''}`} onClick={() => setSelectedProduct(product)}>
                       {product.meta && product.meta.promo && <div className="flash-badge">{product.meta.promo.label || "PROMO"}</div>}
                       {!product.meta && product.active && <div className="flash-badge">HOT</div>}
                      <div className="item-name">{product.name}</div>
                      <div className="price-area"><div className="price-main">{formatRupiah(product.price)}</div></div>
                    </div>
                  ))}
                </div>
            )}
          </div>

          {/* 3. JUMLAH */}
          <div className="card-box">
            <div className="section-header"><div className="step-number">3</div><h3 className="section-title">Masukkan Jumlah</h3></div>
            <div className="quantity-wrapper">
                <button className="qty-btn" onClick={handleDecrease}>−</button>
                <input type="text" className="qty-input" value={quantity} readOnly />
                <button className="qty-btn" onClick={handleIncrease}>+</button>
            </div>
             <p className="helper-text" style={{marginTop: '10px'}}>Total item: <span className="text-yellow"> {selectedProduct ? selectedProduct.name : '0'} x {quantity}</span></p>
          </div>

          {/* 4. EMAIL */}
          <div className="card-box">
            <div className="section-header"><div className="step-number">4</div><h2 className="section-title">Masukkan Email</h2></div>
            <div className="input-group">
                <label style={{marginBottom: '8px', display:'block'}}>Alamat Email</label>
                <input type="email" placeholder="contoh: nama@email.com" className="custom-input" value={email} onChange={(e) => setEmail(e.target.value)} />
                <p className="helper-text" style={{marginTop: '10px'}}>*Bukti pembayaran dikirim ke email ini.</p>
            </div>
          </div>
          
          {/* 5. PILIH PEMBAYARAN */}
          <div className="card-box">
            <div className="section-header">
              <div className="step-number">5</div>
              <h2 className="section-title">Pilih Pembayaran</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedPayment(method)}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s',
                    border: selectedPayment?.id === method.id ? '2px solid #ffd600' : '1px solid #444',
                    background: selectedPayment?.id === method.id ? 'rgba(255, 214, 0, 0.05)' : '#2a2a2a'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ background: 'white', padding: '4px', borderRadius: '6px', width: '60px', height: '35px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                       {/* === BAGIAN INI SUDAH LANGSUNG DARI DB === */}
                       <img 
                          src={method.image} 
                          alt={method.name} 
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          onError={(e) => { e.target.src = "https://placehold.co/60x35?text=IMG"; }}
                        />
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                       <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>{method.name}</span>
                       <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.7 }}>{method.category || 'Transfer'}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    {selectedProduct ? (
                       <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
                          <span style={{ fontWeight:'bold', fontSize:'0.9rem', color: selectedPayment?.id === method.id ? '#ffd600' : '#fff' }}>
                             {formatRupiah((selectedProduct.price * quantity) + method.admin_fee)}
                          </span>
                          {method.admin_fee > 0 ? <span style={{ fontSize:'10px', color:'#ff6b6b' }}>+Fee {method.admin_fee}</span> : <span style={{ fontSize:'10px', color:'#51cf66' }}>Bebas Admin</span>}
                       </div>
                    ) : (
                       <span style={{ fontSize: '11px', fontStyle: 'italic', opacity: 0.5 }}>Cek Harga</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- KOLOM KANAN --- */}
        <div className="right-column">
          <div className="sticky-sidebar">
            <div className="rating-card"><div className="rating-score">4.99</div><div className="rating-stars">★★★★★</div><div className="rating-text">Trusted by Gamers</div></div>
            <div className="card-box summary-box">
              <h3 className="summary-title">Detail Pesanan</h3>
              <div className="summary-content">
                 {selectedProduct ? (
                    <>
                        <div className="summary-row"><span>Item:</span><b>{selectedProduct.name} x{quantity}</b></div>
                        <div className="summary-row"><span>ID:</span><b>{userId || "-"}</b></div>
                        <div className="summary-row"><span>Email:</span><b>{email || "-"}</b></div>
                        <div className="summary-row total-row"><span>Total Bayar:</span><b className="text-yellow" style={{fontSize: '1.2rem'}}>{formatRupiah(grandTotal)}</b></div>
                        <div className="summary-row" style={{fontSize: '0.8rem', color: '#888', marginTop:'5px'}}><span>Metode:</span><span>{selectedPayment ? selectedPayment.name : '-'}</span></div>
                    </>
                 ) : <div className="empty-msg">Pilih item terlebih dahulu</div>}
              </div>
              <button className="btn-yellow btn-full btn-pesan" disabled={!selectedProduct || !userId || !selectedPayment || !email || isSubmitting} onClick={handleBuy}>
                {isSubmitting ? "Memproses..." : "Pesan Sekarang!"}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TopUpGame;