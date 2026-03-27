// Infrastructure implementations
import { InMemoryGameRepository } from './infra/repositories/in-memory/in-memory-game.repository';
import { InMemoryScoreRepository } from './infra/repositories/in-memory/in-memory-score.repository';
import { RandomComputerPlayerService } from './infra/services/random-computer-player.service';

// Use cases
import { StartGameUseCase } from './use-cases/commands/start-game.usecase';
import { PlayRoundUseCase } from './use-cases/commands/play-round.usecase';
import { GetPlayerScoreUseCase } from './use-cases/queries/get-player-score.usecase';

export function createShifumiModule() {
  // Infrastructure layer
  const gameRepository = new InMemoryGameRepository();
  const scoreRepository = new InMemoryScoreRepository();
  const computerPlayerService = new RandomComputerPlayerService();

  // Use cases layer
  const startGameUseCase = new StartGameUseCase(gameRepository, scoreRepository);
  const playRoundUseCase = new PlayRoundUseCase(gameRepository, scoreRepository, computerPlayerService);
  const getPlayerScoreUseCase = new GetPlayerScoreUseCase(scoreRepository);

  // Return public API (use cases)
  return {
    // Commands
    startGame: startGameUseCase,
    playRound: playRoundUseCase,
    
    // Queries
    getPlayerScore: getPlayerScoreUseCase,

    // For testing/debugging
    _internal: {
      gameRepository,
      scoreRepository,
      computerPlayerService
    }
  };
}

export type ShifumiModule = ReturnType<typeof createShifumiModule>;