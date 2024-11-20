import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

type CoinTossProps = {
  onComplete: (result: "player1" | "player2") => void;
};

const glow = keyframes`
  0% {
    box-shadow: 0 0 10px rgba(0, 150, 255, 0.5), 0 0 20px rgba(0, 150, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 150, 255, 1), 0 0 30px rgba(0, 150, 255, 1);
  }
  100% {
    box-shadow: 0 0 10px rgba(0, 150, 255, 0.5), 0 0 20px rgba(0, 150, 255, 0.5);
  }
`;

const OptionButton = styled.button<{ isSelected: boolean }>`
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #007bff;
  animation: ${({ isSelected }) => (isSelected ? glow : "none")} 1.5s infinite
    ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

const HighlightedButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #4caf50;

  &:hover {
    background-color: #45a049;
  }
`;

const CoinToss: React.FC<CoinTossProps> = ({ onComplete }) => {
  const [choice, setChoice] = useState<"Kopf" | "Zahl" | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleToss = () => {
    const tossResult = Math.random() < 0.5 ? "Kopf" : "Zahl";
    setResult(tossResult);
    const winner = tossResult === choice ? "player1" : "player2";
    setTimeout(() => onComplete(winner), 1000);
  };

  return (
    <div>
      <h3>Münzwurf</h3>
      <p>Wähle Kopf oder Zahl:</p>
      <OptionButton
        isSelected={choice === "Kopf"}
        onClick={() => setChoice("Kopf")}
      >
        Kopf
      </OptionButton>
      <OptionButton
        isSelected={choice === "Zahl"}
        onClick={() => setChoice("Zahl")}
      >
        Zahl
      </OptionButton>
      {choice && (
        <HighlightedButton onClick={handleToss}>Münze werfen</HighlightedButton>
      )}
      {result && <p>Ergebnis: {result}</p>}
    </div>
  );
};

export default CoinToss;
