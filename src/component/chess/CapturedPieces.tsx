import React from "react";
import styled from "styled-components";
import {
  FaChessKing,
  FaChessQueen,
  FaChessRook,
  FaChessBishop,
  FaChessKnight,
  FaChessPawn,
} from "react-icons/fa";

const CapturedContainer = styled.div`
  margin-top: 15px;
`;

const PieceList = styled.div`
  display: flex;
  flex-direction: column;
`;

const PieceRow = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const PieceIcon = styled.div`
  margin-right: 8px;
  font-size: 20px;
`;

const PieceName = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const PieceCount = styled.span`
  color: gray;
`;

type CapturedPiecesProps = {
  captured: string[];
  color: "white" | "black";
};

const iconMap: Record<string, JSX.Element> = {
  K: <FaChessKing />,
  Q: <FaChessQueen />,
  R: <FaChessRook />,
  B: <FaChessBishop />,
  N: <FaChessKnight />,
  P: <FaChessPawn />,
};

const pieceNameMap: Record<string, string> = {
  K: "König",
  Q: "Dame",
  R: "Turm",
  B: "Läufer",
  N: "Springer",
  P: "Bauer",
};

const getCapturedCounts = (captured: string[]) => {
  return captured.reduce<Record<string, number>>((counts, piece) => {
    counts[piece] = (counts[piece] || 0) + 1;
    return counts;
  }, {});
};

const CapturedPieces: React.FC<CapturedPiecesProps> = ({ captured, color }) => {
  const counts = getCapturedCounts(captured);

  return (
    <CapturedContainer>
      <h4>Geschlagene Figuren ({color === "white" ? "Weiß" : "Schwarz"})</h4>
      <PieceList>
        {Object.keys(counts).map((piece) => (
          <PieceRow key={`${color}-${piece}`}>
            <PieceIcon>{iconMap[piece as keyof typeof iconMap]}</PieceIcon>
            <PieceName>
              {pieceNameMap[piece as keyof typeof pieceNameMap]}
            </PieceName>
            <PieceCount>x{counts[piece]}</PieceCount>
          </PieceRow>
        ))}
      </PieceList>
    </CapturedContainer>
  );
};

export default CapturedPieces;
