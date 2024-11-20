import React, { useState } from "react";
import styled from "styled-components";
import CoinToss from "./CoinToss";
import DiceRoll from "./RollDice";

type GameStartOverlayProps = {
  onGameStart: (startingPlayer: "player1" | "player2") => void;
  isPlayerOneConnected: boolean;
  isPlayerTwoConnected: boolean;
};

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ContentContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const StatusMessage = styled.p`
  margin: 10px 0;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
`;

const GameStartOverlay: React.FC<GameStartOverlayProps> = ({
  onGameStart,
  isPlayerOneConnected,
  isPlayerTwoConnected,
}) => {
  const [startDecision, setStartDecision] = useState<"coin" | "dice" | null>(
    null
  );
  const [startReady, setStartReady] = useState(false);
  const [startingPlayer, setStartingPlayer] = useState<
    "player1" | "player2" | null
  >(null);

  const handleDecisionComplete = (result: "player1" | "player2") => {
    setStartingPlayer(result);
    setStartReady(true);
  };

  return (
    <OverlayContainer>
      <ContentContainer>
        <h2>Spielvorbereitung</h2>
        <StatusMessage>
          Spieler 1: {isPlayerOneConnected ? "Verbunden" : "Nicht verbunden"}
        </StatusMessage>
        <StatusMessage>
          Spieler 2: {isPlayerTwoConnected ? "Verbunden" : "Nicht verbunden"}
        </StatusMessage>

        {startDecision === null && (
          <>
            <Button onClick={() => setStartDecision("coin")}>
              Münze werfen
            </Button>
            <Button onClick={() => setStartDecision("dice")}>Würfeln</Button>
          </>
        )}

        {startDecision === "coin" && (
          <CoinToss onComplete={handleDecisionComplete} />
        )}
        {startDecision === "dice" && (
          <DiceRoll onComplete={handleDecisionComplete} />
        )}

        {startReady && (
          <>
            <p>
              Ergebnis:{" "}
              {startingPlayer === "player1"
                ? "Spieler 1 beginnt"
                : "Spieler 2 beginnt"}
            </p>
            <Button
              onClick={() =>
                onGameStart(startingPlayer as "player1" | "player2")
              }
            >
              Spiel starten
            </Button>
          </>
        )}
      </ContentContainer>
    </OverlayContainer>
  );
};

export default GameStartOverlay;
