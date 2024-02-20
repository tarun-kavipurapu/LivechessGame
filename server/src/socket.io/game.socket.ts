import { addPlayer, createPlayer, game, removePlayer } from "../game";
import { games } from "../game";
//player1->player
//player2->opponent
//create-room
//join-room
export const connectoGame = (gameio) => {
  gameio.on("connection", (socket) => {
    // console.log("connected with ", socket.id);
    //creating a room
    // console.log(games);

    socket.on("create-room", ({ name, gameId }) => {
      const { opponent, error, player } = createPlayer(name, socket.id, gameId);
      // console.log("GameId-create-room", gameId);
      console.log("create-room", opponent);
      if (error) {
        socket.emit("error", {
          message: error,
        });
        return;
      }
      socket.join(gameId);
      // console.log("socket-rooms", socket.rooms);
      socket.emit("welcome", {
        message: `welcome to the game ${player?.name}`,
        player,
      });
    });
    //joining a room
    socket.on("join-room", ({ name, gameId }) => {
      const { opponent, error, player } = addPlayer(name, socket.id, gameId);
      // console.log("GameId-join-room", gameId);
      console.log("join-room", opponent);
      if (error) {
        socket.emit("error", {
          message: error,
        });
        return;
      }
      socket.join(gameId);
      // console.log("socket-rooms", socket.rooms);

      socket.emit("welcome", {
        message: `welcome to the game ${player?.name}`,
        opponent,
      });
    });
    socket.on("move", ({ from, to, gameId }) => {
      console.log("move", from, to, gameId);
      socket.broadcast.to(gameId).emit("opponent-move", { from, to });
    });
  });
};
