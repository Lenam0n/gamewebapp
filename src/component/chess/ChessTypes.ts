// src/ChessTypes.ts
export type Piece = {
  type: "K" | "Q" | "R" | "B" | "N" | "P";
  color: "white" | "black";
  row: number;
  col: number;
  hasMoved?: boolean;
};

export type PiecesProps = {
  color: "white" | "black";
};
