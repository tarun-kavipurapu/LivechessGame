import React from "react";
import Piece from "./Piece";
import { isLightSquare } from "../functions";
const Cell = ({ piece, pos, makeMove, setPos }) => {
  //onDragging i wan to makeMove
  const handleDrop = () => {
    makeMove(pos);
  };
  return (
    <div
      className={`text-center p-1/4 p-1/3 flex justify-center items-center w-[9.47vh] h-[9.47vh] ${
        isLightSquare(pos) ? "bg-[#EBE4DB]" : "bg-[#b6b3b3]"
      }`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <Piece piece={piece} setPos={setPos} pos={pos} />
    </div>
  );
};

export default Cell;
