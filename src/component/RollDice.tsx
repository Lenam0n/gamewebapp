import React, { useState } from "react";

type DiceRollProps = {
  onComplete: (result: "player1" | "player2") => void;
};

const DiceRoll: React.FC<DiceRollProps> = ({ onComplete }) => {
  const [choice, setChoice] = useState<"highest" | "lowest" | null>(null);
  const [playerOneRoll, setPlayerOneRoll] = useState<number | null>(null);
  const [playerTwoRoll, setPlayerTwoRoll] = useState<number | null>(null);

  const handleRoll = () => {
    const rollOne = Math.floor(Math.random() * 6) + 1;
    const rollTwo = Math.floor(Math.random() * 6) + 1;
    setPlayerOneRoll(rollOne);
    setPlayerTwoRoll(rollTwo);

    const winner =
      choice === "highest"
        ? rollOne >= rollTwo
          ? "player1"
          : "player2"
        : rollOne <= rollTwo
        ? "player1"
        : "player2";
    setTimeout(() => onComplete(winner), 1000);
  };

  return (
    <div>
      <h3>Würfeln</h3>
      <p>Wähle, ob der höchste oder niedrigste Wurf gewinnt:</p>
      <button onClick={() => setChoice("highest")}>Höchster gewinnt</button>
      <button onClick={() => setChoice("lowest")}>Niedrigster gewinnt</button>
      {choice && <button onClick={handleRoll}>Würfeln</button>}
      {playerOneRoll !== null && playerTwoRoll !== null && (
        <p>
          Spieler 1: {playerOneRoll}, Spieler 2: {playerTwoRoll}
        </p>
      )}
    </div>
  );
};

export default DiceRoll;
