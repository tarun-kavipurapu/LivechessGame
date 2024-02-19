import { addPlayer, game, removePlayer } from "../game";

//player1->player
//player2->opponent

export const connect = (gameio) => {
  gameio.on("connection", (socket) => {
    console.log("connected with ", socket.id);
    socket.on("join-room", ({ name, gameId }, callback) => {
      const { opponent, error, player } = addPlayer(name, socket.id, gameId);
      if (error) {
        return callback({ error });
      }
      socket.join(gameId);
      console.log(player);
      callback({ color: player?.color });

      socket.emit("welcome", {
        message: `welcome to the game ${player?.name}`,
        opponent,
      });
      socket.broadcast.to(gameId).emit("opponent-join", {
        message: `your opponent ${opponent?.name} joined the game`,
        player,
      });
      if (game(gameId).length >= 2) {
        const white = game(gameId).find((player) => player.color === "w");
        gameio.to(gameId).emit("message", {
          message: `White  ${white.name} goes first`,
        });
      }
      socket.on("move", ({ from, to, gameId }) => {
        socket.broadcast.to(gameId).emit("opponent-Move", { from, to });
      });
      socket.on("disconnect", () => {
        const player = removePlayer(socket.id, gameId);
        if (player) {
          gameio.to(gameId).emit("message", {
            message: `${player[0].name} has left the chat `,
          });
          socket.broadcast.to(gameId).emit("opponent-Left", {
            message: "Your opponent ${} has left the game",
          });
        }
      });
    });
  });
};
