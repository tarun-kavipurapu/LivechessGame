import React, { useState, useRef, useEffect } from "react";
import { Chess } from "chess.js";
import { fenToBoard } from "../functions";
import { useAppSelector, useAppDispatch } from "./../store/hooks";
import { isGameOver } from "./../functions";
import { io } from "socket.io-client";

import {
  clearPossibleMoves,
  setGameOver,
  setPossibleMoves,
  setTurnAndCheck,
} from "./../store/movesSlice";
import Board from "../components/Board";
import { useNavigate } from "react-router-dom";
const FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const Game = () => {
  const [fen, setFen] = useState(FEN);
  const { current: chess } = useRef(new Chess(fen));
  const [board, setBoard] = useState(fenToBoard(fen));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const socket = io("http://localhost:3000");
  useEffect(() => {
    setBoard(fenToBoard(fen));
  }, [fen]);
  useEffect(() => {
    socket.emit(
      "join-room",
      { name: "tarun", gameID: "20" },
      ({ error, color }) => {
        console.log({ color });
      }
    );
    socket.on("welcome", ({ message, opponent }) => {
      console.log(message);
    });
    socket.on("opponent-join", ({ message, player }) => {
      console.log(message);
    });
    socket.on("opponent-move", ({ from, to }) => {
      chess.move({ from, to });
      setFen(chess.fen());
    });
  }, [chess]);

  useEffect(() => {
    const { GameOver, message } = isGameOver(chess);
    if (GameOver) {
      dispatch(
        setGameOver({ turn: chess.turn(), isGameOver: GameOver, message })
      );
      navigate("/gameOver");
    }
    dispatch(setTurnAndCheck({ turn: chess.turn(), inCheck: chess.inCheck() }));
  }, [dispatch, chess, fen]);
  const fromPos = useRef();

  const makeMove = (pos: string) => {
    const from = fromPos.current;
    const to = pos;
    chess.move({ from, to });
    dispatch(clearPossibleMoves());
    socket.emit("move", { from, to });
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
