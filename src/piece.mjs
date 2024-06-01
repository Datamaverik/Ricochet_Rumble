import { Icons } from "./utility-function.mjs";
import { game } from "../testScript.js";

export default class Piece {
  constructor(id, color) {
    this.id = id;
    this.color = color;
    this.element = null;
    this.timeOutIds = [];
    this.cannonDirection = "down";
    this.deflect = new Audio("./src/sounds/deflect.wav");
    this.power = new Audio("./src/sounds/powerup.mp3");
  }

  addPieceToBoard(board, tileId) {
    // Create the piece element and append it to the board
    const piece = document.createElement("div");
    piece.innerHTML = Icons[this.id.slice(0, -3)];
    piece.setAttribute("id", this.id);
    piece.classList.add("pieces");
    piece.style.backgroundColor = this.color;
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

  swap(tile) {
    const T = document.getElementById(tile);
    T.appendChild(this.element);
  }

  rotate() {
    let pieceToRotate = document.getElementById(this.id);
    let orientation = pieceToRotate.style.transform;

    if (pieceToRotate.classList.contains("left")) {
      pieceToRotate.classList.remove("left");
      pieceToRotate.classList.add("right");
    } else {
      pieceToRotate.classList.remove("right");
      pieceToRotate.classList.add("left");
    }

    if (orientation == "scaleY(-1) scaleX(-1)") {
      pieceToRotate.style.transform = "scaleY(-1)";
    } else if (orientation == "scaleY(-1)")
      pieceToRotate.style.transform = "scaleY(-1) scaleX(-1)";
    else if (orientation == "scaleX(-1)")
      pieceToRotate.style.transform = "scaleX(1)";
    else pieceToRotate.style.transform = "scaleX(-1)";
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
      }, i * 150);
    }
  }

  moveCannonBall(tileId) {
    const cannonBall = document.createElement("div");
    cannonBall.classList.add("cannonball");
    cannonBall.innerHTML = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="1280.000000pt" height="886.000000pt" viewBox="0 0 1280.000000 886.000000"
 preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.15, written by Peter Selinger 2001-2017
</metadata>
<g transform="translate(0.000000,886.000000) scale(0.100000,-0.100000)"
 stroke="none">
<path d="M9696 8576 l-169 -246 -157 0 -157 0 -23 183 c-12 100 -26 202 -29
227 l-6 45 -2150 3 c-2278 3 -2309 3 -2595 -44 -1572 -258 -3159 -1662 -3541
-3133 -50 -194 -70 -339 -76 -549 -6 -212 4 -344 42 -537 180 -913 890 -1894
1850 -2557 581 -401 1192 -650 1825 -744 186 -27 834 -34 2770 -32 l1875 3 28
245 c15 135 30 260 33 278 l5 32 173 0 174 0 158 -242 c87 -134 161 -246 164
-251 4 -4 357 -3 785 3 651 9 783 14 807 26 169 88 305 802 372 1959 33 568
40 846 40 1670 0 1369 -50 2341 -159 3060 -75 494 -157 755 -250 803 -12 6
-253 14 -615 21 -327 6 -687 13 -800 16 l-205 6 -169 -245z"/>
</g>
</svg>`;
    // cannonBall.style.backgroundColor = "green";
    if (this.cannonDirection == "up") {
      cannonBall.style.transform = `rotate(90deg)`;
      cannonBall.style.animation = `0.15s moveUp linear forwards`;
    } else if (this.cannonDirection == "down") {
      cannonBall.style.animation = `0.15s moveDown linear forwards`;
      cannonBall.style.transform = `rotate(-90deg)`;
    } else if (this.cannonDirection == "left") {
      cannonBall.style.animation = `0.15s moveLeft linear forwards`;
      cannonBall.style.transform = `rotate(0deg)`;
    } else {
      cannonBall.style.animation = `0.15s moveRight linear forwards`;
      cannonBall.style.transform = `rotate(180deg)`;
    }

    if (document.getElementById(tileId))
      document.getElementById(tileId).appendChild(cannonBall);

    setTimeout(() => {
      if (cannonBall.parentNode) {
        cannonBall.parentNode.removeChild(cannonBall);
      }
    }, 150);
  }

  detectCollison(tileId) {
    let selectedPiece = this.element.id.slice(-2);
    let deflectedTo = "";
    const targetTile = document.getElementById(tileId);

    //Detcting collision with pieces
    if (targetTile && targetTile.hasChildNodes()) {
      const firstChild = targetTile.firstChild;

      //checking if the first child is power up or not
      if (firstChild.classList.contains("powerUp")) {
        const soundClone = this.power.cloneNode();
        soundClone.play();
        const history = document.querySelector(".historyPage");
        const move = document.createElement("p");
        firstChild.parentNode.removeChild(firstChild);

        if (game.PlayerToMove === "P1") {
          game.p2PowerUps++;
          document.getElementById("P2meter").value = game.p2PowerUps / 10;
          game.moveHist.push({player:"P2",spec:"powerUp"});
          move.style.color = "#005ed8";
          move.textContent="Player 2 picked up a power up"
        } else {
          game.p1PowerUps++;
          document.getElementById("P1meter").value = game.p1PowerUps / 10;
          game.moveHist.push({ player: "P1", spec: "powerUp" });
          move.style.color = "brown";
          move.textContent = "Player 1 picked up a power up";
        }

        //printing on history panel
        if (history.firstChild) {
          history.insertBefore(move, history.firstChild);
        } else {
          history.appendChild(move);
        }
        return false;
      }
      //checking if the first child is a piece or not
      if (firstChild.classList.contains("pieces")) {
        //TITAN collision
        if (firstChild.id.slice(0, -3) == "titan") {
          let playerWon;
          if (firstChild.id.slice(-2) == "P1") playerWon = "P2";
          else playerWon = "P1";
          game.endGame(playerWon, "Titan is hit the game is Over!");
        }
        selectedPiece = firstChild.id.slice(-2);
        //TANK collision
        if (firstChild.id.slice(0, -3) == "tank") {
          if (
            this.cannonDirection == "left" &&
            firstChild.id.slice(-2) == "P1"
          ) {
            if (tileId % 8 == 1) return true;
            else return false;
          } else if (
            this.cannonDirection == "right" &&
            firstChild.id.slice(-2) == "P2"
          ) {
            if (tileId % 8 == 0) return true;
            else return false;
          } else {
            this.deflect.play();
            return true;
          }
        }
        //checking if its not cannon, semiRicochet or ricochet
        if (
          firstChild.id.slice(0, -3) == "cannon" ||
          firstChild.id.slice(0 - 3) == "tank"
        ) {
          this.deflect.play();
          return true;
        }
      }
      //RICOCHET collision
      if (firstChild.id.slice(0, -3) == "semiRicochet") {
        this.deflect.play();
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
      //SEMI RICOCHET collision
      else if (firstChild.id.slice(0, -3) == "ricochet") {
        this.deflect.play();
        deflectedTo = firstChild.classList[1];

        if (deflectedTo == "left" && selectedPiece == "P1") {
          if (this.cannonDirection == "up") this.cannonDirection = "left";
          else if (this.cannonDirection == "right")
            this.cannonDirection = "down";
          else {
            firstChild.parentNode.removeChild(firstChild);
            return true;
          }
        } else if (deflectedTo == "right" && selectedPiece == "P1") {
          if (this.cannonDirection == "left") this.cannonDirection = "down";
          else if (this.cannonDirection == "up") this.cannonDirection = "right";
          else {
            firstChild.parentNode.removeChild(firstChild);
            return true;
          }
        } else if (deflectedTo == "left" && selectedPiece == "P2") {
          if (this.cannonDirection == "down") this.cannonDirection = "left";
          else if (this.cannonDirection == "right") this.cannonDirection = "up";
          else {
            firstChild.parentNode.removeChild(firstChild);
            return true;
          }
        } else if (deflectedTo == "right" && selectedPiece == "P2") {
          if (this.cannonDirection == "down") this.cannonDirection = "right";
          else if (this.cannonDirection == "left") this.cannonDirection = "up";
          else {
            firstChild.parentNode.removeChild(firstChild);
            return true;
          }
        }
      }
    }

    //Detecting collision with walls
    if (tileId < 0 || tileId > 64) {
      return true;
    }
    if (tileId % 8 == 0) {
      if (
        this.cannonDirection == "up" ||
        this.cannonDirection == "down" ||
        this.cannonDirection == "left"
      )
        return false;
      else return true;
    } else if (tileId % 8 == 1) {
      if (
        this.cannonDirection == "up" ||
        this.cannonDirection == "down" ||
        this.cannonDirection == "right"
      )
        return false;
      else return true;
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
