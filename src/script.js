import { createGameBoard, changeTheme } from "./utility-function.mjs";

const gameBoard = document.querySelector('.game-board');

//setting the initial theme
document.documentElement.className = "dark";

//handling the theme change
document.getElementById("theme-button").addEventListener("click", changeTheme);

createGameBoard(gameBoard);