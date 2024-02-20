// Define games object to store game instances
export const games: { [gameId: string]: Player[] } = {};

// Define Player class
export class Player {
  name: string;
  playerId: string;
  gameId: string;
  color: string;

  constructor(name: string, playerId: string, gameId: string, color: string) {
    this.name = name;
    this.playerId = playerId;
    this.gameId = gameId;
    this.color = color;
  }
}

// Function to retrieve a game instance by ID
export const game = (id: string): Player[] | undefined => games[id];

// Function to create a player and add them to a game room
export const createPlayer = (
  name: string,
  playerId: string,
  gameId: string
) => {
  if (!games[gameId]) {
    // If the game doesn't exist, create it and add the player
    const color = Math.random() > 0.5 ? "b" : "w";
    const player = new Player(name, playerId, gameId, color);
    games[gameId] = [player];
    return {
      message: "created successfully",
      opponent: null,
      player,
    };
  } else {
    return {
      error: "Room already exists. Join the room to play.",
    };
  }
};

// Function to add a player to an existing game room
export const addPlayer = (name: string, playerId: string, gameId: string) => {
  const existingGame = games[gameId];
  if (!existingGame) {
    return { error: "Room not found." };
  }

  // Check if the game is full
  if (existingGame.length >= 2) {
    return {
      error: "Maximum number of players reached. Cannot join the game.",
    };
  }

  // If the game exists and has less than 2 players, add the new player
  const opponent = existingGame[0];
  const color = opponent.color === "b" ? "w" : "b";
  const player = new Player(name, playerId, gameId, color);
  existingGame.push(player);

  return {
    message: "Added opponent successfully",
    opponent,
    player,
  };
};

// Function to remove a player from a game room
export const removePlayer = (playerId: string, gameId: string) => {
  const existingGame = games[gameId];
  if (!existingGame) {
    return { error: "Room not found." };
  }

  // Remove the player from the game
  const updatedPlayers = existingGame.filter(
    (player) => player.playerId !== playerId
  );
  games[gameId] = updatedPlayers;

  return {
    message: "Player removed successfully",
    remainingPlayers: updatedPlayers,
  };
};
