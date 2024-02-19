import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState = {
  username: "",
  roomId: "",
};
// const possibleMoves = ["e2e4", "e2e3", "e2e5", "e2e6", "e2e7", "e2e8"];

const userSlice = createSlice({
  name: "moves",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload.username;
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload.roomId;
    },
  },
});
export const { setUsername, setRoomId } = userSlice.actions;

export default userSlice.reducer;
