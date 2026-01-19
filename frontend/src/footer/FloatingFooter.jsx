import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Sun, Headset } from "lucide-react";
import { Link } from "react-router-dom";
import "./footer.css";

export default function FloatingFooter() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // ===== CLOSE DROPDOWN KLIK LUAR =====
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // ===== DARK / LIGHT MODE =====
  const toggleTheme = (e) => {
    e.stopPropagation();
    const current = document.body.dataset.theme || "dark";
    const next = current === "dark" ? "light" : "dark";
    document.body.dataset.theme = next;
    localStorage.setItem("theme", next);
  };

  return createPortal(
    <div className="footer-floating">
      <div className="floating-container" ref={ref}>
        {/* BAGIAN KIRI */}
        <span className="copyright">
          © 2025 A6TOPUP. All rights reserved.
        </span>

        {/* BAGIAN KANAN */}
        <div className="floating-actions">
          {/* ===== THEME TOGGLE ===== */}
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
          >
            <Sun size={20} />
          </button>

          {/* ===== CUSTOMER SERVICE ===== */}
          <div className="cs-wrapper">
            <button
              type="button"
              className="cs-btn"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((v) => !v);
              }}
            >
              <Headset size={20} strokeWidth={3} />
              CUSTOMER SERVICE
            </button>

            {open && (
              <div
                className="cs-dropdown"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="cs-title">Customer Service</div>

                {/* ===== INTERNAL ROUTE ===== */}
                <Link
                  to="/contact-us"
                  className="cs-item highlight"
                  onClick={() => setOpen(false)}
                >
                  Formulir Laporan <span>(Rekomendasi)</span>
                </Link>

                {/* ===== EXTERNAL LINKS ===== */}
                <a
                  href="https://wa.me/6285391272277?text=Halo%20saya%20butuh%20bantuan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs-item"
                >
                  WhatsApp
                </a>

                <a
                  href="https://www.instagram.com/_rmaaa._?igsh=MTJ1NmlwZ3kzajFxbA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs-item"
                >
                  Instagram
                </a>

                <a
                  href="mailto:support@a6topup.com?subject=Laporan%20Masalah"
                  className="cs-item"
                >
                  Email
                </a>

                <div className="cs-divider" />

                <button
                  type="button"
                  className="cs-item disabled"
                  disabled
                >
                  Jasa Rekber &amp; Jual Beli Akun
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}