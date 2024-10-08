import { powerUps, setPowerUp, pul } from "../testScript.js";
import { PUlocation } from "./utility-function.mjs";
import Piece from "./piece.mjs";
import {
  addClasses,
  addPieces,
  giveDir,
  addPowerUps,
} from "./utility-function.mjs";

export default class Game {
  constructor(boardSelector) {
    this.gameBoard = boardSelector;
    this.selectedPiece = null;
    this.pieces = [];
    this.timerP1 = 300;
    this.timerP2 = 300;
    this.PlayerToMove = "P1";
    this.isPaused = false;
    this.moveHist = [];
    this.from = "";
    this.to = "";
    this.fromSwap = "";
    this.ptr = 0;
    this.singlePlayerMode = false;
    this.moves = ["move", "rotate", "swap", "move"];
    this.isGameEnded = false;
    this.p1PowerUps = 0;
    this.p2PowerUps = 0;
    this.replayMode = false;

    this.P1addRico = false;
    this.P1addSemi = false;
    this.P2addRico = false;
    this.P2addSemi = false;
    this.teleport = false;
    this.setTrap = false;

    this.sounds = {
      move: new Audio("./src/sounds/movePiece.wav"),
      shoot: new Audio("./src/sounds/cannon2.wav"),
      dialog: new Audio("./src/sounds/dialog.wav"),
      click: new Audio("./src/sounds/click.wav"),
      shop: new Audio("./src/sounds/shop.wav"),
      mode: new Audio("./src/sounds/gameMode.wav"),
      energy: new Audio("./src/sounds/energy.wav"),
      powerup: new Audio("./src/sounds/powerup.mp3"),
      teleport: new Audio("./src/sounds/teleport.wav"),
      destroy: new Audio("./src/sounds/destroy.mp3"),
      deflect: new Audio("./src/sounds/deflect.wav"),
    };
  }

  botMove() {
    if (this.isGameEnded) return;
    // Get all player 2 pieces
    const pieces = this.getPieces("P2");

    // Select a random piece
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];

    //get move to be made
    const move = this.moves[Math.floor(Math.random() * this.moves.length)];
    const validMoves = Array.from(this.getValidMoves(randomPiece));
    let randomMove = 0;
    // Get valid moves for the selected piece
    if (validMoves.length > 0) {
      // Select a random valid move
      randomMove = validMoves[Math.floor(Math.random() * validMoves.length)].id;
    }

    //moving pieces
    if (move == "move") {
      // Move the piece to the selected tile
      this.movePiece(randomPiece.id, randomMove);
    }
    //rotating pieces
    else if (move == "rotate") {
      if (
        randomPiece.id == "ricochet-P2" ||
        randomPiece.id == "semiRicochet-P2"
      ) {
        this.rotatePiece(randomPiece.id, this.gameBoard);
      } else {
        this.movePiece(randomPiece.id, randomMove);
      }
    }
    //swapping pieces
    else if (move == "swap") {
      if (randomPiece.id == "semiRicochet-P2") {
        this.highlightSwapables(this.gameBoard, randomPiece.id);
        const pieces2 = Array.from(
          this.gameBoard.querySelectorAll(".swapable")
        );
        const randomPiece2 =
          pieces2[Math.floor(Math.random() * pieces.length)].id;
        this.swapPiece(randomPiece2);
      } else {
        this.movePiece(randomPiece.id, randomMove);
      }
    }

