import React, { useState, useRef, useEffect } from "react";
import { Chess } from "chess.js";
import { fenToBoard } from "../functions";
import { useAppSelector, useAppDispatch } from "./../store/hooks";
import {
  clearPossibleMoves,
  setPossibleMoves,
  setTurnAndCheck,
} from "./../store/movesSlice";
import Board from "../components/Board";
const FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const Game = () => {
  const [fen, setFen] = useState(FEN);
  const { current: chess } = useRef(new Chess(fen));
  const [board, setBoard] = useState(fenToBoard(fen));
  const dispatch = useAppDispatch();

  useEffect(() => {
    setBoard(fenToBoard(fen));
    dispatch(setTurnAndCheck({ turn: chess.turn(), inCheck: chess.inCheck() }));
  }, [fen, dispatch, chess]);
  const fromPos = useRef();

  const makeMove = (pos: string) => {
    const from = fromPos.current;
    const to = pos;
    chess.move({ from, to });
    dispatch(clearPossibleMoves());

    setFen(chess.fen());
  };

  const setPos = (pos) => {
    fromPos.current = pos;
    dispatch(setPossibleMoves(chess.moves({ square: pos })));
  };

  return (
    <div className="chess">
      <Board cells={board} makeMove={makeMove} setPos={setPos} />
    </div>
  );
};

export default Game;
