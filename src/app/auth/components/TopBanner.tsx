"use client";

import { useState } from "react";

export default function TopBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      style={{
        backgroundColor: "#17617e",
        color: "#fff",
        textAlign: "center",
        padding: "8px 16px",
        fontSize: "14px",
        fontWeight: 500,
        zIndex: 9999,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ flex: 1 }}>
        For demo purposes only. Your information is not being saved.
      </span>
      <button
        onClick={() => setIsVisible(false)}
        style={{
          background: "none",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          padding: "0 8px",
          fontSize: "18px",
          lineHeight: 1,
          opacity: 0.8,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
        aria-label="Dismiss banner"
      >
        ×
      </button>
    </div>
  );
}
