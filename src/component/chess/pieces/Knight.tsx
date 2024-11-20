import styled from "styled-components";
import { Piece, PiecesProps } from "../ChessTypes";
import { FaChessKnight } from "react-icons/fa";
import { getPieceColor } from "../ChessUtils";
import React from "react";

const KnightStyled = styled(FaChessKnight)<{
  color: "white" | "black";
}>`
  font-size: 24px;
  color: ${({ color }) => getPieceColor(color)};
`;

export const KnightComponent: React.FC<PiecesProps> = ({ color }) => (
  <KnightStyled color={color} />
);

export const Knight = {
  isMoveValid: (
    piece: Piece,
    toRow: number,
    toCol: number,
    board: (Piece | null)[][]
  ) => {
    const rowDiff = Math.abs(toRow - piece.row);
    const colDiff = Math.abs(toCol - piece.col);

    return (
      ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) &&
      (!board[toRow][toCol] || board[toRow][toCol]?.color !== piece.color)
    );
  },
};
