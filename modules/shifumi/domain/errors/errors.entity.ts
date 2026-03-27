// Re-export all domain errors for easy importing
export { InvalidMoveError } from '../entities/move.entity';
export { InvalidGameSetupError, InvalidGameStateError } from '../entities/game.entity';

// Additional domain errors
export class GameNotFoundError extends Error {
  constructor(gameId: string) {
    super(`Game with id ${gameId} not found`);
    this.name = "GameNotFoundError";
  }
}

export class PlayerNotFoundError extends Error {
  constructor(playerId: string) {
    super(`Player with id ${playerId} not found`);
    this.name = "PlayerNotFoundError";
  }
}

export class ScoreNotFoundError extends Error {
  constructor(playerId: string) {
    super(`Score for player ${playerId} not found`);
    this.name = "ScoreNotFoundError";
  }
}