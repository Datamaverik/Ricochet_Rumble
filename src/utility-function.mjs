export function createGameBoard(board) {
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
      board.appendChild(square);
    }
  }
}


export function addPieces(board){
    
}

export function changeTheme() {
  const root = document.documentElement;
  const newTheme = root.className === "dark" ? "light" : "dark";
  const currentTheme = root.className === "dark" ? "dark" : "light";
  root.className = newTheme;
  const themeButton = document.getElementById("theme-button");
  themeButton.textContent = currentTheme;
}