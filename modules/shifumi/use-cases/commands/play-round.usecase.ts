import type { GameRepository } from '@/modules/shifumi/ports/repositories/game.repository';
import type { ScoreRepository } from '@/modules/shifumi/ports/repositories/score.repository';
import type { ComputerPlayerService } from '@/modules/shifumi/ports/services/computer-player.service';
import { GameId } from '@/modules/shifumi/domain/entities/game.entity';
import { Move } from '@/modules/shifumi/domain/entities/move.entity';
import { GameNotFoundError } from '@/modules/shifumi/domain/errors/errors.entity';
import type { PlayRoundInput, PlayRoundOutput } from './play-round.types';

export class PlayRoundUseCase {
  constructor(
    private gameRepository: GameRepository,
    private scoreRepository: ScoreRepository,
    private computerPlayerService: ComputerPlayerService
  ) {}

  async execute(input: PlayRoundInput): Promise<PlayRoundOutput> {
    // 1. Find the game
    const gameId = GameId.create(input.gameId);
    const game = await this.gameRepository.findById(gameId);
    if (!game) {
      throw new GameNotFoundError(input.gameId);
    }

    // 2. Parse and validate human move
    const humanMove = Move.fromString(input.humanMove);
    game.makeHumanMove(humanMove);

    // 3. Generate computer move
    const computerMove = await this.computerPlayerService.generateMove();
    game.makeComputerMove(computerMove);

    // 4. Get result
    const result = game.getResult();

    // 5. Update score
    const currentScore = await this.scoreRepository.findByPlayerId(game.humanPlayer.id.value);
    if (!currentScore) {
      throw new Error(`Score not found for player ${game.humanPlayer.id.value}`);
    }

    const newScore = currentScore.applyChange(result.getScoreChange());
    await this.scoreRepository.save(newScore);

    // 6. Save updated game
    await this.gameRepository.save(game);

    // 7. Return result
    return {
      gameId: game.id.value,
      humanMove: humanMove.toString(),
      computerMove: computerMove.toString(),
      result: result.isWin() ? 'win' : result.isLoss() ? 'loss' : 'draw',
      message: result.message,
      scoreChange: result.getScoreChange(),
      newScore: newScore.value,
      success: true
    };
  }
}