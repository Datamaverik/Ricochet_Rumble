import Piece from "./piece.mjs";

export default class Game {
  constructor(boardSelector) {
    this.gameBoard = boardSelector;
    this.selectedPiece = null;
    this.pieces = [];
    this.PlayerToMove = "P1";
  }

  createGameBoard() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const square = document.createElement("div");
        const uniqueId = 8 * i + (j + 1);
        square.classList.add("square");
        square.setAttribute("id", `${uniqueId}`);

        if ((i + j) % 2 == 0) {
          square.style.backgroundColor = "gray";
        } else {
          square.style.backgroundClip = "black";
        }
        this.gameBoard.appendChild(square);
      }
    }
  }

  addPiece(id, color, tileId) {
    const piece = new Piece(id, color);
    piece.addPieceToBoard(this.gameBoard, tileId);
    this.pieces.push(piece);
  }

  movePiece(selectedPieceId, targetTileId) {
    console.log(this.PlayerToMove);
    console.log(selectedPieceId.slice(-2));
    const piece = this.pieces.find((piece) => piece.id === selectedPieceId);
    if (piece && this.PlayerToMove == selectedPieceId.slice(-2)) {
      piece.movePiece(targetTileId);
    }
    //setting the player to move property for the next move
    if (selectedPieceId.slice(-2) == "P1") {
      this.PlayerToMove = "P2";
    } else {
      this.PlayerToMove = "P1";
    }
  }

  removePiece(pieceId) {
    const pieceIndex = this.pieces.findIndex((piece) => piece.id === pieceId);
    if (pieceIndex !== -1) {
      this.pieces[pieceIndex].removePieceFromBoard();
      this.pieces.splice(pieceIndex, 1);
    }
  }

  highlightValidMoves(board, targetTile, selectedPiece) {
    //checking if the correct turn is being moved or not
    if (selectedPiece.slice(-2) == this.PlayerToMove) {
      // Remove any existing highlights
      Array.from(board).forEach((square) => {
        if (square.classList.contains("highlighted")) {
          square.classList.remove("highlighted");
        }
      });

      //different movement logic for cannon
      if (selectedPiece.slice(0, -3) == "cannon") {
        const k = parseInt(targetTile);
        if (k <= 8 || k >= 57) {
          Array.from(board).forEach((square) => {
            if (square.id == k - 1 || square.id == k + 1)
              square.classList.add("highlighted");
          });
        }
      } else {
        let m, l;
        const k = parseInt(targetTile);
        if (k - 8 > 0) m = k - 8;
        else m = k;
        if (k + 8 < 65) l = k + 8;
        else l = k;
        if (k % 8 === 0) {
          Array.from(board).forEach((square) => {
            if (
              square.id == m - 1 ||
              square.id == m ||
              square.id == k - 1 ||
              square.id == k ||
              square.id == l - 1 ||
              square.id == l
            ) {
              square.classList.add("highlighted");
            }
          });
        } else if (k % 8 === 1) {
          Array.from(board).forEach((square) => {
            if (
              square.id == m ||
              square.id == m + 1 ||
              square.id == k + 1 ||
              square.id == l + 1 ||
              square.id == k ||
              square.id == l
            ) {
              square.classList.add("highlighted");
            }
          });
        } else {
          Array.from(board).forEach((square) => {
            if (
              square.id == m - 1 ||
              square.id == m ||
              square.id == k - 1 ||
              square.id == k ||
              square.id == l - 1 ||
              square.id == l ||
              square.id == m + 1 ||
              square.id == k + 1 ||
              square.id == l + 1
            ) {
              square.classList.add("highlighted");
            }
          });
        }
      }

      Array.from(board).forEach((square) => {
        this.pieces.forEach((piece) => {
          if (square.firstChild)
            if (
              square.firstChild.id == piece.id &&
              square.classList.contains("highlighted")
            ) {
              square.classList.remove("highlighted");
            }
        });
      });
    }
  }

  removeHighlights(board) {
    Array.from(board).forEach((square) => {
      if (square.classList.contains("highlighted")) {
        square.classList.remove("highlighted");
      }
    });
  }
}
