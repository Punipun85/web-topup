import Navbar from "../../navbar/navbar";
import Footer from "../../footer/footer";
import { FaHeadset } from "react-icons/fa";
import "../styles/terms.css";

export default function Terms() {
  return (
    <>
      <Navbar />

      <div className="terms-container">
        <h1>Syarat dan Ketentuan</h1>

        <section>
          <h2>1. Pengantar</h2>
          <p>
            Selamat datang di <strong>A6TopUp</strong>. A6TopUp adalah platform
            top up game termurah di Indonesia. Dengan mengakses dan menggunakan
            layanan kami, Anda setuju untuk mematuhi Syarat dan Ketentuan berikut.
            Harap baca dengan saksama.
          </p>
        </section>

        <section>
          <h2>2. Penggunaan Layanan</h2>
          <ul>
            <li>
              <strong>Kelayakan:</strong> Anda harus berusia minimal 18 tahun atau
              mendapatkan izin dari orang tua atau wali.
            </li>
            <li>
              <strong>Akun:</strong> Informasi akun harus akurat dan terbaru.
              Keamanan akun sepenuhnya menjadi tanggung jawab pengguna.
            </li>
          </ul>
        </section>

        <section>
          <h2>3. Transaksi</h2>
          <ul>
            <li>Pembelian bersifat final dan tidak dapat dibatalkan.</li>
            <li>Harga dapat berubah sewaktu-waktu tanpa pemberitahuan.</li>
            <li>Pembayaran harus diselesaikan sebelum produk dikirim.</li>
          </ul>
        </section>

        <section>
          <h2>4. Pengembalian dan Pengembalian Dana</h2>
          <p>
            Kami tidak menerima pengembalian produk digital kecuali produk yang
            diterima tidak sesuai atau rusak. Pengembalian dana diproses setelah
            verifikasi klaim.
          </p>
        </section>

        <section>
          <h2>5. Hak Kekayaan Intelektual</h2>
          <p>
            Seluruh konten di situs <strong>A6TopUp</strong> dilindungi oleh
            undang-undang hak cipta dan dilarang digunakan tanpa izin tertulis.
          </p>
        </section>

        <section>
          <h2>6. Batasan Tanggung Jawab</h2>
          <p>
            A6TopUp tidak bertanggung jawab atas kerugian yang timbul akibat
            penggunaan layanan di luar kendali kami.
          </p>
        </section>

        <section>
          <h2>7. Perubahan Layanan</h2>
          <p>
            Kami berhak mengubah atau menghentikan layanan sewaktu-waktu tanpa
            pemberitahuan sebelumnya.
          </p>
        </section>

        <section>
          <h2>8. Hukum yang Berlaku</h2>
          <p>
            Syarat dan Ketentuan ini diatur oleh hukum yang berlaku di Indonesia.
          </p>
        </section>

        <section>
          <h2>9. Kontak</h2>
          <p>
            Jika Anda memiliki pertanyaan, silakan hubungi layanan pelanggan
            kami.
          </p>
        </section>
      </div>

      {/* ================= CUSTOMER SERVICE FLOATING ================= */}
      <div className="cs-floating">
        <FaHeadset className="cs-icon" />
        <span>CUSTOMER SERVICE</span>
      </div>

      <Footer />
    </>
  );
}
