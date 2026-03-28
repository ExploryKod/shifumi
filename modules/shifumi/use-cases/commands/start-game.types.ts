export interface StartGameInput {
  playerName: string;
  playerId?: string;
}

export interface StartGameOutput {
  gameId: string;
  playerId: string;
  computerPlayerId: string;
  success: true;
}