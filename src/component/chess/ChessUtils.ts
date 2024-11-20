import { Piece } from "./ChessTypes";
import { King } from "./pieces/King";
import { Queen } from "./pieces/Queen";
import { Rook } from "./pieces/Rook";
import { Bishop } from "./pieces/Bishop";
import { Knight } from "./pieces/Knight";
import { Pawn } from "./pieces/Pawn";
import Swal from "sweetalert2";

// Überprüft, ob der Zug eines Pieces gültig ist
export const isMoveValid = (
  piece: Piece,
  toRow: number,
  toCol: number,
  board: (Piece | null)[][]
): boolean => {
  if (toRow < 0 || toRow >= 8 || toCol < 0 || toCol >= 8) return false;
  const targetPiece = board[toRow][toCol];
  if (targetPiece && targetPiece.color === piece.color) return false;

  switch (piece.type) {
    case "K":
      return King.isMoveValid(piece, toRow, toCol, board);
    case "Q":
      return Queen.isMoveValid(piece, toRow, toCol, board);
    case "R":
      return Rook.isMoveValid(piece, toRow, toCol, board);
    case "B":
      return Bishop.isMoveValid(piece, toRow, toCol, board);
    case "N":
      return Knight.isMoveValid(piece, toRow, toCol, board);
    case "P":
      return Pawn.isMoveValid(piece, toRow, toCol, board);
    default:
      return false;
  }
};

// Überprüft, ob ein Zug den König in Sicherheit bringt
export const isMoveSafeForKing = (
  piece: Piece,
  toRow: number,
  toCol: number,
  board: (Piece | null)[][]
): boolean => {
  const originalPosition = { row: piece.row, col: piece.col };
  const simulatedBoard = board.map((row) =>
    row.slice().map((cell) => (cell ? { ...cell } : null))
  );

  simulatedBoard[originalPosition.row][originalPosition.col] = null;
  simulatedBoard[toRow][toCol] = { ...piece, row: toRow, col: toCol };

  const kingPosition =
    piece.type === "K"
      ? { row: toRow, col: toCol }
      : findKingPosition(piece.color, simulatedBoard);

  if (!kingPosition) return false;

  const opponentColor = piece.color === "white" ? "black" : "white";
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const opponentPiece = simulatedBoard[row][col];
      if (
        opponentPiece &&
        opponentPiece.color === opponentColor &&
        isMoveValid(
          opponentPiece,
          kingPosition.row,
          kingPosition.col,
          simulatedBoard
        )
      ) {
        return false;
      }
    }
  }

  return true;
};

// Überprüft, ob der König einer bestimmten Farbe im Schach steht
export const isKingInCheck = (
  color: "white" | "black",
  board: (Piece | null)[][]
): { row: number; col: number } | null => {
  const kingPosition = findKingPosition(color, board);
  if (!kingPosition) return null;

  const opponentColor = color === "white" ? "black" : "white";
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (
        piece &&
        piece.color === opponentColor &&
        isMoveValid(piece, kingPosition.row, kingPosition.col, board)
      ) {
        return kingPosition;
      }
    }
  }
  return null;
};

// Findet die Position des Königs einer bestimmten Farbe auf dem Brett
export const findKingPosition = (
  color: "white" | "black",
  board: (Piece | null)[][]
): { row: number; col: number } | null => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece?.type === "K" && piece.color === color) return { row, col };
    }
  }
  return null;
};

const pieceColors = {
  white: "#444444", // Farbe für weiße Figuren
  black: "black", // Farbe für schwarze Figuren
};

// Funktion, um die Farbe einer Figur basierend auf ihrer Farbe zu holen
export const getPieceColor = (color: "white" | "black"): string => {
  return pieceColors[color];
};

// Confirm castlingexport
export const confirmCastling = async (): Promise<boolean> => {
  const confirmed = await Swal.fire({
    title: "Bist du sicher?",
    text: "Möchtest du rochieren?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ja",
    cancelButtonText: "Nein",
  });
  return confirmed.isConfirmed;
};

// Handle pawn promotion
export const handlePawnPromotion = async (
  piece: Piece,
  toRow: number,
  capturedPieces: Piece[]
): Promise<"Q" | "R" | "B" | "N" | null> => {
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
    showCancelButton: true,
  });
  return choice ? (choice as "Q" | "R" | "B" | "N") : null;
};

// Format time
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};

// Update board after move
export const updateBoardAfterMove = (
  board: (Piece | null)[][],
  fromRow: number,
  fromCol: number,
  toRow: number,
  toCol: number,
  piece: Piece
): (Piece | null)[][] => {
  const newBoard = board.map((row) => row.slice());
  newBoard[fromRow][fromCol] = null; // Clear the original position
  newBoard[toRow][toCol] = {
    ...piece,
    row: toRow,
    col: toCol,
    hasMoved: true,
  }; // Move the piece
  return newBoard;
};

// Add captured piece
export const addCapturedPiece = (
  capturedPieces: string[],
  targetPiece: Piece | null,
  color: "white" | "black"
): string[] => {
  if (targetPiece) {
    capturedPieces.push(targetPiece.type); // Only push the type of the captured piece
  }
  return capturedPieces;
};
