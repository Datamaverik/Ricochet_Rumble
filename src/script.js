import { createGameBoard, changeTheme } from "./utility-function.mjs";
import { addPiece, remPieces } from "./add-pieces.mjs";
import { validateMove, checkMoves } from "./move-validation.mjs";

const gameBoard = document.querySelector(".game-board");

let selectedPiece = "",
  tileToRemove,
  titanP1,
  tankP1,
  piceToMove;

export let occupiedTiles = [2, 6,12];
//created the gameboard
createGameBoard(gameBoard);
const squares = document.querySelectorAll(".square");

//adding pieces in the game board
addPiece(squares, "titan", 6, "red");
addPiece(squares, "tank", 2, "blue");

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

    if (selectedPiece !== "") {
      piceToMove = document.getElementById(selectedPiece);
    }

    tileToRemove = piceToMove.parentNode.id;

    if (selectedPiece == "titan") {
      remPieces(squares, tileToRemove);
      occupiedTiles = occupiedTiles.filter(
        (tile) => tile !== parseInt(tileToRemove)
      );
      addPiece(squares, selectedPiece, tileId, "red");
      occupiedTiles.push(parseInt(tileId));
      //adding event listener to the newly created titan
      titanP1 = document.getElementById("titan");
      validateMove(titanP1, squares);
      selectedPiece = "";
    }
    if (selectedPiece == "tank") {
      remPieces(squares, tileToRemove); //remove piece from old tile
      occupiedTiles = occupiedTiles.filter(
        (tile) => tile !== parseInt(tileToRemove)
      );
      addPiece(squares, selectedPiece, tileId, "blue");
      occupiedTiles.push(parseInt(tileId));
      //adding event listener to the newly created tank
      tankP1 = document.getElementById("tank");
      validateMove(tankP1, squares);
      selectedPiece = "";
    }

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
//accessing tank of player 1
tankP1 = document.getElementById("tank");
validateMove(tankP1, squares);

//setting the initial theme
document.documentElement.className = "dark";

//handling the theme change
document.getElementById("theme-button").addEventListener("click", changeTheme);
