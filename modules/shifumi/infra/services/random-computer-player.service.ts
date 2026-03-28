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
        return this.generateMove();
      case ComputerStrategy.PATTERN_BASED:
        return this.generateMove();
      default:
        return this.generateMove();
    }
  }
}