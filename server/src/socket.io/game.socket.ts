import { addPlayer, createPlayer } from "../game";

export const connectoGame = (gameio) => {
  gameio.on("connection", (socket) => {
    socket.on("create-room", ({ name, gameId }) => {
      const { player, error } = createPlayer(name, socket.id, gameId);
      handlePlayerCreation(socket, gameId, player, error);
    });

    socket.on("join-room", ({ name, gameId }) => {
      const { player, opponent, error } = addPlayer(name, socket.id, gameId);
      handlePlayerJoining(socket, gameId, player, opponent, error);
    });

    socket.on("move", ({ from, to, gameId }) => {
      handleMove(socket, gameId, from, to);
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

const handlePlayerJoining = (socket, gameId, player, opponent, error) => {
  if (error) {
    emitError(socket, error);
    return;
  }
  socket.join(gameId);
  emitOpponentJoinedMessage(socket, opponent);
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

const emitOpponentJoinedMessage = (socket, opponent) => {
  socket.broadcast.emit("opponent-joined", {
    message: `${opponent?.name} has joined the game`,
  });
};
