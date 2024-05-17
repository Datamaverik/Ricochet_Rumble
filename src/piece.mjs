import { Icons } from "./utility-function.mjs";

export default class Piece {
  constructor(id, color) {
    this.id = id;
    this.color = color;
    this.element = null;
  }

  addPieceToBoard(board, tileId) {
    // Create the piece element and append it to the board
    // console.log(Icons[this.id.slice(0, -3)]);
    const piece = document.createElement("div");
    piece.setAttribute("id", this.id);
    piece.classList.add("pieces");
    // piece.innerHTML = Icons[this.id.slice(0,-3)];
    piece.style.backgroundColor = this.color;
    piece.textContent = this.id.slice(0, -3);
    Array.from(board.querySelectorAll(".square")).forEach((square) => {
      if (square.id == tileId) {
        square.appendChild(piece);
      }
    });
    this.element = piece;
    // console.log(this.element);
  }

  removePieceFromBoard() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }

  //validating which tiles the piece can move
  canMoveToTile(targetTileId) {
    const square = document.getElementById(targetTileId);
    if (square.classList.contains("highlighted")) return true;
    else return false;
  }

  movePiece(targetTileId) {
    const targetTile = document.getElementById(targetTileId);
    if (targetTile && this.canMoveToTile(targetTileId)) {
      targetTile.appendChild(this.element);
    }
  }

  shootCannon() {
    let cannonTile = parseInt(this.element.parentNode.id);
    if (cannonTile < 9) {
      for (let i = 0; i < 7 && cannonTile < 65; i++) {
        setTimeout(() => {
          cannonTile = cannonTile + 8;
          // console.log(cannonTile);
          this.moveCannonBall(cannonTile);
        }, i * 300);
      }
    } else if (cannonTile > 56) {
      for (let i = 0; i < 7 && cannonTile > 0; i++) {
        setTimeout(() => {
          cannonTile = cannonTile - 8;
          // console.log(cannonTile);
          this.moveCannonBall(cannonTile);
        }, i * 300);
      }
    }
  }

  moveCannonBall(tileId) {
    const cannonBall = document.createElement("div");
    cannonBall.classList.add("cannonball");
    cannonBall.style.backgroundColor = "green";
    // console.log(document.getElementById(tileId));
    console.log(cannonBall);
    document.getElementById(tileId).appendChild(cannonBall);

    setTimeout(() => {
      if (cannonBall.parentNode) {
        cannonBall.parentNode.removeChild(cannonBall);
        console.log("removed");
      }
    }, 300);
  }
}
