import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState = {
  username: "",
  roomId: "",
  playerColor: "",
  opponentName: "",
  opponentMoves: [],
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload.username;
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload.roomId;
    },
    setPlayerColor: (state, action) => {
      state.playerColor = action.payload.playerColor;
    },
    setOpponentName: (state, action) => {
      state.opponentName = action.payload.opponentName;
    },
    setMessage: (state, action) => {
      state.message = action.payload.message;
    },
    setOpponentMoves: (state, action) => {
      state.opponentMoves = action.payload.opponentMoves;
    },
    setClearOpponentMoves: (state) => {
      state.opponentMoves = [];
    },
  },
});
export const {
  setUsername,
  setRoomId,
  setClearOpponentMoves,
  setMessage,
  setOpponentMoves,
  setOpponentName,
  setPlayerColor,
} = userSlice.actions;

export default userSlice.reducer;
