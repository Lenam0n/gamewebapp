import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Sidebar from "./chessSidebar";
import StatusIndicator from "../StatusIndicator";
import ChessBoard from "./ChessBoard";
import GameStartOverlay from "../GameStartOverlay";
import NotificationBar from "../NotificationBar";
import { initialBoard } from "./InitialBoardState";
import {
  isMoveValid,
  isMoveSafeForKing,
  isKingInCheck,
  confirmCastling,
  handlePawnPromotion,
  formatTime,
} from "./ChessUtils"; // Importing utility functions
import { Piece } from "./ChessTypes";

const ChessGame: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);
  const [turn, setTurn] = useState<"white" | "black">("white");
  const [message, setMessage] = useState<string>("");
  const [possibleMoves, setPossibleMoves] = useState<[number, number][]>([]);
  const [whiteCaptured, setWhiteCaptured] = useState<string[]>([]);
  const [blackCaptured, setBlackCaptured] = useState<string[]>([]);
  const [kingInCheck, setKingInCheck] = useState<{
    row: number;
    col: number;
  } | null>(null);

  // Game and move timers
  const [gameTime, setGameTime] = useState(0); // In seconds
  const [moveTime, setMoveTime] = useState(0); // In seconds

  // Start game timer on component mount
  useEffect(() => {
    if (gameStarted) {
      const gameInterval = setInterval(() => {
        setGameTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(gameInterval);
    }
  }, [gameStarted]);

  // Start move timer that resets on every turn change
  useEffect(() => {
    if (gameStarted) {
      setMoveTime(0); // Reset move timer on each move
      const moveInterval = setInterval(() => {
        setMoveTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(moveInterval);
    }
  }, [turn, gameStarted]);

  const handleMove = async (toRow: number, toCol: number) => {
    if (!selectedPiece || selectedPiece.color !== turn) return;

    // Check for castling
    if (
      selectedPiece.type === "K" &&
      (toCol === selectedPiece.col + 2 || toCol === selectedPiece.col - 2)
    ) {
      const confirmed = await confirmCastling();
      if (confirmed) {
        const rookCol = toCol === selectedPiece.col + 2 ? 7 : 0; // Right or left rook
        const newBoard = board.map((row) => row.slice());

        // Move the rook
        newBoard[toRow][toCol - 1] = newBoard[selectedPiece.row][rookCol];
        newBoard[selectedPiece.row][rookCol] = null;

        // Move the king
        newBoard[toRow][toCol] = {
          ...selectedPiece,
          row: toRow,
          col: toCol,
          hasMoved: true,
        };
        newBoard[selectedPiece.row][selectedPiece.col] = null; // Clear original position
        setBoard(newBoard);
        setTurn(turn === "white" ? "black" : "white");
        setSelectedPiece(null);
        setPossibleMoves([]);
        return; // Exit after castling
      }
    }

    // Check for pawn promotion
    if (
      selectedPiece.type === "P" &&
      ((selectedPiece.color === "white" && toRow === 0) ||
        (selectedPiece.color === "black" && toRow === 7))
    ) {
      const capturedPieces: Piece[] =
        selectedPiece.color === "white"
          ? whiteCaptured.map((type) => ({
              type: type as "K" | "Q" | "R" | "B" | "N" | "P",
              color: "black",
              row: -1,
              col: -1,
              hasMoved: false,
            }))
          : blackCaptured.map((type) => ({
              type: type as "K" | "Q" | "R" | "B" | "N" | "P",
              color: "white",
              row: -1,
              col: -1,
              hasMoved: false,
            }));

      const promotionChoice = await handlePawnPromotion(
        selectedPiece,
        toRow,
        capturedPieces
      );

      if (promotionChoice) {
        const newBoard = board.map((row) => row.slice());
        newBoard[toRow][toCol] = {
          type: promotionChoice as "Q" | "R" | "B" | "N", // Ensure valid type
          color: selectedPiece.color,
          row: toRow,
          col: toCol,
          hasMoved: true,
        };
        newBoard[selectedPiece.row][selectedPiece.col] = null; // Clear original position
        setBoard(newBoard);
        setTurn(turn === "white" ? "black" : "white");
        setSelectedPiece(null);
        setPossibleMoves([]);
        return; // Exit after promotion
      }
    }

    // Existing move logic
    if (
      isMoveValid(selectedPiece, toRow, toCol, board) &&
      isMoveSafeForKing(selectedPiece, toRow, toCol, board)
    ) {
      const newBoard = board.map((row) => row.slice());
      newBoard[selectedPiece.row][selectedPiece.col] = null; // Clear original position
      newBoard[toRow][toCol] = {
        ...selectedPiece,
        row: toRow,
        col: toCol,
        hasMoved: true,
      }; // Move the piece

      const targetPiece = board[toRow][toCol];
      if (targetPiece) {
        const updatedCaptured =
          selectedPiece.color === "white" ? whiteCaptured : blackCaptured;
        updatedCaptured.push(targetPiece.type); // Only push the type of the captured piece
        selectedPiece.color === "white"
          ? setWhiteCaptured(updatedCaptured)
          : setBlackCaptured(updatedCaptured);
      }

      setBoard(newBoard);
      setTurn(turn === "white" ? "black" : "white");
      setSelectedPiece(null);
      setPossibleMoves([]);
    } else {
      setMessage("Ungültiger oder unsicherer Zug!");
    }
  };

  const handleSelect = (row: number, col: number) => {
    const piece = board[row][col];
    if (piece && piece.color === turn) {
      setSelectedPiece(piece);
      setPossibleMoves(getPossibleMoves(piece));
      setMessage("");
    } else if (selectedPiece) {
      handleMove(row, col);
    }
  };

  const getPossibleMoves = (piece: Piece): [number, number][] => {
    const moves: [number, number][] = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (
          isMoveValid(piece, row, col, board) &&
          isMoveSafeForKing(piece, row, col, board)
        ) {
          moves.push([row, col]);
        }
      }
    }

    // Add castling squares
    if (piece.type === "K") {
      if (!piece.hasMoved) {
        // Check if rook has moved and king isn't in check
        const canCastleLeft =
          !isKingInCheck(piece.color, board) && !board[piece.row][0];
        const canCastleRight =
          !isKingInCheck(piece.color, board) && !board[piece.row][7];

        if (canCastleLeft) moves.push([piece.row, piece.col - 2]); // Kingside castling
        if (canCastleRight) moves.push([piece.row, piece.col + 2]); // Queenside castling
      }
    }

    return moves;
  };

  useEffect(() => {
    const isInCheck = isKingInCheck(turn, board);
    if (isInCheck) {
      const hasValidMoves = board.some((row) =>
        row.some(
          (piece) => piece?.color === turn && getPossibleMoves(piece).length > 0
        )
      );

      if (!hasValidMoves) {
        Swal.fire({
          title: "Schachmatt!",
          text:
            turn === "white" ? "Schwarz hat gewonnen!" : "Weiß hat gewonnen!",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        setKingInCheck(isInCheck);
        setMessage("Schach! Du musst den König schützen!");
      }
    } else {
      setKingInCheck(null);
      setMessage("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, turn]);

  return (
    <>
      {message && <NotificationBar message={message} />}
      {!gameStarted && (
        <GameStartOverlay
          onGameStart={() => setGameStarted(true)}
          isPlayerOneConnected={true} // Example: both players connected
          isPlayerTwoConnected={true}
        />
      )}
      {gameStarted && (
        <div style={{ display: "flex", height: "100vh" }}>
          <div style={{ margin: "0 auto", padding: "20px" }}>
            <StatusIndicator
              label="Aktueller Spieler"
              value={turn === "white" ? "Weiß" : "Schwarz"}
              color={turn === "white" ? "black" : "darkgray"}
              backgroundColor={turn === "white" ? "#f0f0f0" : "#d3d3d3"}
            />
            <ChessBoard
              board={board}
              possibleMoves={possibleMoves}
              kingInCheck={kingInCheck}
              handleSelect={handleSelect}
            />
          </div>
          <Sidebar
            playerWhite="Spieler 1"
            playerBlack="Spieler 2"
            totalGameTime={formatTime(gameTime)}
            currentMoveTime={formatTime(moveTime)}
            whiteCaptured={whiteCaptured}
            blackCaptured={blackCaptured}
          />
        </div>
      )}
    </>
  );
};

export default ChessGame;
