import { Icons } from "./utility-function.mjs";

export default class Piece {
  constructor(id, color) {
    this.id = id;
    this.color = color;
    this.element = null;
    this.timeOutIds = [];
    this.cannonDirection = "down";
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
    if (cannonTile < 9) this.cannonDirection = "down";
    if (cannonTile > 56) this.cannonDirection = "up";
    for (let i = 0; i < 64; i++) {
      this.timeOutIds[i] = setTimeout(() => {
        if (this.cannonDirection == "down") cannonTile = cannonTile + 8;
        if (this.cannonDirection == "up") cannonTile = cannonTile - 8;
        if (this.cannonDirection == "left") cannonTile = cannonTile - 1;
        if (this.cannonDirection == "right") cannonTile = cannonTile + 1;
        this.moveCannonBall(cannonTile);
        if (this.detectCollison(cannonTile)) {
          this.clearAllTimeouts();
          return;
        }
      }, i * 200);
    }
  }

  moveCannonBall(tileId) {
    const cannonBall = document.createElement("div");
    cannonBall.classList.add("cannonball");
    cannonBall.style.backgroundColor = "green";

    document.getElementById(tileId).appendChild(cannonBall);

    setTimeout(() => {
      if (cannonBall.parentNode) {
        cannonBall.parentNode.removeChild(cannonBall);
      }
    }, 200);
  }

  detectCollison(tileId) {
    const targetTile = document.getElementById(tileId);
    if (targetTile && targetTile.hasChildNodes()) {
      const firstChild = targetTile.firstChild;
      if (
        firstChild &&
        firstChild.classList.contains("pieces") &&
        firstChild.id.slice(0, -3) !== "cannon" &&
        firstChild.id.slice(0, -3) !== "semiRicochet" &&
        firstChild.id.slice(0, -3) !== "ricochet"
      ) {
        return true;
      }
      if (
        firstChild.id.slice(0, -3) == "ricochet" ||
        firstChild.id.slice(0, -3) == "semiRicochet"
      ) {
        this.cannonDirection = "left";
      }
    }
    if (tileId % 8 == 0 || tileId % 8 == 1 || tileId<9 || tileId>56) {
      return true;
    }
    return false;
  }

  changeDirection() {
    let cannonTile = parseInt(this.element.parentNode.id);
  }

  clearAllTimeouts() {
    this.timeOutIds.forEach((ID) => {
      clearTimeout(ID);
    });
    this.timeOutIds = [];
  }
}
