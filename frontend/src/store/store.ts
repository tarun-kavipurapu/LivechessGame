// store.ts
import { configureStore } from "@reduxjs/toolkit";
import movesReducer from "./movesSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    moves: movesReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
