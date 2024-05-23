// script.js
import Game from "./game.mjs";
import { changeTheme, addClasses } from "./utility-function.mjs";

let selectedPiece = "",
  tileId,
  piceToMove;

const container = document.querySelector(".container");
const timerContainer = document.createElement("div");
timerContainer.classList.add("timer-container");
const player2Timer = document.getElementById("player2-timer-container");
const player1Timer = document.getElementById("player1-timer-container");
const buttonContainer = document.getElementById("btn-container");

const playerToMove = document.getElementById("player-to-move");
const rotateBtn = document.getElementById("rotateBtn");

const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resume");
const restartBtn = document.getElementById("restart");
const favDialog = document.getElementById("pauseScreen");

// Get the game board element
const gameBoard = document.querySelector(".game-board");

// Create a new instance of the Game class
export const game = new Game(gameBoard);

game.createGameBoard();

//Adding pieces for player 1
game.addPiece("titan-P1", "brown", 6);
game.addPiece("tank-P1", "brown", 13);
game.addPiece("ricochet-P1", "brown", 4);
const piece = document.getElementById("ricochet-P1");
piece.style.transform = "scaleY(-1) scaleX(-1)";
game.addPiece("semiRicochet-P1", "brown", 11);
game.addPiece("cannon-P1", "brown", 2);

//Adding pieces for player 2
game.addPiece("titan-P2", "#005ed8", 59);
game.addPiece("tank-P2", "#005ed8", 52);
game.addPiece("ricochet-P2", "#005ed8", 61);
game.addPiece("semiRicochet-P2", "#005ed8", 54);
game.addPiece("cannon-P2", "#005ed8", 63);

addClasses();
game.initTimers();
// game.startTimer("P1")

gameBoard.addEventListener("click", (e) => {
  playerToMove.textContent = "Player to Move: " + game.PlayerToMove;
  const newSelectedPiece = e.target.id;

  //checking if a valid piece is selected
  if (isNaN(parseInt(newSelectedPiece))) {
    selectedPiece = newSelectedPiece;
    game.highlightValidMoves(
      gameBoard.querySelectorAll(".square"),
      e.target.parentNode.id,
      selectedPiece
    );
  } else if (e.target.classList.contains("highlighted")) {
    tileId = e.target.id;

    if (selectedPiece !== "") {
      piceToMove = document.getElementById(selectedPiece);
      game.movePiece(selectedPiece, tileId);
      game.removeHighlights(gameBoard.querySelectorAll(".square"));
    }
  } else game.removeHighlights(gameBoard.querySelectorAll(".square"));

  if (
    newSelectedPiece.slice(0, -3) == "ricochet" ||
    newSelectedPiece.slice(0, -3) == "semiRicochet"
  ) {
    rotateBtn.style.visibility = "visible";
  } else {
    rotateBtn.style.visibility = "hidden";
  }

  playerToMove.textContent = "Player to Move: " + game.PlayerToMove;
});

rotateBtn.addEventListener("click", () => {
  game.rotatePiece(selectedPiece, gameBoard.querySelectorAll(".square"));
});

playerToMove.textContent = "Player to Move: " + game.PlayerToMove;

//setting up the initial theme
document.documentElement.className = "dark";

//handling theme change
document.getElementById("theme-button").addEventListener("click", changeTheme);

//handling media queries
document.addEventListener("DOMContentLoaded", () => {
  adjust();
});

//starting the timer for P1 as game starts
window.onload=()=>{
  game.startTimer("P2");
}

//Initial layout adjustment
adjust();

//Adjusting layout on windows resize
window.addEventListener("resize", adjust);

//Pause screen dialog box
pauseBtn.addEventListener("click", () => {
  favDialog.showModal();
  game.toggleTimer();
});

//Restarts the game
restartBtn.addEventListener("click", () => {
  window.location.reload();
});
//resumes the game
resumeBtn.addEventListener("click", () => {
  favDialog.close();
  game.toggleTimer();
});

function adjust() {
  if (window.innerWidth < 600) {
    timerContainer.appendChild(player1Timer);
    timerContainer.appendChild(buttonContainer);
    timerContainer.appendChild(player2Timer);
    container.insertBefore(timerContainer, gameBoard);
  } else {
    if (container.contains(document.querySelector(".timer-container"))) {
      Array.from(document.querySelectorAll(".timer-containier")).forEach(
        (cont) => {
          container.removeChild(cont);
        }
      );
    }
    document.body.insertBefore(buttonContainer, container);
    container.appendChild(player1Timer);
    container.appendChild(player2Timer);
    container.insertBefore(player1Timer, gameBoard);
    container.insertBefore(gameBoard, player2Timer);
  }
}
