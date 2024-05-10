import { occupiedTiles } from "./script.js";

export function validateMove(piece, board) {
  piece.addEventListener("click", (e) => {
    Array.from(board).forEach((square) => {
      if (square.classList.contains("highlighted")) {
        square.classList.remove("highlighted");
      }
    });
    let m, l;
    const k = parseInt(e.target.parentNode.id);
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
    Array.from(board).forEach((square) => {
      occupiedTiles.forEach((tile) => {
        if (square.id == tile && square.classList.contains("highlighted")) {
          square.classList.remove("highlighted");
        }
      });
    });
  });
}

export function checkMoves(gameBoard, squares, id) {
  gameBoard.addEventListener("click", (e) => {
    //checking moves for titan
    if (
      e.target.classList.contains("highlighted") ||
      e.target.childCount > 0 ||
      e.target.id == "titan" ||
      e.target.id == "tank"
    ) {
    } else {
      Array.from(squares).forEach((square) => {
        if (square.classList.contains("highlighted")) {
          square.classList.remove("highlighted");
        }
      });
    }
  });
}
