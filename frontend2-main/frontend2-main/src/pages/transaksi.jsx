import React from "react";
import Navbar from "../../navbar/navbar";
import Footer from "../../footer/footer";
import Sidebar from "../../sidebar/sidebar";
import { FaHeadset, FaSearch, FaCalendarAlt, FaDownload, FaChartBar } from "react-icons/fa";
import "../styles/transaksi.css";

export default function Transaksi() {
  return (
    <>
      <Navbar />

      <div className="dashboard-page">
        <Sidebar />

        <div className="dashboard-content">
          <div className="header-section">
            <h2>Riwayat Transaksi</h2>
            <p>Menampilkan data riwayat transaksi yang telah Kamu lakukan selama periode yang dipilih.</p>
          </div>

          {/* FILTER SECTION */}
          <div className="card filter-card">
            <div className="filter-grid">
              <div className="filter-group">
                <label>Status</label>
                <select className="filter-input">
                  <option>Semua</option>
                  <option>Menunggu</option>
                  <option>Proses</option>
                  <option>Sukses</option>
                  <option>Gagal</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Status Pembayaran</label>
                <select className="filter-input">
                  <option>Semua</option>
                  <option>Belum Bayar</option>
                  <option>Sudah Bayar</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Tanggal Mulai</label>
                <input type="date" className="filter-input" defaultValue="2025-12-31" />
              </div>
              <div className="filter-group">
                <label>Tanggal Akhir</label>
                <input type="date" className="filter-input" defaultValue="2025-12-31" />
              </div>
            </div>

            <div className="search-group">
              <label>Cari</label>
              <div className="search-wrapper">
                <FaSearch className="search-icon" />
                <input type="text" placeholder="#trxid $price @inputs" className="filter-input" />
              </div>
            </div>
          </div>

          {/* TABLE ACTIONS - Bagian yang disesuaikan agar sejajar ke pojok kanan */}
          <div className="table-actions">
            <button className="btn-export"><FaDownload /> Unduh CSV</button>
            <button className="btn-export"><FaDownload /> Unduh XLSX</button>
            <select className="entry-select">
              <option>10 Entri</option>
              <option>25 Entri</option>
              <option>50 Entri</option>
            </select>
          </div>

          {/* TABLE SECTION */}
          <div className="table-responsive glass-table">
            <table>
              <thead>
                <tr>
                  <th>Nomor Invoice</th>
                  <th>ID Trx</th>
                  <th>Item</th>
                  <th>User Input</th>
                  <th>Harga</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="7" className="empty-state">
                    <div className="empty-content">
                      <FaChartBar size={50} className="empty-icon" />
                      <h4>Data tidak ditemukan!</h4>
                      <p>Tidak ada aktifitasi data.</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="pagination-info">
            <span>Menampilkan 0 sampai 0 dari 0 hasil</span>
            <div className="pagination-btns">
              <button className="btn-nav" disabled>Sebelumnya</button>
              <button className="btn-nav" disabled>Selanjutnya</button>
            </div>
          </div>
        </div>
      </div>

      <div className="customer-service-float">
        <FaHeadset />
        <span>CUSTOMER SERVICE</span>
      </div>

      <Footer />
    </>
  );
}