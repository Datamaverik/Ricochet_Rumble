import Piece from "./piece.mjs";

export default class Game {
  constructor(boardSelector) {
    this.gameBoard = boardSelector;
    this.selectedPiece = null;
    this.pieces = [];
    this.timerP1 = 300;
    this.timerP2 = 300;
    this.PlayerToMove = "P1";
    this.isPaused = false;
    this.historyP1 = [];
    this.historyP2 = [];
    this.from = "";
    this.to = "";
  }

  recordMove(pieceMoved, from, to) {
    const move = {
      piece: pieceMoved,
      from: from,
      to: to,
    };
    if (this.PlayerToMove === "P1") {
      this.historyP1.push(move);
    } else {
      this.historyP2.push(move);
    }
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
    document.getElementById("pauseScreen").showModal();
    alert(msg + `, ${winner} wins!!`);
    this.stopTimer("P1");
    this.stopTimer("P2");
    setTimeout(()=>{
      window.location.reload();
    },3000);
    // Additional logic to freeze the game
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
      this.recordMove(selectedPieceId, this.from, this.to);
      this.printMoveHist(selectedPieceId, this.from, this.to);
      piece.movePiece(targetTileId);
      //searching for all the cannons to shoot after move has been made
      this.pieces.forEach((piece) => {
        if (piece.id.slice(-2) == this.PlayerToMove) {
          if (piece.id.substring(0, piece.id.length - 3) == "cannon") {
            piece.shootCannon();
          }
        }
      });
      this.switchTimer();
      console.log(this.historyP1);
      console.log(this.historyP2);
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
    Array.from(board).forEach((square) => {
      if (square.classList.contains("highlighted")) {
        square.classList.remove("highlighted");
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

        if (orientation == "scaleY(-1) scaleX(-1)") {
          pieceToRotate.style.transform = "scaleY(-1)";
          console.log(pieceToRotate.style.transform);
        } else if (orientation == "scaleY(-1)")
          pieceToRotate.style.transform = "scaleY(-1) scaleX(-1)";
        else pieceToRotate.style.transform = "scaleX(-1)";

        this.recordMove(selectedPiece, this.from, this.to);
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
          console.log(pieceToRotate.style.transform);
        } else if (orientation == "scaleY(-1)")
          pieceToRotate.style.transform = "scaleY(-1) scaleX(-1)";
        else pieceToRotate.style.transform = "scaleX(-1)";

        this.recordMove(selectedPiece, this.from, this.to);
        this.printMoveHist(selectedPiece, this.from, this.to);
        this.removeHighlights(board);
        rotateBtn.style.visibility = "hidden";
      }
    }
    //searching for all the cannons to shoot after move has been made
    this.pieces.forEach((piece) => {
      if (piece.id.slice(-2) == this.PlayerToMove) {
        if (piece.id.substring(0, piece.id.length - 3) == "cannon") {
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
    console.log(this.historyP1);
    console.log(this.historyP2);
  }
}
