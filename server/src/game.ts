export const games: any = {};

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
export const game = (id: string) => games[id];

export const addPlayer = (name: string, playerId: string, gameId: string) => {
  if (!games[gameId]) {
    const color = Math.random() > 0.5 ? "b" : "w";
    const player = new Player(name, playerId, gameId, color);
    games[gameId] = [player];
    return {
      message: "Joined Sucessfully",
      opponent: null,
      player,
    };
  }
  if (games[gameId].length > 2) {
    return { error: "Cannot enter maximum number  is full" };
  }
  const opponent = games[gameId][0];
  const color = opponent.color === "b" ? "w" : "b";
  const player = new Player(name, playerId, gameId, color);
  games[gameId].push(player);

  return {
    message: "added opponent sucessfully",
    opponent,
    player,
  };
};

export const removePlayer = (playerId: string, gameId: string) => {
  if (!games[gameId]) {
    return { error: "Room not found" };
  }
  const players = games[gameId];
  return players.filter((item: any) => item.playerId != playerId);
};
