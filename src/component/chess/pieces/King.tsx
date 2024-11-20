import React from "react";
import styled from "styled-components";
import { FaChessKing } from "react-icons/fa";
import { Piece, PiecesProps } from "../ChessTypes";
import { getPieceColor } from "../ChessUtils";
import { isKingInCheck } from "../ChessUtils"; // Ensure this import is correct

const KingStyled = styled(FaChessKing)<{ color: "white" | "black" }>`
  font-size: 24px;
  color: ${({ color }) => getPieceColor(color)};
`;

export const KingComponent: React.FC<PiecesProps> = ({ color }) => (
  <KingStyled color={color} />
);

export const King = {
  isMoveValid: (
    piece: Piece,
    toRow: number,
    toCol: number,
    board: (Piece | null)[][]
  ): boolean => {
    const rowDiff = Math.abs(toRow - piece.row);
    const colDiff = Math.abs(toCol - piece.col);

    // Castling logic
    if (piece.type === "K" && !piece.hasMoved) {
      const rookCol =
        toCol === piece.col + 2 ? 7 : toCol === piece.col - 2 ? 0 : -1;
      const rook = rookCol !== -1 ? board[piece.row][rookCol] : null;

      // Ensure king and rook have not moved, and the path is clear
      if (
        rook?.type === "R" &&
        !rook.hasMoved &&
        rowDiff === 0 &&
        colDiff === 2 // Castling moves
      ) {
        const pathClear =
          !board[piece.row][piece.col + (toCol === piece.col + 2 ? 1 : -1)]; // Check the path
        return pathClear && !isKingInCheck(piece.color, board); // King must not be in check
      }
    }

    // Regular king movement validation
    return (
      rowDiff <= 1 &&
      colDiff <= 1 &&
      (!board[toRow][toCol] || board[toRow][toCol]?.color !== piece.color)
    );
  },
};
