import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

// --- IMPORT DARI FOLDER YANG SAMA ---
// Sesuai struktur di image_50fe61.png
import ArticleNavbar from './ArticleNavbar'; 
import ArticleFooter from './ArticleFooter'; 

const ArticleDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  
  // Ambil data dari state jika ada, jika tidak set null
  const [article, setArticle] = useState(location.state?.article || null);
  const [loading, setLoading] = useState(!article);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Jika artikel sudah ada dari navigasi, tidak perlu fetch lagi
    if (article) return;

    const fetchSingleArticle = async () => {
      try {
        setLoading(true);
        // Pastikan endpoint ini sesuai dengan API Laravel Anda
        const response = await axios.get(`http://127.0.0.1:8000/api/articles/${id}`);
        setArticle(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Gagal load detail artikel:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchSingleArticle();
  }, [id, article]);

  // Tampilan saat loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0e13] text-white flex justify-center items-center">
        <ArticleNavbar />
        <p>Memuat isi artikel...</p>
      </div>
    );
  }

  // Tampilan jika error (Seperti di image_f21ac2.png)
  if (error || !article) {
    return (
      <>
        <ArticleNavbar />
        <div className="min-h-screen bg-[#0b0e13] text-white flex flex-col justify-center items-center">
          <h2 className="text-xl mb-4">Artikel tidak ditemukan</h2>
          <Link to="/" className="text-cyan-400 hover:underline">Kembali ke Home</Link>
        </div>
        
      </>
    );
  }

  return (
    <div className="bg-[#0b0e13] min-h-screen text-white">
      {/* 1. Navigasi Khusus Artikel */}
      <ArticleNavbar /> 
      
      <main className="container mx-auto px-4 py-10 max-w-4xl">
        {/* Judul Artikel dari Database */}
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center md:text-left">
          {article.title}
        </h1>

        <div className="flex items-center gap-3 mb-8 text-sm text-gray-400">
          <span className="bg-yellow-500 text-black px-2 py-1 rounded font-bold">
            {article.category || "GAME"}
          </span>
          <span>•</span>
          <span>{new Date(article.created_at).toLocaleDateString('id-ID')}</span>
        </div>

        {/* Gambar Utama Artikel */}
        <div className="rounded-xl overflow-hidden mb-10 shadow-lg border border-gray-800">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-auto object-cover"
            onError={(e) => { e.target.src = "https://via.placeholder.com/800x400?text=Gambar+Tidak+Tersedia"; }}
          />
        </div>

        {/* Isi Konten Artikel */}
        <div 
          className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />
      </main>

      {/* 2. Footer Khusus Artikel */}
     
    </div>
  );
};

export default ArticleDetail;