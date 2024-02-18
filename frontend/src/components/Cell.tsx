import Piece from "./Piece";
import { isLightSquare } from "../functions";
import { useAppSelector, useAppDispatch } from "./../store/hooks";

interface CellProps {
  piece: string;
  pos: string;
  makeMove: (pos: string) => void;
  setPos: (newPos: string) => void;
}

const Cell: React.FC<CellProps> = ({ piece, pos, makeMove, setPos }) => {
  const possibleMoves = useAppSelector((state) => state.moves.possibleMoves);
  const turn = useAppSelector((state) => state.moves.turn);
  const inCheck = useAppSelector((state) => state.moves.inCheck);

  const dispatch = useAppDispatch();
  // console.log(possibleMoves, "possibleMoves");

  const isPossible = possibleMoves.includes(pos);

  const color = piece === piece.toUpperCase() ? "w" : "b";

  const inCheckKing = () => {
    //check if turn is matching
    //then the piece is blackk
    // and the piece is king
    //then the piece is in check
    return turn === color && piece.toLowerCase() === "k" && inCheck;
  };

  //onDragging i wan to makeMove
  const handleDrop = () => {
    makeMove(pos);
  };
  return (
    <div
      className={`text-center p-1/4 p-1/3 flex justify-center items-center w-[9.47vh] h-[9.47vh] ${
        isLightSquare(pos) ? "bg-[#EBE4DB]" : "bg-[#b6b3b3]"
      } ${
        isPossible
          ? "bg-[linear-gradient(120deg,#f6d365_0%,#fda085_100%)] opacity-[0.85]"
          : ""
      }${
        inCheckKing()
          ? "bg-[linear-gradient(_to_right,#f66f88_0%,#ee5574_19%,#f8444d_60%,#eb7b6a_100%_)]"
          : ""
      }`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <Piece piece={piece} setPos={setPos} pos={pos} />
    </div>
  );
};

export default Cell;
