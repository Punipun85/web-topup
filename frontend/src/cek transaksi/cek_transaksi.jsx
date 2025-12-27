import React from 'react';
import { SearchCode } from 'lucide-react';
import './cek_transaksi.css';

export default function CekTransaksi({ transactions }) {
  return (
    <div className="cek-container">
      <section className="search-section">
        <h1 className="search-title">
          Cek Invoice Kamu <br /> dengan Cepat
        </h1>

        <div className="search-card">
          <input
            type="text"
            placeholder="Masukkan nomor Invoice"
            className="search-input"
          />

          <button className="search-button">
            <SearchCode size={22} strokeWidth={3} />
            CARI INVOICE
          </button>
        </div>
      </section>

      <section className="table-section">
        <div className="table-wrapper">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Nomor Invoice</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td style={{ fontFamily: 'monospace' }}>
                    {item.invoice}
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        item.status === 'SUCCESS'
                          ? 'status-success'
                          : 'status-pending'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
