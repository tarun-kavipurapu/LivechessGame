import React from "react";
import { isLightSquare } from "../functions";
import Cell from "./Cell";
const Board = ({ cells, makeMove, setPos }) => {
  return (
    <div className="p-4 mx-auto mt-8 rounded-lg shadow-lg w-[90vh] h-[85vh] grid grid-cols-8 bg-[#deb887]">
      {cells.map((item) => (
        <Cell
          piece={item.piece}
          pos={item.pos}
          key={item.pos}
          makeMove={makeMove}
          setPos={setPos}
        />
      ))}
    </div>
  );
};

export default Board;
