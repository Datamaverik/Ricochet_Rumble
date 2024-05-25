import { Icons } from "./utility-function.mjs";
import { game } from "./testScript.js";

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
    const piece = document.createElement("div");
    piece.setAttribute("id", this.id);
    piece.classList.add("pieces");
    piece.innerHTML = Icons[this.id.slice(0, -3)];
    piece.style.backgroundColor = this.color;
    Array.from(board.querySelectorAll(".square")).forEach((square) => {
      if (square.id == tileId) {
        square.appendChild(piece);
      }
    });
    this.element = piece;
  }

  removePieceFromBoard(piece) {
    if (piece && piece.parentNode) {
      piece.parentNode.removeChild(piece);
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

  swap(tile){
    const T = document.getElementById(tile);
    T.appendChild(this.element);
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
    let selectedPiece = this.element.id.slice(-2);
    let deflectedTo = "";
    const targetTile = document.getElementById(tileId);
    if (targetTile && targetTile.hasChildNodes()) {
      const firstChild = targetTile.firstChild;
      //checking if the first child is a piece or not
      if (firstChild.classList.contains("pieces")) {
        //checking if the titan is hit 
        if (firstChild.id.slice(0, -3) == "titan") {
          
          let playerWon;
          if (firstChild.id.slice(-2) == "P1") playerWon = "P2";
          else playerWon = "P1";
          game.endGame(playerWon, "Titan is hit the game is Over!");
        }
        //updating the selected piece
        selectedPiece = firstChild.id.slice(-2);
        //checking if its not cannon, semiRicochet or ricochet
        if (
          firstChild.id.slice(0, -3) !== "cannon" &&
          firstChild.id.slice(0, -3) !== "semiRicochet" &&
          firstChild.id.slice(0, -3) !== "ricochet"
        ) {
          return true;
        }
      }
      //defining the cannon ball direction based on the orientation of the semi ricochet which deflects from both side
      if (firstChild.id.slice(0, -3) == "semiRicochet") {
        deflectedTo = firstChild.classList[1];
        //turn logic for "/" this shaped semi ricochet
        if (
          (deflectedTo == "left" && selectedPiece == "P1") ||
          (deflectedTo == "right" && selectedPiece == "P2")
        ) {
          if (this.cannonDirection == "left") this.cannonDirection = "up";
          else if (this.cannonDirection == "down")
            this.cannonDirection = "right";
          else if (this.cannonDirection == "up") this.cannonDirection = "left";
          else if (this.cannonDirection == "right")
            this.cannonDirection = "down";
        }
        //turn logic for "\" this shaped semi ricochet
        else if (
          (deflectedTo == "left" && selectedPiece == "P2") ||
          (deflectedTo == "right" && selectedPiece == "P1")
        ) {
          if (this.cannonDirection == "left") this.cannonDirection = "down";
          else if (this.cannonDirection == "down")
            this.cannonDirection = "left";
          else if (this.cannonDirection == "up") this.cannonDirection = "right";
          else if (this.cannonDirection == "right") this.cannonDirection = "up";
        }
      }
      //turn logic for the ricochet which can deflect from only one side
      else if (firstChild.id.slice(0, -3) == "ricochet") {
        deflectedTo = firstChild.classList[1];

        if (deflectedTo == "left" && selectedPiece == "P1") {
          if (this.cannonDirection == "up") this.cannonDirection = "left";
          else if (this.cannonDirection == "right")
            this.cannonDirection = "down";
          else {
            this.removePieceFromBoard(firstChild);
            return true;
          }
        } else if (deflectedTo == "right" && selectedPiece == "P1") {
          if (this.cannonDirection == "left") this.cannonDirection = "down";
          else if (this.cannonDirection == "up") this.cannonDirection = "right";
          else{
            this.removePieceFromBoard(firstChild);
            return true;
          }
        } else if (deflectedTo == "left" && selectedPiece == "P2") {
          if (this.cannonDirection == "down") this.cannonDirection = "left";
          else if (this.cannonDirection == "right") this.cannonDirection = "up";
          else {
            this.removePieceFromBoard(firstChild);
            return true;
          }
        } else if (deflectedTo == "right" && selectedPiece == "P2") {
          if (this.cannonDirection == "down") this.cannonDirection = "right";
          else if (this.cannonDirection == "left") this.cannonDirection = "up";
          else {
            this.removePieceFromBoard(firstChild);
            return true;
          }
        }
      }
    }
    if (tileId % 8 == 0 || tileId % 8 == 1 || tileId < 9 || tileId > 56) {
      return true;
    }
    return false;
  }

  clearAllTimeouts() {
    this.timeOutIds.forEach((ID) => {
      clearTimeout(ID);
    });
    this.timeOutIds = [];
  }
}
