import { Server as GameServer } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();
const gameio = new GameServer(httpServer, {
  cors: {
    origin: "*",
  },
});
httpServer.listen(3000);
export { gameio };