    // Switch to player 1's turn
    this.PlayerToMove = "P1";
  }

  getPieces(player) {
    let playerPieces = [];
    const pieces = this.gameBoard.querySelectorAll(".pieces");
    Array.from(pieces).forEach((p) => {
      if (p.id.slice(-2) == player) playerPieces.push(p);
    });
    return playerPieces;
  }

  getValidMoves(piece) {
    this.highlightValidMoves(
      this.gameBoard.querySelectorAll(".square"),
      piece.parentNode.id,
      piece.id
    );
    return this.gameBoard.querySelectorAll(".highlighted");
  }

  replay() {
    this.replayMode = true;
    this.resetBoard();
    this.PlayerToMove = "P1";
    document.getElementById("pauseScreen").close();
    document.getElementById("pauseScreen").style.display = "none";

    this.disableBoard();
    document
      .getElementById("btn-container")
      .querySelectorAll("button")
      .forEach((b) => {
        b.disabled = true;
      });
    document
      .getElementById("moveBtn")
      .querySelectorAll("button")
      .forEach((b) => {
        b.disabled = true;
      });

    this.stopTimer("P1");
    this.stopTimer("P2");
    const hist = JSON.parse(localStorage.getItem("games")) || [];

    // Recursive function to replay moves
    const replayMoves = (i) => {
      if (i >= hist[hist.length - 1].length) {
        return; // Base case: exit recursion when all moves are replayed
      }

      setTimeout(() => {
        let move = this.moveHist[i];
        let peice = this.pieces.find((p) => p.id == move.piece);
        // console.log(peice);

        if (move.spec == null) {
          this.playSound("move");
          peice.swap(move.to);
        } else if (move.spec == "rotate") {
          this.playSound("move");
          peice.rotate();
        } else if (move.spec == "swap") {
          this.playSound("move");
          peice.swap(move.to);

          // Handle the next swap move immediately
          i++;
          if (i < hist[hist.length - 1].length) {
            move = this.moveHist[i];
            peice = this.pieces.find((p) => p.id == move.piece);
            peice.swap(move.to);
          }
        } else if (move.spec == "spell") {
          const piceToMove = move.piece;
          const player = move.piece.slice(-2);
          if (player == "P1" && piceToMove) {
            this.playSound("move");
            this.addPiece(piceToMove, "brown", move.to);
            document.getElementById(piceToMove).classList.add("right");
            if (piceToMove.slice(0, -4) == "ricochet") {
              const piece = document.getElementById("ricochetB-P1");
              piece.style.transform = "scaleY(-1) scaleX(-1)";
            }
          }
          if (player == "P2" && piceToMove) {
            this.playSound("move");
            this.addPiece(piceToMove, "#005ed8", move.to);
            document.getElementById(piceToMove).classList.add("left");
          }
          //searching for all the cannons to shoot after move has been made
          this.pieces.forEach((piece) => {
            if (piece.id.slice(-2) == this.PlayerToMove) {
              if (piece.id.substring(0, piece.id.length - 3) == "cannon") {
                this.playSound("shoot");
                piece.shootCannon();
              }
            }
          });
          this.PlayerToMove = this.PlayerToMove === "P1" ? "P2" : "P1";
        } else if (move.spec == "powerSpawn") {
          let pul = [];
          pul.push(...move.to);
          this.playSound("energy");
          pul.forEach((p) => {
            const sq = document.getElementById(p);
            if (!sq.hasChildNodes()) {
              const pU = document.createElement("div");
              pU.innerHTML = `<svg  version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        	  viewBox="0 0 940.688 940.688"
        	 xml:space="preserve">
        <g>
        	<path d="M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8
        		c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601
        		c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z"/>
        </g>
        </svg>`;
              pU.classList.add("powerUp");
              sq.appendChild(pU);
            }
          });
        } else if (move.spec == "destroy") {
          this.playSound("destroy", 0.6);
          peice.element.parentNode.removeChild(peice.element);
        }
        // Applying animations to the movement of pieces
        if (peice !== undefined) {
          let diff = move.to - move.from;
          let direction = giveDir(diff);
          peice.element.style.animation = "none";
          peice.element.offsetHeight; // Trigger reflow
          peice.element.style.animation = "";
          peice.element.style.animation = `0.2s ${direction} linear forwards`;

          // Searching for all the cannons to shoot after move has been made
          this.pieces.forEach((piece) => {
            if (piece.id.slice(-2) == this.PlayerToMove) {
              if (piece.id.substring(0, piece.id.length - 3) == "cannon") {
                this.playSound("shoot");
                piece.shootCannon();
              }
            }
          });

          // Setting the playerToMove property for the next move
          this.PlayerToMove = this.PlayerToMove === "P1" ? "P2" : "P1";
        }
        // Recursively call the replay function for the next move
        replayMoves(i + 1);
      }, 1500);
    };

    setTimeout(() => {
      replayMoves(0);
    }, 1500);
  }

  resetBoard() {
    this.pieces.forEach((piece) => {
      piece.removePieceFromBoard();
    });
    this.pieces = [];
    Array.from(this.gameBoard.querySelectorAll(".square")).forEach((sq) => {
      if (sq.firstChild) {
        if (sq.firstChild.classList.contains("powerUp")) {
          const child = sq.firstChild;
          sq.removeChild(child);
        }
      }
    });
    addPieces(this);
    this.p1PowerUps = 0;
    this.p2PowerUps = 0;
    document.getElementById("P2meter").value = this.p2PowerUps / 10;
    document.getElementById("P1meter").value = this.p1PowerUps / 10;
    addPowerUps(pul);
    addClasses();
  }

  playSound(sound, vol = 1) {
    if (this.sounds[sound]) {
      const soundClone = this.sounds[sound].cloneNode();
      soundClone.volume = vol;
      soundClone.play();
    }
  }

  recordMove(pieceMoved, from, to, spec) {
    const move = {
      piece: pieceMoved,
      from: from,
      to: to,
      spec: spec,
    };
    this.moveHist.push(move);
    this.ptr = this.moveHist.length;
  }

  undoMove() {
    if (this.ptr > 0) {
      this.disableBoard();
      this.ptr--;
      const move = this.moveHist[this.ptr];
      const peice = this.pieces.find((p) => p.id == move.piece);
      if (move.spec == null) {
        this.playSound("move");
        peice.swap(move.from);
      } else if (move.spec == "rotate") {
        this.playSound("move");
        peice.rotate();
      } else if (move.spec == "swap") {
        this.playSound("move");
        peice.swap(move.from);
        this.ptr--;
        const move2 = this.moveHist[this.ptr];
        const peice2 = this.pieces.find((p) => p.id == move2.piece);
        peice2.swap(move2.from);
      } else if (move.spec == "powerUp") {
        this.playSound("move");
        const powerUp = document.createElement("div");
        powerUp.innerHTML = `<svg  version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	  viewBox="0 0 940.688 940.688"
	 xml:space="preserve">
<g>
	<path d="M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8
		c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601
		c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z"/>
</g>
</svg>`;
        powerUp.classList.add("powerUp");
        document.getElementById(move.tile).appendChild(powerUp);
      } else if (move.spec == "spell") {
        this.playSound("move");
        peice.element.parentNode.removeChild(peice.element);
      } else if (move.spec == "destroy") {
        this.playSound("move");
        peice.addPieceToBoard(this.gameBoard, move.from);
      }
    }
  }

  redoMove() {
    if (this.ptr < this.moveHist.length) {
      const move = this.moveHist[this.ptr];
      this.ptr++;
      const peice = this.pieces.find((p) => p.id == move.piece);
      if (move.spec == null) {
        this.playSound("move");
        peice.swap(move.to);
      } else if (move.spec == "rotate") {
        this.playSound("move");
        peice.rotate();
      } else if (move.spec == "swap") {
        this.playSound("move");
        peice.swap(move.to);
        const move2 = this.moveHist[this.ptr];
        this.ptr++;
        const peice2 = this.pieces.find((p) => p.id == move2.piece);
        peice2.swap(move2.to);
      } else if (move.spec == "powerUp") {
        this.playSound("move");
        const parent = document.getElementById(move.tile);
        const child = parent.firstChild;
        parent.removeChild(child);
      } else if (move.spec == "spell") {
        this.playSound("move");
        const parent = document.getElementById(move.to);
        parent.appendChild(peice.element);
      } else if (move.spec == "destroy") {
        this.playSound("destroy", 0.6);
        peice.element.parentNode.removeChild(peice.element);
      }
    }
    if (this.ptr >= this.moveHist.length) {
      this.enableBoard();
    }
  }

  disableBoard() {
    this.gameBoard.classList.add("disabled");
    this.isPaused = true;
  }

  enableBoard() {
    this.gameBoard.classList.remove("disabled");
    this.isPaused = false;
  }

  printMoveHist(pieceMoved, from, to) {
    const history = document.querySelector(".historyPage");
    const move = document.createElement("p");
    if (from == "left" || from == "right")
      move.textContent = `${pieceMoved.slice(0, -3)} was rotated`;
    else
      move.textContent = `${pieceMoved.slice(
        0,
        -3
      )} was moved from ${from} to ${to}`;
    if (pieceMoved.slice(-2) == "P1") {
      move.style.color = "brown";
    } else {
      move.style.color = "#005ed8";
    }
    if (history.firstChild) {
      history.insertBefore(move, history.firstChild);
    } else {
      history.appendChild(move);
    }
  }

  initTimers() {
    // Display the initial timers
    document.getElementById("timerP1").textContent = this.formatTime(
      this.timerP1
    );
    document.getElementById("timerP2").textContent = this.formatTime(
      this.timerP2
    );
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    //checking if half of time has elasped
    if (
      (this.timerP1 + this.timerP2) / 2 == 100 ||
      (this.timerP1 + this.timerP2) / 2 == 200
    ) {
      setPowerUp([]);
      PUlocation();
      this.playSound("energy");
      powerUps.forEach((p) => {
        const sq = document.getElementById(p);
        if (!sq.hasChildNodes()) {
          const pU = document.createElement("div");
          pU.innerHTML = `<svg  version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	  viewBox="0 0 940.688 940.688"
	 xml:space="preserve">
<g>
	<path d="M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8
		c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601
		c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z"/>
</g>
</svg>`;
          pU.classList.add("powerUp");
          sq.appendChild(pU);
        }
      });
      this.recordMove("powerUps", null, powerUps, "powerSpawn");
    }
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }

  startTimer(player) {
    if (player === "P1") {
      this.intervalP1 = setInterval(() => {
        if (this.timerP1 > 0) {
          this.timerP1--;
          document.getElementById("timerP1").textContent = this.formatTime(
            this.timerP1
          );
        } else {
          this.endGame("P1", "Time's up!!!");
        }
      }, 1000);
    } else {
      this.intervalP2 = setInterval(() => {
        if (this.timerP2 > 0) {
          this.timerP2--;
          document.getElementById("timerP2").textContent = this.formatTime(
            this.timerP2
          );
        } else {
          this.endGame("P2", "Time's up!!!");
        }
      }, 1000);
    }
  }

  stopTimer(player) {
    if (player === "P1") {
      clearInterval(this.intervalP1);
    } else {
      clearInterval(this.intervalP2);
    }
  }

  toggleTimer() {
    if (this.isPaused) {
      this.PlayerToMove == "P1" ? this.startTimer("P2") : this.startTimer("P1");
      this.isPaused = false;
    } else {
      this.stopTimer("P1");
      this.stopTimer("P2");
      this.isPaused = true;
    }
  }

  switchTimer() {
    if (this.PlayerToMove === "P1") {
      this.stopTimer("P2");
      this.startTimer("P1");
    } else {
      this.stopTimer("P1");
      this.startTimer("P2");
    }
  }

  endGame(winner, msg) {
    this.isGameEnded = true;
    try {
      let game = JSON.parse(localStorage.getItem("games")) || [];
      game.push(this.moveHist);
      localStorage.setItem("games", JSON.stringify(game));
    } catch (e) {
      if (e.name == "QuotaExceededError") {
        this.playSound("dialog");
        document.getElementById("pauseScreen").showModal();
        document.getElementById("pauseScreen").style.display = "flex";
        document.getElementById("game-msg").textContent =
          "Local storage is full. Please reset the memory.";
        document.getElementById("resume").style.display = "none";
        document.getElementById("restart").style.display = "none";
      }
    }
    document.getElementById("replay").style.display = "block";
    this.playSound("dialog");
    document.getElementById("pauseScreen").showModal();
    document.getElementById("pauseScreen").style.display = "flex";
    document.getElementById("game-msg").textContent =
      msg + `, ${winner} wins!!`;
    document.getElementById("resume").style.display = "none";
    document.getElementById("single").style.display = "none";
    document.getElementById("double").style.display = "none";
    document.getElementById("restart").style.display = "flex";

    this.stopTimer("P1");
    this.stopTimer("P2");
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
    const piece = this.pieces.find((piece) => piece.id === selectedPieceId);
    if (piece && this.PlayerToMove == selectedPieceId.slice(-2)) {
      //checking if a trap is laid or not
      let player;
      this.PlayerToMove == "P1" ? (player = "P2") : (player = "P1");
      if (
        document
          .getElementById(targetTileId)
          .classList.contains("trap" + player)
      ) {
        this.showBlastAnimation(targetTileId);
        this.playSound("destroy", 0.6);
        document.getElementById(targetTileId).classList.remove("trap" + player);
        console.log("from = " + this.from);
        console.log("to = " + targetTileId);
        this.recordMove(selectedPieceId, this.from, targetTileId, "destroy");
        piece.element.parentNode.removeChild(piece.element);
        this.switchTimer();
        this.PlayerToMove = this.PlayerToMove === "P1" ? "P2" : "P1";
        return;
      }
      this.to = targetTileId;
      this.recordMove(selectedPieceId, this.from, this.to, null);
      this.printMoveHist(selectedPieceId, this.from, this.to);
      this.playSound("move");

      //Applying animations to the movement of pieces
      let diff = this.to - this.from;
      let direction = giveDir(diff);
      piece.element.style.animation = "none";
      piece.element.offsetHeight; // Trigger reflow
      piece.element.style.animation = "";
      piece.element.style.animation = `0.2s ${direction} linear forwards`;

      piece.movePiece(targetTileId);
      //searching for all the cannons to shoot after move has been made
      this.pieces.forEach((piece) => {
        if (piece.id.slice(-2) == this.PlayerToMove) {
          if (piece.id.substring(0, piece.id.length - 3) == "cannon") {
            this.playSound("shoot");
            piece.shootCannon();
          }
        }
      });
      this.switchTimer();
    }
    //setting the playerToMove property for the next move
    this.PlayerToMove = this.PlayerToMove === "P1" ? "P2" : "P1";
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
      this.from = targetTile;
      // Remove any existing highlights
      Array.from(board).forEach((square) => {
        if (square.classList.contains("highlighted")) {
          square.classList.remove("highlighted");
        }
      });
      //checking if the teleportation mode is on or not
      if (this.teleport && selectedPiece.slice(0, -3) !== "cannon") {
        this.playSound("teleport");
        Array.from(this.gameBoard.querySelectorAll(".square")).forEach((sq) => {
          if (!sq.hasChildNodes()) {
            sq.classList.add("highlighted");
          }
        });
        this.teleport = false;
        if (this.PlayerToMove == "P1") {
          this.p1PowerUps = 0;
          document.getElementById("P1meter").value = this.p1PowerUps / 10;
          document.getElementById("shop1").style.display = "none";
        } else if (this.PlayerToMove == "P2") {
          this.p2PowerUps = 0;
          document.getElementById("P2meter").value = this.p2PowerUps / 10;
          document.getElementById("shop2").style.display = "none";
        }
      }

      //different movement logic for cannon
      if (selectedPiece.slice(0, -3) == "cannon") {
        const k = parseInt(targetTile);
        if (k <= 8 && k >= 1) {
          if (k == 8) {
            Array.from(board).forEach((square) => {
              if (square.id == k - 1) square.classList.add("highlighted");
            });
          } else if (k == 1) {
            Array.from(board).forEach((square) => {
              if (square.id == k + 1) square.classList.add("highlighted");
            });
          } else {
            Array.from(board).forEach((square) => {
              if (square.id == k - 1 || square.id == k + 1)
                square.classList.add("highlighted");
            });
          }
        }
        if (k <= 64 && k >= 57) {
          if (k == 57) {
            Array.from(board).forEach((square) => {
              if (square.id == k + 1) square.classList.add("highlighted");
            });
          } else if (k == 64) {
            Array.from(board).forEach((square) => {
              if (square.id == k - 1) square.classList.add("highlighted");
            });
          } else {
            Array.from(board).forEach((square) => {
              if (square.id == k - 1 || square.id == k + 1)
                square.classList.add("highlighted");
            });
          }
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
        if (square.firstChild) {
          if (square.firstChild.classList.contains("powerUp"))
            square.classList.remove("highlighted");
        }
      });
    }
  }

  removeHighlights(board) {
    Array.from(board.querySelectorAll(".square")).forEach((square) => {
      if (square.classList.contains("highlighted")) {
        square.classList.remove("highlighted");
      }
      if (square.classList.contains("toAdd")) {
        square.classList.remove("toAdd");
      }
      if (square.classList.contains("toTrap")) {
        square.classList.remove("toTrap");
      }
    });
    Array.from(board.querySelectorAll(".pieces")).forEach((piece) => {
      if (piece.classList.contains("swapable")) {
        piece.classList.remove("swapable");
      }
    });
  }

  rotatePiece(selectedPiece, board) {
    if (this.PlayerToMove == selectedPiece.slice(-2)) {
      let pieceToRotate = document.getElementById(selectedPiece);
      let orientation = pieceToRotate.style.transform;

      if (pieceToRotate.classList.contains("left")) {
        pieceToRotate.classList.remove("left");
        this.from = "left";
        pieceToRotate.classList.add("right");
        this.to = "right";
      } else {
        pieceToRotate.classList.remove("right");
        this.from = "right";
        pieceToRotate.classList.add("left");
        this.to = "left";
      }
      if (orientation == "scaleY(-1) scaleX(-1)") {
        pieceToRotate.style.transform = "scaleY(-1)";
      } else if (orientation == "scaleY(-1)")
        pieceToRotate.style.transform = "scaleY(-1) scaleX(-1)";
      else if (orientation == "scaleX(-1)")
        pieceToRotate.style.transform = "scaleX(1)";
      else pieceToRotate.style.transform = "scaleX(-1)";

      this.playSound("move");
      this.recordMove(selectedPiece, this.from, this.to, "rotate");
      this.printMoveHist(selectedPiece, this.from, this.to);
      this.removeHighlights(board);
      rotateBtn.style.visibility = "hidden";
    }
    //searching for all the cannons to shoot after move has been made
    this.pieces.forEach((piece) => {
      if (piece.id.slice(-2) == this.PlayerToMove) {
        if (piece.id.substring(0, piece.id.length - 3) == "cannon") {
          this.playSound("shoot");
          piece.shootCannon();
        }
      }
    });
    this.switchTimer();
    //setting the playerToMove property for the next move
    this.PlayerToMove = this.PlayerToMove === "P1" ? "P2" : "P1";
  }

  swapPiece(piece) {
    const toSwap = this.pieces.find((p) => p.id == piece);
    const tile1 = this.fromSwap.element.parentNode.id;
    const tile2 = toSwap.element.parentNode.id;
    this.playSound("move");
    this.fromSwap.swap(tile2);
    toSwap.swap(tile1);
    this.recordMove(this.fromSwap.id, tile1, tile2, "swap");
    this.recordMove(toSwap.id, tile2, tile1, null);

    //printing the move
    const history = document.querySelector(".historyPage");
    const move = document.createElement("p");
    move.textContent = `${piece.slice(
      0,
      -3
    )} was swapped with ${this.fromSwap.id.slice(0, -3)}`;
    if (this.PlayerToMove == "P1") {
      move.style.color = "brown";
    } else {
      move.style.color = "#005ed8";
    }
    if (history.firstChild) {
      history.insertBefore(move, history.firstChild);
    } else {
      history.appendChild(move);
    }

    //searching for all the cannons to shoot after move has been made
    this.pieces.forEach((piece) => {
      if (piece.id.slice(-2) == this.PlayerToMove) {
        if (piece.id.substring(0, piece.id.length - 3) == "cannon") {
          this.playSound("shoot");
          piece.shootCannon();
        }
      }
    });
    this.switchTimer();

    //setting the playerToMove property for the next move
    this.PlayerToMove = this.PlayerToMove === "P1" ? "P2" : "P1";
  }

  highlightSwapables(board, selectedPiece) {
    this.fromSwap = this.pieces.find((p) => p.id == selectedPiece);
    //removing movable highlights
    this.removeHighlights(board);
    Array.from(board.querySelectorAll(".pieces")).forEach((p) => {
      if (
        p.id.slice(0, -3) !== "titan" &&
        p.id !== selectedPiece &&
        p.id.slice(0, -3) !== "cannon"
      )
        p.classList.add("swapable");
    });
  }

  showBlastAnimation(tileId) {
    const tile = document.getElementById(tileId);
    if (tile) {
      const blastAnimation = document.createElement("video");
      blastAnimation.className = "blast-animation";
      blastAnimation.src = "./src/assets/destroy.mp4"; 
      blastAnimation.autoplay = true;
      blastAnimation.onended = () => {
        tile.removeChild(blastAnimation);
      };
      tile.appendChild(blastAnimation);
    }
  }
}
