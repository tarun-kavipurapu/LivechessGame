import { CellType } from "../types";
import Cell from "./Cell";

interface BoardProps {
  cells: CellType[];
  makeMove: (pos: string) => void;
  setPos: (newPos: string) => void;
}
const Board: React.FC<BoardProps> = ({ cells, makeMove, setPos }) => {
  return (
    <div className="p-4 mx-auto mt-8 rounded-lg shadow-lg w-[90vh] h-[85vh] grid grid-cols-8 bg-[#deb887]">
      {cells.map((item: CellType) => (
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
