import type { Score } from '@/modules/shifumi/domain/entities/score.entity';

export interface ScoreRepository {
  /**
   * Save or update a player's score
   */
  save(score: Score): Promise<void>;

  /**
   * Find a player's current score
   */
  findByPlayerId(playerId: string): Promise<Score | null>;

  /**
   * Reset a player's score to zero
   */
  reset(playerId: string): Promise<void>;

  /**
   * Get all scores (for leaderboard functionality later)
   */
  findAll(): Promise<Score[]>;
}