import type { Move } from '@/modules/shifumi/domain/entities/move.entity';

export interface ComputerPlayerService {
  /**
   * Generate a move for the computer player
   * Can be random or use more sophisticated AI
   */
  generateMove(): Promise<Move>;

  /**
   * Generate a move with specific strategy
   */
  generateMoveWithStrategy(strategy: ComputerStrategy): Promise<Move>;
}

export enum ComputerStrategy {
  RANDOM = 'random',
  COUNTER_LAST_MOVE = 'counter_last_move',
  PATTERN_BASED = 'pattern_based'
}