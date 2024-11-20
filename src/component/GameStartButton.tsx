// StartButton.tsx
import React from "react";

type StartButtonProps = {
  onStart: () => void;
};

const StartButton: React.FC<StartButtonProps> = ({ onStart }) => {
  return (
    <button
      onClick={onStart}
      style={{ padding: "10px 20px", fontSize: "16px" }}
    >
      Spiel Starten
    </button>
  );
};

export default StartButton;
