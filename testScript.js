// script.js
import Game from "./src/game.mjs";
import {
  isCannonBallPresent,
  addClasses,
  location,
  PUlocation,
  addPowerUps,
} from "./src/utility-function.mjs";

let selectedPiece = "",
  tileId,
  piceToMove,
  pieceToAdd;

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

const shop1 = document.getElementById("shop1");
const shop2 = document.getElementById("shop2");
const shopDialog = document.getElementById("shopDialog");
const spellTrans = document.getElementById("spellTrans");
const spellRico = document.getElementById("spellRico");
const spellSemi = document.getElementById("spellSemi");

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
export let pul = [];
export function setPowerUp(value) {
  powerUps = value;
}
PUlocation();
pul.push(...powerUps);
addPowerUps(powerUps);

gameBoard.addEventListener("click", (e) => {
  playerToMove.textContent = "Player to Move: " + game.PlayerToMove;
  const newSelectedPiece = e.target.id;

  //disabling the board if the cannon ball is still present
  const intervalId = setInterval(() => {
    rotateBtn.disabled = true;
    swapBtn.disabled = true;
    gameBoard.classList.add("disabled");
    if (!isCannonBallPresent(gameBoard)) {
      clearInterval(intervalId);
      gameBoard.classList.remove("disabled");
      rotateBtn.disabled = false;
      swapBtn.disabled = false;
    }
  }, 500);

  //checking if swap move is to be made
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
        playerToMove.textContent = "Player to Move: " + game.PlayerToMove;
      }, 500);
    }
    game.removeHighlights(gameBoard);
  }

  //checking if new piece is to be added
  if (e.target.classList.contains("toAdd")) {
    const history = document.querySelector(".historyPage");
    let move = document.createElement("p");
    const tileId = e.target.id;
    if (game.PlayerToMove == "P1" && piceToMove) {
      move.style.color = "brown";
      game.p1PowerUps = 0;
      document.getElementById("P1meter").value = game.p1PowerUps / 10;
      game.playSound("move");
      game.addPiece(pieceToAdd + "B" + "-P1", "brown", tileId);
      if (pieceToAdd == "semiRicochet") game.P1addRico = true;
      document.getElementById(pieceToAdd + "B" + "-P1").classList.add("right");
      if (pieceToAdd == "ricochet") {
        game.P1addSemi = true;
        const piece = document.getElementById("ricochetB-P1");
        piece.style.transform = "scaleY(-1) scaleX(-1)";
      }
      game.recordMove(pieceToAdd + "B" + "-P1", null, tileId, "spell");
    }
    if (game.PlayerToMove == "P2" && piceToMove) {
      move.style.color = "#005ed8";
      game.p2PowerUps = 0;
      document.getElementById("P2meter").value = game.p2PowerUps / 10;
      game.playSound("move");
      game.addPiece(pieceToAdd + "B" + "-P2", "#005ed8", tileId);
      if (pieceToAdd == "semiRicochet") game.P2addRico = true;
      if (pieceToAdd == "ricochet") game.P2addSemi = true;
      document.getElementById(pieceToAdd + "B" + "-P2").classList.add("left");
      game.recordMove(pieceToAdd + "B" + "-P2", null, tileId, "spell");
    }

    move.textContent = piceToMove + " was added through spell at " + tileId;
    history.appendChild(move);
    //removing highlights
    Array.from(gameBoard.querySelectorAll(".square")).forEach((sq) => {
      if (sq.classList.contains("toAdd")) sq.classList.remove("toAdd");
    });

    // Searching for all the cannons to shoot after move has been made
    game.pieces.forEach((piece) => {
      if (piece.id.slice(-2) == game.PlayerToMove) {
        if (piece.id.substring(0, piece.id.length - 3) == "cannon") {
          game.playSound("shoot");
          piece.shootCannon();
        }
      }
    });

    //switching timer
    game.switchTimer();

    //changing player to move
    game.PlayerToMove = game.PlayerToMove === "P1" ? "P2" : "P1";

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
    playerToMove.textContent = "Player to Move: " + game.PlayerToMove;
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
          playerToMove.textContent = "Player to Move: " + game.PlayerToMove;
        }, 500);
      }
      game.removeHighlights(gameBoard);
    }
  } else game.removeHighlights(gameBoard);

  //making the rotate button visible
  if (
    (newSelectedPiece.slice(0, -3) == "ricochet" ||
      newSelectedPiece.slice(0, -3) == "semiRicochet" ||
      newSelectedPiece.slice(0, -4) == "ricochet" ||
      newSelectedPiece.slice(0, -4) == "semiRicochet") &&
    newSelectedPiece.slice(-2) == game.PlayerToMove
  ) {
    rotateBtn.style.visibility = "visible";
  } else {
    rotateBtn.style.visibility = "hidden";
  }

  //making the swap button visible
  if (
    (newSelectedPiece.slice(0, -3) == "semiRicochet" ||
      newSelectedPiece.slice(0, -4) == "semiRicochet") &&
    newSelectedPiece.slice(-2) == game.PlayerToMove
  ) {
    swapBtn.style.visibility = "visible";
  } else {
    swapBtn.style.visibility = "hidden";
  }
  playerToMove.textContent = "Player to Move: " + game.PlayerToMove;
});

