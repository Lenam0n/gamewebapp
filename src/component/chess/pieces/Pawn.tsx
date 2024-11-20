import React from "react";
import styled from "styled-components";
import { FaChessPawn } from "react-icons/fa";
import { getPieceColor } from "../ChessUtils";
import { Piece, PiecesProps } from "../ChessTypes";
import Swal from "sweetalert2";

const PawnStyled = styled(FaChessPawn)<{ color: "white" | "black" }>`
  font-size: 24px;
  color: ${({ color }) => getPieceColor(color)};
`;

export const PawnComponent: React.FC<PiecesProps> = ({ color }) => (
  <PawnStyled color={color} />
);

export const Pawn = {
  isMoveValid: (
    piece: Piece,
    toRow: number,
    toCol: number,
    board: (Piece | null)[][]
  ) => {
    const direction = piece.color === "white" ? -1 : 1;
    const startRow = piece.color === "white" ? 6 : 1;

    // Validate normal move
    if (
      toCol === piece.col &&
      toRow === piece.row + direction &&
      !board[toRow][toCol]
    ) {
      return true;
    }

    // Validate double move from start position
    if (
      toCol === piece.col &&
      piece.row === startRow &&
      toRow === piece.row + 2 * direction &&
      !board[toRow][toCol] &&
      !board[piece.row + direction][toCol]
    ) {
      return true;
    }

    // Validate capturing move
    if (
      Math.abs(toCol - piece.col) === 1 &&
      toRow === piece.row + direction &&
      board[toRow][toCol] &&
      board[toRow][toCol]?.color !== piece.color
    ) {
      return true;
    }

    return false;
  },

  handlePromotion: async (
    piece: Piece,
    toRow: number,
    capturedPieces: Piece[]
  ) => {
    if (
      (piece.color === "white" && toRow === 0) ||
      (piece.color === "black" && toRow === 7)
    ) {
      const { value: choice } = await Swal.fire({
        title: "Bauernumwandlung",
        text: "Wähle eine Figur für die Umwandlung:",
        input: "select",
        inputOptions: {
          Q: "Dame",
          R: "Turm",
          B: "Läufer",
          N: "Springer",
        },
        inputPlaceholder: "Figur auswählen",
        showCancelButton: false,
      });

      if (choice) {
        return choice; // Return the type selected for promotion
      }
    }
    return null; // No promotion if conditions are not met
  },
};
