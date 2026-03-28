import type { GameRepository } from '@/modules/shifumi/ports/repositories/game.repository';
import type { ScoreRepository } from '@/modules/shifumi/ports/repositories/score.repository';
import { Game } from '@/modules/shifumi/domain/entities/game.entity';
import { Player, PlayerId } from '@/modules/shifumi/domain/entities/player.entity';
import { Score } from '@/modules/shifumi/domain/entities/score.entity';
import type { StartGameInput, StartGameOutput } from './start-game.types';

export class StartGameUseCase {
  constructor(
    private gameRepository: GameRepository,
    private scoreRepository: ScoreRepository
  ) {}

  async execute(input: StartGameInput): Promise<StartGameOutput> {
    const playerId = input.playerId ? PlayerId.create(input.playerId) : PlayerId.generateId();
    const humanPlayer = Player.createHuman(input.playerName, playerId);
    const computerPlayer = Player.createComputer();

    const existingScore = await this.scoreRepository.findByPlayerId(playerId.value);
    if (!existingScore) {
      const initialScore = Score.zero(playerId.value);
      await this.scoreRepository.save(initialScore);
    }

    const game = Game.create({
      humanPlayer,
      computerPlayer
    });

    await this.gameRepository.save(game);

    return {
      gameId: game.id.value,
      playerId: humanPlayer.id.value,
      computerPlayerId: computerPlayer.id.value,
      success: true
    };
  }
}