import React from "react";

type StatusIndicatorProps = {
  label: string; // Label für den Status, z. B. "Aktueller Spieler"
  value: string; // Wert des Status, z. B. "Weiß" oder "Schwarz"
  color?: string; // Optionale Textfarbe für den Statuswert
  backgroundColor?: string; // Optionale Hintergrundfarbe für die Anzeige
};

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  label,
  value,
  color = "black",
  backgroundColor = "lightgray",
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        backgroundColor,
        borderRadius: "8px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <strong style={{ marginRight: "8px" }}>{label}:</strong>
      <span style={{ color, fontWeight: "bold" }}>{value}</span>
    </div>
  );
};

export default StatusIndicator;
