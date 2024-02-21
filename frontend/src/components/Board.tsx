import { useEffect, useState } from "react";
import { CellType } from "../types";
import Cell from "./Cell";
import { useAppSelector } from "../store/hooks";

interface BoardProps {
  cells: CellType[];
  makeMove: (pos: string) => void;
  setPos: (newPos: string) => void;
}

const Board: React.FC<BoardProps> = ({ cells, makeMove, setPos }) => {
  const playerColor = useAppSelector((state) => state.user.playerColor);
  const [reversedCells, setReversedCells] = useState<CellType[] | null>(null);

  useEffect(() => {
    if (playerColor === "b") {
      setReversedCells([...cells].reverse());
    } else {
      setReversedCells(null); // Reset reversedCells if playerColor is not 'b'
    }
  }, [playerColor, cells]);

  // Choose which cells array to map based on playerColor
  const cellsToMap = reversedCells || cells;

  return (
    <div className="p-4 mx-auto mt-8 rounded-lg shadow-lg w-[90vh] h-[85vh] grid grid-cols-8 bg-[#deb887] ">
      {cellsToMap.map((item: CellType) => (
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
