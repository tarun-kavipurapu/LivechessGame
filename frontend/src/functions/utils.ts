class Cell {
  pos: string;
  piece: string;
  constructor(pos: string, piece: string) {
    this.pos = pos;
    this.piece = piece;
  }
}
const range = (n: number) => {
  return Array.from({ length: n }, (_, i) => i + 1);
};
const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const fenToBoard = (fenString: string) => {
  const fen = fenString.split(" ")[0]; //Get the first portion

  const fenPieces = fen.split("/").join(""); //remove the row delimiters '/'
  //rnbqkbnrpppppppp8888PPPPPPPPRNBQKBNR

  let pieces = Array.from(fenPieces);

  //Save individual pieces for each of the 64 cells
  Array.from(fenPieces).forEach((item, index) => {
    if (isFinite(item)) {
      pieces.splice(index, 1, range(item).fill(""));
    }
  });
  pieces = pieces.flat();

  const rows = range(8)
    .map((n) => n.toString())
    .reverse(); //["8", "7", "6", "5", "4", "3", "2", "1"]

  const cells = []; //[a1, b1, c1..., h8]
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    for (let j = 0; j < columns.length; j++) {
      const col = columns[j];
      cells.push(col + row); //e.g a1, b1, c1...
    }
  }
  const board = [];
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    const piece = pieces[i];
    board.push(new Cell(cell, piece));
  }

  return board;
};

export const isLightSquare = (pos: string) => {
  const index = columns.indexOf(pos[0]);
  const secondNumber = parseInt(pos[1]);

  return (index + secondNumber) % 2 === 0;
};
