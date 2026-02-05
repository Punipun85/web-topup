import React from "react";
import Navbar from "../../navbar/navbar";
import Footer from "../../footer/footer";
import Sidebar from "../../sidebar/sidebar";
import { FaHeadset, FaDownload, FaChartBar } from "react-icons/fa";
import "../styles/laporan.css";

export default function Laporan() {
  return (
    <>
      <Navbar />

      <div className="dashboard-page">
        <Sidebar />

        <div className="dashboard-content">
          <div className="header-section">
            <h2>Laporan</h2>
            <p>Menampilkan laporan total penjualan per hari.</p>
          </div>

          {/* FILTER SECTION */}
          <div className="card filter-card">
            <div className="filter-grid laporan-filter">
              <div className="filter-group">
                <label>Produk</label>
                <select className="filter-input">
                  <option>-- Pilih Semua Produk --</option>
                  <option>Mobile Legends</option>
                  <option>Free Fire</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Tanggal Mulai</label>
                <input type="date" className="filter-input" defaultValue="2026-01-02" />
              </div>
              <div className="filter-group">
                <label>Tanggal Akhir</label>
                <input type="date" className="filter-input" defaultValue="2026-01-02" />
              </div>
            </div>
          </div>

          {/* TABLE ACTIONS - Sejajar di Pojok Kanan */}
          <div className="table-actions">
            <button className="btn-export">
              <FaDownload /> Unduh CSV
            </button>
            <button className="btn-export">
              <FaDownload /> Unduh XLSX
            </button>
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
                  <th>Tanggal</th>
                  <th>Total Transaksi</th>
                  <th>Total Jumlah</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="3" className="empty-state">
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