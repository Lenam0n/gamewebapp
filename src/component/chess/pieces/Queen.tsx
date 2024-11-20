// src/pieces/Queen.tsx
import React from "react";
import styled from "styled-components";
import { FaChessQueen } from "react-icons/fa";
import { Piece, PiecesProps } from "../ChessTypes";
import { getPieceColor } from "../ChessUtils";

const QueenStyled = styled(FaChessQueen)<{ color: "white" | "black" }>`
  font-size: 24px;
  color: ${({ color }) => getPieceColor(color)};
`;

export const QueenComponent: React.FC<PiecesProps> = ({ color }) => (
  <QueenStyled color={color} />
);

export const Queen = {
  isMoveValid: (
    piece: Piece,
    toRow: number,
    toCol: number,
    board: (Piece | null)[][]
  ): boolean => {
    const rowDiff = toRow - piece.row;
    const colDiff = toCol - piece.col;

    // Prüfen, ob sich die Dame in einer geraden Linie oder Diagonale bewegt
    if (
      Math.abs(rowDiff) === Math.abs(colDiff) ||
      rowDiff === 0 ||
      colDiff === 0
    ) {
      const rowStep = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff);
      const colStep = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff);

      // Prüfen auf Blockaden in der Bewegung
      let currentRow = piece.row + rowStep;
      let currentCol = piece.col + colStep;

      while (currentRow !== toRow || currentCol !== toCol) {
        if (board[currentRow][currentCol] !== null) {
          return false;
        }
        currentRow += rowStep;
        currentCol += colStep;
      }

      // Das Zielfeld muss entweder leer sein oder eine gegnerische Figur enthalten
      const targetPiece = board[toRow][toCol];
      return !targetPiece || targetPiece.color !== piece.color;
    }
    return false;
  },
};
