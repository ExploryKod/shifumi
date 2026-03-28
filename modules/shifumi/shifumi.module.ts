import { InMemoryGameRepository } from './infra/repositories/in-memory/in-memory-game.repository';
import { InMemoryScoreRepository } from './infra/repositories/in-memory/in-memory-score.repository';
import { RandomComputerPlayerService } from './infra/services/random-computer-player.service';
import { StartGameUseCase } from './use-cases/commands/start-game.usecase';
import { PlayRoundUseCase } from './use-cases/commands/play-round.usecase';
import { GetPlayerScoreUseCase } from './use-cases/queries/get-player-score.usecase';

// -----------------------------------------------------------------------------
// Module factory
// -----------------------------------------------------------------------------

export function createShifumiModule() {
  const gameRepository = new InMemoryGameRepository();
  const scoreRepository = new InMemoryScoreRepository();
  const computerPlayerService = new RandomComputerPlayerService();

  const startGameUseCase = new StartGameUseCase(gameRepository, scoreRepository);
  const playRoundUseCase = new PlayRoundUseCase(gameRepository, scoreRepository, computerPlayerService);
  const getPlayerScoreUseCase = new GetPlayerScoreUseCase(scoreRepository);

  return {
    startGame: startGameUseCase,
    playRound: playRoundUseCase,
    getPlayerScore: getPlayerScoreUseCase,

    /** Repositories and computer service — use in tests only. */
    _internal: {
      gameRepository,
      scoreRepository,
      computerPlayerService
    }
  };
}

export type ShifumiModule = ReturnType<typeof createShifumiModule>;
