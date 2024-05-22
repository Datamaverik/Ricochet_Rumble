// script.js
import Game from "./game.mjs";
import { changeTheme, addClasses } from "./utility-function.mjs";

let selectedPiece = "",
  tileId,
  piceToMove,
  pieceToRotate;

const playerToMove = document.getElementById("player-to-move");
const rotateBtn = document.getElementById("rotateBtn");

// Get the game board element
const gameBoard = document.querySelector(".game-board");

// Create a new instance of the Game class
const game = new Game(gameBoard);

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
