import { Server as GameServer } from "socket.io";
import { createServer } from "http";
import express from "express";
import cors from "cors";
import { connectoGame } from "./socket.io/game.socket";
const app = express();
const httpServer = createServer();
const gameio = new GameServer(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use(cors());
connectoGame(gameio);

// gameio.on("connection", (socket) => {
//   connectoGame(gameio, socket);
// });

httpServer.listen(4000, () => {
  console.log("server is running on port 4000");
});
export { gameio };
