import type { Game, GameId } from '@/modules/shifumi/domain/entities/game.entity';
import type { Player } from '@/modules/shifumi/domain/entities/player.entity';

export interface GameRepository {
  /**
   * Save a game to storage
   */
  save(game: Game): Promise<void>;

  /**
   * Find a game by its ID
   */
  findById(gameId: GameId): Promise<Game | null>;

  /**
   * Find the most recent game for a player
   */
  findLatestByPlayer(player: Player): Promise<Game | null>;

  /**
   * Get all games for a player
   */
  findAllByPlayer(player: Player): Promise<Game[]>;

  /**
   * Delete a game
   */
  delete(gameId: GameId): Promise<void>;
}