import React from "react";
import "./videobackground.css";

export default function VideoBackground() {
  return (
    <div className="video-bg">
      <video autoPlay muted loop playsInline>
        <source src="/images/background.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
