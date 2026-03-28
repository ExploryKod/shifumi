import {
  ComputerStrategy,
  type ComputerPlayerService,
} from '@/modules/shifumi/ports/services/computer-player.service';
import { Move } from '@/modules/shifumi/domain/entities/move.entity';

export class RandomComputerPlayerService implements ComputerPlayerService {
  async generateMove(): Promise<Move> {
    return Move.getRandomMove();
  }

  async generateMoveWithStrategy(strategy: ComputerStrategy): Promise<Move> {
    switch (strategy) {
      case ComputerStrategy.RANDOM:
        return this.generateMove();
      case ComputerStrategy.COUNTER_LAST_MOVE:
        // For now, just return random. This could be enhanced with game history
        return this.generateMove();
      case ComputerStrategy.PATTERN_BASED:
        // For now, just return random. This could be enhanced with pattern analysis
        return this.generateMove();
      default:
        return this.generateMove();
    }
  }
}