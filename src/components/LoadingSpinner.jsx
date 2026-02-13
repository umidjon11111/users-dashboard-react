import React from "react";

const spinnerWrapper = {
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(248, 250, 252, 0.85)",
  backdropFilter: "blur(6px)",
  zIndex: 9999,
};

const spinner = {
  width: 48,
  height: 48,
  border: "4px solid #e2e8f0",
  borderTop: "4px solid #4f46e5",
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite",
};

const textStyle = {
  marginTop: 16,
  fontSize: 14,
  color: "#334155",
  fontWeight: 500,
};

export default function LoadingSpinner({ label = "Loading users..." }) {
  return (
    <div style={spinnerWrapper} role="status" aria-live="polite">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={spinner} />
        <span style={textStyle}>{label}</span>
      </div>

      {/* CSS animation inline */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
