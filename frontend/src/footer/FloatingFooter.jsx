import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Sun, Headset } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./footer.css";

export default function FloatingFooter() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  // ===== CLOSE DROPDOWN KLIK LUAR =====
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ===== DARK / LIGHT MODE =====
  const toggleTheme = () => {
    const current = document.body.dataset.theme || "dark";
    const next = current === "dark" ? "light" : "dark";

    document.body.dataset.theme = next;
    localStorage.setItem("theme", next);
  };

  // ===== CUSTOMER SERVICE ACTIONS =====
  const openWA = () => {
    window.open(
      "https://wa.me/6281234567890?text=Halo%20saya%20butuh%20bantuan",
      "_blank"
    );
  };

  const openIG = () => {
    window.open("https://instagram.com/a6topup", "_blank");
  };

  const sendEmail = () => {
    window.location.href =
      "mailto:support@a6topup.com?subject=Laporan%20Masalah";
  };

  return createPortal(
    <div className="footer-floating">
      <div className="floating-container" ref={ref}>
        <span className="copyright">
          © 2025 A6TOPUP. All rights reserved.
        </span>

        <div className="floating-actions">
          {/* ===== THEME TOGGLE ===== */}
          <button className="icon-btn" onClick={toggleTheme}>
            <Sun size={20} />
          </button>

          {/* ===== CUSTOMER SERVICE ===== */}
          <div className="cs-wrapper">
            <button
              className="cs-btn"
              onClick={() => setOpen((v) => !v)}
            >
              <Headset size={20} strokeWidth={3} />
              CUSTOMER SERVICE
            </button>

            {open && (
              <div className="cs-dropdown">
                <div className="cs-title">Customer Service</div>

                {/* FORM LAPORAN */}
                <div
                  className="cs-item highlight"
                  onClick={() => {
                    setOpen(false);
                    navigate("/contact-us");
                  }}
                >
                  Formulir Laporan <span>(Rekomendasi)</span>
                </div>

                {/* WHATSAPP */}
                <div className="cs-item" onClick={openWA}>
                  WhatsApp
                </div>

                {/* INSTAGRAM */}
                <div className="cs-item" onClick={openIG}>
                  Instagram
                </div>

                {/* EMAIL */}
                <div className="cs-item" onClick={sendEmail}>
                  Email
                </div>

                <div className="cs-divider" />

                <div className="cs-item">
                  Jasa Rekber &amp; Jual Beli Akun
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
