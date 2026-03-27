import type { ScoreRepository } from '@/modules/shifumi/ports/repositories/score.repository';
import { Score } from '@/modules/shifumi/domain/entities/score.entity';

export class InMemoryScoreRepository implements ScoreRepository {
  private scores = new Map<string, Score>();

  async save(score: Score): Promise<void> {
    this.scores.set(score.playerId, score);
  }

  async findByPlayerId(playerId: string): Promise<Score | null> {
    return this.scores.get(playerId) || null;
  }

  async reset(playerId: string): Promise<void> {
    const zeroScore = Score.zero(playerId);
    this.scores.set(playerId, zeroScore);
  }

  async findAll(): Promise<Score[]> {
    return Array.from(this.scores.values());
  }

  // Helper methods for testing
  clear(): void {
    this.scores.clear();
  }

  size(): number {
    return this.scores.size;
  }
}