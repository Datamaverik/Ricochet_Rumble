import { createGameBoard, changeTheme } from "./utility-function.mjs";
import { addPieces, remPieces } from "./add-pieces.mjs";
import { validateMove, checkMoves } from "./move-validation.mjs";

const gameBoard = document.querySelector(".game-board");

let selectedPiece = "",
  tileToRemove,
  titanP1;

//created the gameboard
createGameBoard(gameBoard);
const squares = document.querySelectorAll(".square");
//adding pieces in the game board
addPieces(squares, "titan", 6);

//highlighting the available tiles where player can move
checkMoves(gameBoard, squares);

//moving the pieces
gameBoard.addEventListener("click", (e) => {
  const newSelectedPiece = e.target.id;

  //checking if a valid piece is selected
  if (isNaN(parseInt(newSelectedPiece))) {
    selectedPiece = newSelectedPiece;
  }

  if (e.target.classList.contains("highlighted")) {
    const tileId = e.target.id;

    Array.from(squares).forEach((square) => {
      if (square.childElementCount > 0) {
        tileToRemove = square.id;
      }
    });

    remPieces(squares, tileToRemove);//remove piece from old tile
    addPieces(squares, selectedPiece, tileId);//add piece to new tile

    //adding event listener to the newly created titan
    titanP1 = document.getElementById("titan");
    validateMove(titanP1, squares);

    //Removing highlights after moving
    Array.from(squares).forEach((square) => {
      if (square.classList.contains("highlighted")) {
        square.classList.remove("highlighted");
      }
    });
  }
});

//accessing titan of player 1
titanP1 = document.getElementById("titan");
validateMove(titanP1, squares);

//setting the initial theme
document.documentElement.className = "dark";

//handling the theme change
document.getElementById("theme-button").addEventListener("click", changeTheme);
