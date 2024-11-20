import styled from "styled-components";
import { Piece, PiecesProps } from "../ChessTypes";
import { FaChessBishop } from "react-icons/fa";
import { getPieceColor } from "../ChessUtils";
import React from "react";

const BishopStyled = styled(FaChessBishop)<{
  color: "white" | "black";
}>`
  font-size: 24px;
  color: ${({ color }) => getPieceColor(color)};
`;

export const BishopComponent: React.FC<PiecesProps> = ({ color }) => (
  <BishopStyled color={color} />
);

export const Bishop = {
  isMoveValid: (
    piece: Piece,
    toRow: number,
    toCol: number,
    board: (Piece | null)[][]
  ) => {
    if (Math.abs(toRow - piece.row) !== Math.abs(toCol - piece.col))
      return false;

    const rowDirection = toRow > piece.row ? 1 : -1;
    const colDirection = toCol > piece.col ? 1 : -1;

    let row = piece.row + rowDirection;
    let col = piece.col + colDirection;

    while (row !== toRow && col !== toCol) {
      if (board[row][col]) return false;
      row += rowDirection;
      col += colDirection;
    }

    return !board[toRow][toCol] || board[toRow][toCol]?.color !== piece.color;
  },
};
