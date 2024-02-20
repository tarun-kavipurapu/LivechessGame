import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState = {
  username: "",
  roomId: "",
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
  },
});
export const { setUsername, setRoomId } = userSlice.actions;

export default userSlice.reducer;
