import type { ScoreRepository } from '@/modules/shifumi/ports/repositories/score.repository';
import { Score } from '@/modules/shifumi/domain/entities/score.entity';
import type { GetPlayerScoreInput, GetPlayerScoreOutput } from './get-player-score.types';

export class GetPlayerScoreUseCase {
  constructor(private scoreRepository: ScoreRepository) {}

  async execute(input: GetPlayerScoreInput): Promise<GetPlayerScoreOutput> {
    // 1. Find score or create default
    let score = await this.scoreRepository.findByPlayerId(input.playerId);
    
    if (!score) {
      score = Score.zero(input.playerId);
      await this.scoreRepository.save(score);
    }

    // 2. Return score data
    return {
      playerId: input.playerId,
      score: score.value,
      isPositive: score.isPositive(),
      isNegative: score.isNegative(),
      isZero: score.isZero(),
      success: true
    };
  }
}