import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Header from "./components/Header";
import { useAppSelector } from "./store/hooks";
import GameOver from "./pages/GameOver";
const App = () => {
  const roomId = useAppSelector((state) => state.user.roomId);
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/game/:roomId" element={<Game />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/gameOver"
            element={<GameOver />}
            // element={isGameOver ? <GameOver /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
