// script.js
import Game from "./game.mjs";
import { changeTheme } from "./utility-function.mjs";

let selectedPiece = "",
  tileId,
  piceToMove;

const playerToMove = document.getElementById("player-to-move");

// Get the game board element
const gameBoard = document.querySelector(".game-board");

// Create a new instance of the Game class
const game = new Game(gameBoard);

game.createGameBoard();

//Adding pieces for player 1
game.addPiece("titan-P1", "#730101", 6);
game.addPiece("tank-P1", "#b61515", 13);
game.addPiece("ricochet-P1", "#ff3e3e", 4);
game.addPiece("semiRicochet-P1", "#a35353", 11);
game.addPiece("cannon-P1", "brown", 2);

//Adding pieces for player 2
game.addPiece("titan-P2", "#003b88", 59);
game.addPiece("tank-P2", "#005ed8", 52);
game.addPiece("ricochet-P2", "#4394ff", 61);
game.addPiece("semiRicochet-P2", "#2d578e", 54);
game.addPiece("cannon-P2", "darkBlue", 63);

gameBoard.addEventListener("click", (e) => {
  playerToMove.textContent = "Player to Move: " + game.PlayerToMove;
  const newSelectedPiece = e.target.id;
  // console.log(e.target.parentNode);

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
  playerToMove.textContent = "Player to Move: " + game.PlayerToMove;
});

playerToMove.textContent = "Player to Move: " + game.PlayerToMove;

//setting up the initial theme
document.documentElement.className = "dark";

//handling theme change
document.getElementById("theme-button").addEventListener("click", changeTheme);
