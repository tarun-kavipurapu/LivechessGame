import React, { useState, useRef, useEffect } from "react";
import { Chess } from "chess.js";
import { fenToBoard } from "../functions";
import { useAppSelector, useAppDispatch } from "./../store/hooks";
import { isGameOver } from "./../functions";
import { socket } from "../lib/socket";
import {
  clearPossibleMoves,
  setGameOver,
  setPossibleMoves,
  setTurnAndCheck,
} from "./../store/movesSlice";
import Board from "../components/Board";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
const FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const Game = () => {
  const [fen, setFen] = useState(FEN);
  const { current: chess } = useRef(new Chess(fen));
  const [board, setBoard] = useState(fenToBoard(fen));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const username = useAppSelector((state) => state.user.username);
  const roomId = useAppSelector((state) => state.user.roomId);
  useEffect(() => {
    setBoard(fenToBoard(fen));
  }, [fen]);
  useEffect(() => {
    console.log("control-here");

    socket.on("welcome", ({ message, opponent }) => {
      console.log(message, opponent);
    });
    socket.on("opponent-move", ({ from, to }) => {
      console.log("opponent-move", from, to);
      chess.move({ from, to });
      setFen(chess.fen());
    });

    socket.on("error", ({ message }) => {
      console.log({ message });
    });
  }, [chess, fen]);

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
    setFen(chess.fen());
    socket.emit("move", { from, to, gameId: "20" });
  };

  const setPos = (pos) => {
    fromPos.current = pos;
    dispatch(setPossibleMoves(chess.moves({ square: pos })));
  };

  const startEvent = () => {
    socket.emit("create-room", { name: "tarun", gameId: "20" });
  };
  const joinEvent = () => {
    socket.emit("join-room", { name: "arun", gameId: "20" });
  };

  return (
    <div className="chess">
      <Button onClick={startEvent}>StartTest</Button>
      <Button onClick={joinEvent}>Join Button</Button>
      <Board cells={board} makeMove={makeMove} setPos={setPos} />
    </div>
  );
};

export default Game;
