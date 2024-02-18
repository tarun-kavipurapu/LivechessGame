const games: any = {};

class Player {
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

const addPlayer = (name: string, playerId: string, gameId: string) => {
  if (!games[gameId]) {
  }
};
