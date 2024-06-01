// script.js
import Game from "./src/game.mjs";
import { isCannonBallPresent, addClasses, location,PUlocation, addPowerUps } from "./src/utility-function.mjs";

let selectedPiece = "",
  tileId,
  piceToMove;

//generating randomized playable location
export let positionP1 = {};
export let positionP2 = {};
location();

const history = document.createElement("div");
history.classList.add("historyPage");
const overallContainer = document.querySelector(".overallCont");

const playerToMove = document.getElementById("player-to-move");
const rotateBtn = document.getElementById("rotateBtn");
const swapBtn = document.getElementById("swapBtn");

const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resume");
const restartBtn = document.getElementById("restart");
const favDialog = document.getElementById("pauseScreen");

const undo = document.getElementById("undo");
const redo = document.getElementById("redo");
const replay = document.getElementById("replay");

const single = document.getElementById("single");
const double = document.getElementById("double");

// Get the game board element
const gameBoard = document.querySelector(".game-board");

// Create a new instance of the Game class
export const game = new Game(gameBoard);

game.createGameBoard();

//Adding pieces for player 1
game.addPiece("titan-P1", "brown", positionP1.titan);
game.addPiece("tank-P1", "brown", positionP1.tank);
game.addPiece("ricochet-P1", "brown", positionP1.ricochet);
game.addPiece("semiRicochet-P1", "brown", positionP1.semiRicochet);
game.addPiece("cannon-P1", "brown", positionP1.cannon);

//Adding pieces for player 2
game.addPiece("titan-P2", "#005ed8", positionP2.titan);
game.addPiece("tank-P2", "#005ed8", positionP2.tank);
game.addPiece("ricochet-P2", "#005ed8", positionP2.ricochet);
game.addPiece("semiRicochet-P2", "#005ed8", positionP2.semiRicochet);
game.addPiece("cannon-P2", "#005ed8", positionP2.cannon);

const piece = document.getElementById("ricochet-P1");
piece.style.transform = "scaleY(-1) scaleX(-1)";
addClasses();
game.initTimers();

//genrating randomized position for power ups
export let powerUps = [];
PUlocation();
addPowerUps(gameBoard);

gameBoard.addEventListener("click", (e) => {
  playerToMove.textContent = "Player to Move: " + game.PlayerToMove;
  const newSelectedPiece = e.target.id;

  if (e.target.classList.contains("swapable")) {
    game.swapPiece(newSelectedPiece);
    //Bot
    if (game.singlePlayerMode) {
      const intervalId = setInterval(() => {
        if (!isCannonBallPresent(gameBoard)) {
          clearInterval(intervalId);
          setTimeout(() => {
            game.botMove();
            game.removeHighlights(gameBoard);
          }, 1500);
        }
      }, 500);
    }
    game.removeHighlights(gameBoard);
  }

  if (game.singlePlayerMode && newSelectedPiece.slice(-2) == "P2") {
    return;
  }

  //checking if a valid piece is selected
  if (isNaN(parseInt(newSelectedPiece))) {
    selectedPiece = newSelectedPiece;
    //highlighting the movable tiles
    if (selectedPiece.slice(-2) == game.PlayerToMove) {
      game.highlightValidMoves(
        gameBoard.querySelectorAll(".square"),
        e.target.parentNode.id,
        selectedPiece
      );
    } else game.removeHighlights(gameBoard);
  } else if (e.target.classList.contains("highlighted")) {
    tileId = e.target.id;

    if (selectedPiece !== "") {
      piceToMove = document.getElementById(selectedPiece);
      game.movePiece(selectedPiece, tileId);
      //Bot
      if (game.singlePlayerMode) {
        const intervalId = setInterval(() => {
          if (!isCannonBallPresent(gameBoard)) {
            clearInterval(intervalId);
            setTimeout(() => {
              game.botMove();
              game.removeHighlights(gameBoard);
            }, 1500);
          }
        }, 500);
      }
      game.removeHighlights(gameBoard);
    }
  } else game.removeHighlights(gameBoard);

  //making the rotate button visible
  if (
    (newSelectedPiece.slice(0, -3) == "ricochet" ||
      newSelectedPiece.slice(0, -3) == "semiRicochet") &&
    newSelectedPiece.slice(-2) == game.PlayerToMove
  ) {
    rotateBtn.style.visibility = "visible";
  } else {
    rotateBtn.style.visibility = "hidden";
  }

  //making the swap button visible
  if (
    newSelectedPiece.slice(0, -3) == "semiRicochet" &&
    newSelectedPiece.slice(-2) == game.PlayerToMove
  ) {
    swapBtn.style.visibility = "visible";
  } else {
    swapBtn.style.visibility = "hidden";
  }
  playerToMove.textContent = "Player to Move: " + game.PlayerToMove;
});

rotateBtn.addEventListener("click", () => {
  game.rotatePiece(selectedPiece, gameBoard);
  //Bot
  if (game.singlePlayerMode) {
    const intervalId = setInterval(() => {
      if (!isCannonBallPresent(gameBoard)) {
        clearInterval(intervalId);
        setTimeout(() => {
          game.botMove();
          game.removeHighlights(gameBoard);
        }, 1500);
      }
    }, 500);
  }
  swapBtn.style.visibility = "hidden";
  playerToMove.textContent = "Player to Move: " + game.PlayerToMove;
});

swapBtn.addEventListener("click", () => {
  game.removeHighlights(gameBoard);
  rotateBtn.style.visibility = "hidden";
  game.highlightSwapables(gameBoard, selectedPiece);
});

undo.addEventListener("click", () => {
  game.removeHighlights(gameBoard);
  game.undoMove();
});

redo.addEventListener("click", () => {
  game.removeHighlights(gameBoard);
  game.redoMove();
});

replay.addEventListener("click", () => {
  game.replay();
});

playerToMove.textContent = "Player to Move: " + game.PlayerToMove;

//setting up the initial theme
document.documentElement.className = "dark";

//starting the timer for P1 as game starts
window.onload = () => {
  favDialog.showModal();
  favDialog.style.display = "flex";
  resumeBtn.disabled = true;
  restartBtn.disabled = true;
};

//starting the double player mode
double.addEventListener("click", () => {
  favDialog.close();
  favDialog.style.display = "none";
  restartBtn.disabled = false;
  resumeBtn.disabled = false;
  game.startTimer("P2");
  game.singlePlayerMode = false;
});

//starting the single player mode
single.addEventListener("click", () => {
  favDialog.close();
  favDialog.style.display = "none";
  restartBtn.disabled = false;
  resumeBtn.disabled = false;
  game.startTimer("P2");
  game.singlePlayerMode = true;
});

//Pause screen dialog box
pauseBtn.addEventListener("click", () => {
  favDialog.showModal();
  favDialog.style.display = "flex";
  single.style.display = "none";
  double.style.display = "none";
  game.toggleTimer();
});

//Restarts the game
restartBtn.addEventListener("click", () => {
  window.location.reload();
});
//resumes the game
resumeBtn.addEventListener("click", () => {
  favDialog.close();
  favDialog.style.display = "none";
  game.toggleTimer();
});

document.getElementById("reset").addEventListener("click", () => {
  try {
    localStorage.removeItem("games");
    window.location.reload();
  } catch (e) {
    console.error("An error occurred while resetting history: " + e);
  }
});

overallContainer.appendChild(history);
