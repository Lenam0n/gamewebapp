import React from "react";
import styled from "styled-components";
import { Piece } from "./ChessTypes";

import { KingComponent } from "./pieces/King";
import { QueenComponent } from "./pieces/Queen";
import { RookComponent } from "./pieces/Rook";
import { BishopComponent } from "./pieces/Bishop";
import { KnightComponent } from "./pieces/Knight";
import { PawnComponent } from "./pieces/Pawn";

type ChessBoardProps = {
  board: (Piece | null)[][];
  possibleMoves: [number, number][];
  kingInCheck: { row: number; col: number } | null;
  handleSelect: (row: number, col: number) => void;
};

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 50px);
  width: 400px;
  height: 400px;
  border: 2px solid black;
`;

const Square = styled.div<{
  $isPossibleMove: boolean;
  $isKingInDanger: boolean;
  $isDark: boolean;
}>`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $isKingInDanger, $isPossibleMove, $isDark }) =>
    $isKingInDanger
      ? "red"
      : $isPossibleMove
      ? "lightgreen"
      : $isDark
      ? "gray"
      : "white"};
  cursor: pointer;
  font-size: 24px;
`;

const ChessBoard: React.FC<ChessBoardProps> = ({
  board,
  possibleMoves,
  kingInCheck,
  handleSelect,
}) => {
  const renderPiece = (piece: Piece) => {
    switch (piece.type) {
      case "K":
        return <KingComponent color={piece.color} />;
      case "Q":
        return <QueenComponent color={piece.color} />;
      case "R":
        return <RookComponent color={piece.color} />;
      case "B":
        return <BishopComponent color={piece.color} />;
      case "N":
        return <KnightComponent color={piece.color} />;
      case "P":
        return <PawnComponent color={piece.color} />;
      default:
        return null;
    }
  };

  return (
    <BoardContainer>
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => {
          const isPossibleMove = possibleMoves.some(
            (move) => move[0] === rowIndex && move[1] === colIndex
          );
          const isKingInDanger =
            kingInCheck?.row === rowIndex && kingInCheck?.col === colIndex;
          const isDark = (rowIndex + colIndex) % 2 !== 0;

          return (
            <Square
              key={`${rowIndex}-${colIndex}`}
              $isPossibleMove={isPossibleMove}
              $isKingInDanger={isKingInDanger}
              $isDark={isDark}
              onClick={() => handleSelect(rowIndex, colIndex)}
            >
              {piece ? renderPiece(piece) : ""}
            </Square>
          );
        })
      )}
    </BoardContainer>
  );
};

export default ChessBoard;
