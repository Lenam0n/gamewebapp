import styled from "styled-components";
import { Piece, PiecesProps } from "../ChessTypes";
import { FaChessRook } from "react-icons/fa";
import { getPieceColor } from "../ChessUtils";
import React from "react";

const RookStyled = styled(FaChessRook)<{ color: "white" | "black" }>`
  font-size: 24px;
  color: ${({ color }) => getPieceColor(color)};
`;

export const RookComponent: React.FC<PiecesProps> = ({ color }) => (
  <RookStyled color={color} />
);

export const Rook = {
  isMoveValid: (
    piece: Piece,
    toRow: number,
    toCol: number,
    board: (Piece | null)[][]
  ): boolean => {
    if (piece.row !== toRow && piece.col !== toCol) return false;

    // Handle movement in rows or columns
    if (piece.row === toRow) {
      const direction = piece.col < toCol ? 1 : -1;
      for (let col = piece.col + direction; col !== toCol; col += direction) {
        if (board[toRow][col]) return false; // Path must be clear
      }
    } else {
      const direction = piece.row < toRow ? 1 : -1;
      for (let row = piece.row + direction; row !== toRow; row += direction) {
        if (board[row][toCol]) return false; // Path must be clear
      }
    }

    return !board[toRow][toCol] || board[toRow][toCol]?.color !== piece.color;
  },
};
