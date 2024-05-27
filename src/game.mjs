import Piece from "./piece.mjs";
import { addClasses, addPieces, giveDir } from "./utility-function.mjs";

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

    this.sounds = {
      move: new Audio("./src/sounds/movePiece.wav"),
      shoot: new Audio("./src/sounds/cannon2.wav"),
    };
  }

  replay() {
    this.resetBoard();
    this.PlayerToMove = "P1";
    document.getElementById("pauseScreen").close();
    document.getElementById("pauseScreen").style.display = "none";
    this.disableBoard();
    this.stopTimer("P1");
    this.stopTimer("P2");
    const hist = JSON.parse(localStorage.getItem("games")) || [];
    setTimeout(() => {
      for (let i = 0; i < hist[hist.length - 1].length; i++) {
        setTimeout(() => {
          // console.log(this.moveHist[i]);
          const move = this.moveHist[i];
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
            i = i + 1;
            const move2 = this.moveHist[i];
            const peice2 = this.pieces.find((p) => p.id == move2.piece);
            peice2.swap(move2.to);
          }

          //Applying animations to the movement of pieces
          let diff = move.to - move.from;
          let direction = giveDir(diff);
          peice.element.style.animation = "none";
          peice.element.offsetHeight; // Trigger reflow
          peice.element.style.animation = "";
          peice.element.style.animation = `0.2s ${direction} linear forwards`;

          //searching for all the cannons to shoot after move has been made
          this.pieces.forEach((piece) => {
            if (piece.id.slice(-2) == this.PlayerToMove) {
              if (piece.id.substring(0, piece.id.length - 3) == "cannon") {
                this.playSound("shoot");
                piece.shootCannon();
              }
            }
          });

          //setting the playerToMove property for the next move
          if (this.PlayerToMove == "P1") {
            this.PlayerToMove = "P2";
          } else {
            this.PlayerToMove = "P1";
          }
        }, i * 1200);
      }
    }, 1200);
  }

  resetBoard() {
    this.pieces.forEach((piece) => {
      piece.removePieceFromBoard();
    });
    this.pieces = [];
    addPieces(this);
    addClasses();
    console.log("reset the board");
  }

  playSound(sound) {
    if (this.sounds[sound]) {
      const soundClone = this.sounds[sound].cloneNode();
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
      if (move.spec == null) peice.swap(move.from);
      else if (move.spec == "rotate") {
        peice.rotate();
      } else if (move.spec == "swap") {
        peice.swap(move.from);
        this.ptr--;
        const move2 = this.moveHist[this.ptr];
        const peice2 = this.pieces.find((p) => p.id == move2.piece);
        peice2.swap(move2.from);
      }
    }
  }

  redoMove() {
    if (this.ptr < this.moveHist.length) {
      const move = this.moveHist[this.ptr];
      this.ptr++;
      const peice = this.pieces.find((p) => p.id == move.piece);
      if (move.spec == null) peice.swap(move.to);
      else if (move.spec == "rotate") {
        peice.rotate();
      } else if (move.spec == "swap") {
        peice.swap(move.to);
        const move2 = this.moveHist[this.ptr];
        this.ptr++;
        const peice2 = this.pieces.find((p) => p.id == move2.piece);
        peice2.swap(move2.to);
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
    try {
      let game = JSON.parse(localStorage.getItem("games")) || [];
      game.push(this.moveHist);
      localStorage.setItem("games", JSON.stringify(game));
    } catch (e) {
      if (e.name == "QuotaExceededError") {
        document.getElementById("pauseScreen").showModal();
        document.getElementById("pauseScreen").style.display = "flex";
        document.getElementById("game-msg").textContent =
          "Local storage is full. Please reset the memory.";
        document.getElementById("resume").style.display = "none";
        document.getElementById("restart").style.display = "none";
      }
    }
    document.getElementById("replay").style.display = "block";
    document.getElementById("pauseScreen").showModal();
    document.getElementById("pauseScreen").style.display = "flex";
    document.getElementById("game-msg").textContent =
      msg + `, ${winner} wins!!`;
    document.getElementById("resume").style.display = "none";
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
      this.from = targetTile;
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
    Array.from(board.querySelectorAll(".square")).forEach((square) => {
      if (square.classList.contains("highlighted")) {
        square.classList.remove("highlighted");
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
      console.log(orientation);

      if (pieceToRotate.classList.contains("left")) {
        pieceToRotate.classList.remove("left");
        this.from = "left";
        pieceToRotate.classList.add("right");
        this.to = "right";

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
      } else {
        pieceToRotate.classList.remove("right");
        this.from = "right";
        pieceToRotate.classList.add("left");
        this.to = "left";

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
    if (selectedPiece.slice(-2) == "P1") {
      this.PlayerToMove = "P2";
    } else {
      this.PlayerToMove = "P1";
    }
  }

  swapPiece(piece) {
    const toSwap = this.pieces.find((p) => p.id == piece);
    const tile1 = this.fromSwap.element.parentNode.id;
    const tile2 = toSwap.element.parentNode.id;
    this.playSound("move");
    this.fromSwap.swap(tile2);
    toSwap.swap(tile1);
    this.recordMove(this.fromSwap.id, tile1, tile2, "swap");
    this.recordMove(toSwap.id, tile2, tile1, "swap");

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
}