rotateBtn.addEventListener("click", () => {
  game.teleport=false;
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
      playerToMove.textContent = "Player to Move: " + game.PlayerToMove;
    }, 500);
  }
  swapBtn.style.visibility = "hidden";
});

swapBtn.addEventListener("click", () => {
  game.teleport=false;
  game.removeHighlights(gameBoard);
  rotateBtn.style.visibility = "hidden";
  game.highlightSwapables(gameBoard, selectedPiece);
});

undo.addEventListener("click", () => {
  game.teleport=false;
  game.removeHighlights(gameBoard);
  game.undoMove();
});

redo.addEventListener("click", () => {
  game.teleport=false;
  game.removeHighlights(gameBoard);
  game.redoMove();
});

replay.addEventListener("click", () => {
  game.playSound("click");
  game.replay();
});

playerToMove.textContent = "Player to Move: " + game.PlayerToMove;

//setting up the initial theme
document.documentElement.className = "dark";

//starting the timer for P1 as game starts
window.onload = () => {
  game.playSound("dialog");
  document.getElementById("game-msg").textContent =
    "Welcome to Ricochet Rumble, Select your game mode";
  favDialog.showModal();
  favDialog.style.display = "flex";
  shopDialog.style.display = "none";
  resumeBtn.disabled = true;
  restartBtn.disabled = true;
  resumeBtn.style.display = "none";
  restartBtn.style.display = "none";
};

//starting the double player mode
double.addEventListener("click", () => {
  game.playSound("mode");
  favDialog.close();
  favDialog.style.display = "none";
  restartBtn.disabled = false;
  resumeBtn.disabled = false;
  game.startTimer("P2");
  game.singlePlayerMode = false;
});

//starting the single player mode
single.addEventListener("click", () => {
  game.playSound("mode");
  favDialog.close();
  favDialog.style.display = "none";
  restartBtn.disabled = false;
  resumeBtn.disabled = false;
  shop2.disabled = true;
  game.startTimer("P2");
  game.singlePlayerMode = true;
});

//Pause screen dialog box
pauseBtn.addEventListener("click", () => {
  game.teleport=false;
  game.playSound("dialog");
  resumeBtn.style.display = "flex";
  restartBtn.style.display = "flex";
  favDialog.showModal();
  favDialog.style.display = "flex";
  single.style.display = "none";
  double.style.display = "none";
  game.toggleTimer();
});

//Shop buttons
shop1.addEventListener("click", () => {
  if (game.PlayerToMove == "P1") {
    game.playSound("shop");
    if (game.P1addRico) spellRico.disabled = true;
    else spellRico.disabled = false;
    if (game.P1addSemi) spellSemi.disabled = true;
    else spellSemi.disabled = false;
    shopDialog.showModal();
    shopDialog.style.display = "flex";
  }
});

shop2.addEventListener("click", () => {
  if (game.PlayerToMove == "P2") {
    game.playSound("shop");
    if (game.P2addRico) spellRico.disabled = true;
    else spellRico.disabled = false;
    if (game.P2addSemi) spellSemi.disabled = true;
    else spellSemi.disabled = false;
    shopDialog.showModal();
    shopDialog.style.display = "flex";
  }
});

//teleportation
spellTrans.addEventListener("click", () => {
  game.playSound("click");
  game.removeHighlights(gameBoard);
  game.teleport = true;
  shopDialog.close();
  shopDialog.style.display = "none";
});

//Add ricochet
spellRico.addEventListener("click", () => {
  game.playSound("click");
  game.teleport = false;
  pieceToAdd = "semiRicochet";
  shopDialog.close();
  shopDialog.style.display = "none";
  Array.from(gameBoard.querySelectorAll(".square")).forEach((sq) => {
    if (!sq.hasChildNodes()) {
      sq.classList.add("toAdd");
    }
  });
});

//Add semi ricochet
spellSemi.addEventListener("click", () => {
  game.playSound("click");
  game.teleport = false;
  pieceToAdd = "ricochet";
  shopDialog.close();
  shopDialog.style.display = "none";
  Array.from(gameBoard.querySelectorAll(".square")).forEach((sq) => {
    if (!sq.hasChildNodes()) {
      sq.classList.add("toAdd");
    }
  });
});

//Restarts the game
restartBtn.addEventListener("click", () => {
  game.playSound("click");
  window.location.reload();
});
//resumes the game
resumeBtn.addEventListener("click", () => {
  game.playSound("click");
  favDialog.close();
  favDialog.style.display = "none";
  game.toggleTimer();
});

document.getElementById("reset").addEventListener("click", () => {
  game.playSound("click");
  try {
    localStorage.removeItem("games");
    window.location.reload();
  } catch (e) {
    console.error("An error occurred while resetting history: " + e);
  }
});

overallContainer.appendChild(history);
