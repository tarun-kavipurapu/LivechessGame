import { addPlayer, createPlayer, removePlayer, games } from "../game";

export const connectoGame = (gameio) => {
  gameio.on("connection", (socket) => {
    socket.on("create-room", ({ name, gameId }) => {
      const { player, error } = createPlayer(name, socket.id, gameId);
      handlePlayerCreation(socket, gameId, player, error);
    });

    socket.on("join-room", ({ name, gameId }) => {
      const { player, opponent, error } = addPlayer(name, socket.id, gameId);
      handlePlayerJoining(socket, gameId, player, opponent, error, gameio);
    });

    socket.on("move", ({ from, to, gameId }) => {
      handleMove(socket, gameId, from, to);
    });
    socket.on("disconnect", () => {
      handleDisconnect(socket);
    });
  });
};

const handlePlayerCreation = (socket, gameId, player, error) => {
  if (error) {
    emitError(socket, error);
    return;
  }
  socket.join(gameId);
  emitWelcomeMessage(socket, player);
};

const handlePlayerJoining = (
  socket,
  gameId,
  player,
  opponent,
  error,
  gameio
) => {
  if (error) {
    emitError(socket, error);
    return;
  }
  socket.join(gameId);
  // emitPlayerColorAndName(socket, player, gameId);
  emitOpponentJoinedMessage(socket, opponent, player, gameId, gameio);
  emitWelcomeMessage(socket, player);
};

const handleMove = (socket, gameId, from, to) => {
  socket.broadcast.to(gameId.toString()).emit("opponent-move", { from, to });
};

const emitError = (socket, message) => {
  socket.emit("error", { message });
};

const emitWelcomeMessage = (socket, player) => {
  socket.emit("welcome", {
    message: `Welcome to the game, ${player?.name}`,
    player,
  });
};

const emitOpponentJoinedMessage = (
  socket,
  opponent,
  player,
  gameId,
  gameio
) => {
  gameio.to(gameId.toString()).emit("opponent-joined", {
    message: `${opponent?.name} has joined the game`,
    color: player?.color,
    name: player?.name,
    opponent,
  });
};

// const emitPlayerColorAndName = (socket, player, gameId) => {
//   console.log(player?.name, player?.color);
//   socket.broadcast.to(gameId.toString()).emit("opponent-color-name", {
//     name: player?.name,
//     color: player?.color,
//   });
// };

const handleDisconnect = (socket) => {
  // Remove the disconnected player from all games
  for (const gameId in games) {
    const result = removePlayer(socket.id, gameId);
    if (result.error) {
      console.log(result.error);
    } else {
      console.log(result.message);
    }
  }
};
