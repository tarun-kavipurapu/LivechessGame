import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { CellType } from "../types";

// interface GameState {
//   board: CellType[];
//   cell: CellType;
// }

const initialState = {
  possibleMoves: [],
  turn: "w",
  inCheck: false,
  isGameOver: false,
  message: "",
};
// const possibleMoves = ["e2e4", "e2e3", "e2e5", "e2e6", "e2e7", "e2e8"];
const getPositions = (possibleMoves: string[]) => {
  return possibleMoves.map((item) => {
    const length = item.length;
    return item.substring(length - 2);
  });
};

const movesSlice = createSlice({
  name: "moves",
  initialState,
  reducers: {
    setPossibleMoves: (state, action: PayloadAction<string[]>) => {
      state.possibleMoves = getPositions(action.payload);
    },
    clearPossibleMoves: (state) => {
      state.possibleMoves = [];
    },
    setTurnAndCheck: (state, action) => {
      state.turn = action.payload.turn;
      state.inCheck = action.payload.inCheck;
    },
    setGameOver: (state, action) => {
      state.turn = action.payload.turn;
      state.isGameOver = action.payload.isGameOver;
      state.message = action.payload.message;
    },
  },
});
export const {
  setPossibleMoves,
  clearPossibleMoves,
  setTurnAndCheck,
  setGameOver,
} = movesSlice.actions;

export default movesSlice.reducer;
