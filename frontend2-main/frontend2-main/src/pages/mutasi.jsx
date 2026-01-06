import React from "react";
import Navbar from "../../navbar/navbar";
import Footer from "../../footer/footer";
import Sidebar from "../../sidebar/sidebar";
import { FaHeadset, FaSearch, FaDownload, FaChartBar } from "react-icons/fa";
import "../styles/mutasi.css";

export default function Mutasi() {
  return (
    <>
      <Navbar />

      <div className="dashboard-page">
        <Sidebar />

        <div className="dashboard-content">
          <div className="header-section">
            <h2>Riwayat Mutasi</h2>
            <p>Menampilkan data riwayat mutasi yang telah Kamu lakukan selama periode yang dipilih.</p>
          </div>

          {/* FILTER SECTION */}
          <div className="card filter-card">
            <div className="filter-grid mutasi-filter">
              <div className="filter-group">
                <label>Status</label>
                <div className="search-wrapper">
                   <FaSearch className="search-icon" />
                   <input type="text" placeholder="$jumlah $-jumlah" className="filter-input" />
                </div>
              </div>
              <div className="filter-group">
                <label>Tanggal Mulai</label>
                <input type="date" className="filter-input" defaultValue="2026-01-01" />
              </div>
              <div className="filter-group">
                <label>Tanggal Akhir</label>
                <input type="date" className="filter-input" defaultValue="2026-01-02" />
              </div>
            </div>
          </div>

          {/* TABLE ACTIONS - Diposisikan ke Pojok Kanan */}
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
                  <th>Nomor Invoice</th>
                  <th>Deskripsi</th>
                  <th>Jumlah</th>
                  <th>Coinpedia</th>
                  <th>Coinpedia Saat Ini</th>
                  <th>Tanggal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="6" className="empty-state">
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