import type { GameRepository } from '@/modules/shifumi/ports/repositories/game.repository';
import type { Game, GameId } from '@/modules/shifumi/domain/entities/game.entity';
import type { Player } from '@/modules/shifumi/domain/entities/player.entity';

export class InMemoryGameRepository implements GameRepository {
  private games = new Map<string, Game>();

  async save(game: Game): Promise<void> {
    this.games.set(game.id.value, game);
  }

  async findById(gameId: GameId): Promise<Game | null> {
    return this.games.get(gameId.value) || null;
  }

  async findLatestByPlayer(player: Player): Promise<Game | null> {
    const playerGames = Array.from(this.games.values())
      .filter(game => 
        game.humanPlayer.id.value === player.id.value || 
        game.computerPlayer.id.value === player.id.value
      )
      .sort((a, b) => a.id.value.localeCompare(b.id.value));

    return playerGames[playerGames.length - 1] || null;
  }

  async findAllByPlayer(player: Player): Promise<Game[]> {
    return Array.from(this.games.values())
      .filter(game => 
        game.humanPlayer.id.value === player.id.value || 
        game.computerPlayer.id.value === player.id.value
      );
  }

  async delete(gameId: GameId): Promise<void> {
    this.games.delete(gameId.value);
  }

  clear(): void {
    this.games.clear();
  }

  size(): number {
    return this.games.size;
  }
}