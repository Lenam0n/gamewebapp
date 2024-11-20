import React from "react";
import CapturedPieces from "./CapturedPieces";

type SidebarProps = {
  playerWhite: string;
  playerBlack: string;
  totalGameTime: string; // Add total game time prop
  currentMoveTime: string; // Add current move time prop
  whiteCaptured: string[];
  blackCaptured: string[];
};

const ChessSidebar: React.FC<SidebarProps> = ({
  playerWhite,
  playerBlack,
  totalGameTime,
  currentMoveTime,
  whiteCaptured,
  blackCaptured,
}) => {
  return (
    <div
      style={{ padding: "20px", width: "200px", borderRight: "1px solid gray" }}
    >
      <h3>Spielinformationen</h3>
      <p>Spielzeit: {totalGameTime}</p> {/* Display total game time */}
      <p>Zugzeit: {currentMoveTime}</p> {/* Display current move time */}
      <h4>{playerWhite} : (Weiß)</h4>
      <CapturedPieces captured={whiteCaptured} color="white" />
      <h4>{playerBlack} : (Schwarz) </h4>
      <CapturedPieces captured={blackCaptured} color="black" />
    </div>
  );
};

export default ChessSidebar;
