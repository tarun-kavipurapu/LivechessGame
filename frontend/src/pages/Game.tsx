import React, { useState, useRef, useEffect } from "react";
import { Chess } from "chess.js";
import { fenToBoard } from "../functions";
import Board from "../components/Board";
const FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const Index = () => {
  const [fen, setFen] = useState(FEN);
  const { current: chess } = useRef(new Chess(fen));
  const [board, setBoard] = useState(fenToBoard(fen));

  useEffect(() => {
    setBoard(fenToBoard(fen));
  }, [fen]);
  const fromPos = useRef();
  console.log(fromPos.current);

  const makeMove = (pos: string) => {
    const from = fromPos.current;
    const to = pos;
    chess.move({ from, to });
    setFen(chess.fen());
  };

  const setPos = (pos) => {
    fromPos.current = pos;
  };

  return (
    <div className="chess">
      <Board cells={board} makeMove={makeMove} setPos={setPos} />
    </div>
  );
};

export default Index;
