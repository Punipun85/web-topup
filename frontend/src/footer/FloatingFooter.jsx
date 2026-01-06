import React from "react";
import { createPortal } from "react-dom";
import { Sun, Headset } from "lucide-react";
import "./footer.css";

export default function FloatingFooter() {
  return createPortal(
    <div className="footer-floating">
      <div className="floating-container">
        <span className="copyright">
          © 2025 A6TOPUP. All rights reserved.
        </span>

        <div className="floating-actions">
          <button className="icon-btn">
            <Sun size={20} />
          </button>

          <button className="cs-btn">
            <Headset size={20} strokeWidth={3} />
            CUSTOMER SERVICE
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
