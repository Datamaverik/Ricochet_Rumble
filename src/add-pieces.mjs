export function addTitan(squares, id, tileId,color) {
  Array.from(squares).forEach((square) => {
    if (square.id == tileId) {
      const piece = document.createElement("div");
      piece.setAttribute("id", id);
      piece.classList.add("pieces");
      piece.style.backgroundColor = color;
      piece.textContent = id;
      square.appendChild(piece);
    }
  });
}

export function addTank(squares,id,tileId,color){
    Array.from(squares).forEach((square) => {
      if (square.id == tileId) {
        const piece = document.createElement("div");
        piece.setAttribute("id", id);
        piece.classList.add("pieces");
        piece.style.backgroundColor = color;
        piece.textContent = id;
        square.appendChild(piece);
      }
    });
}

export function remPieces(squares, tileId) {
  Array.from(squares).forEach((square) => {
    if (square.id == tileId) {
      square.innerHTML = "";
    }
  });
}
