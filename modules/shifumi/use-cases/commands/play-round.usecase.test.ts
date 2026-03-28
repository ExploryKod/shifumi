import { PlayRoundUseCase } from './play-round.usecase';
import { StartGameUseCase } from './start-game.usecase';
import { InMemoryGameRepository } from '../../infra/repositories/in-memory/in-memory-game.repository';
import { InMemoryScoreRepository } from '../../infra/repositories/in-memory/in-memory-score.repository';
import { RandomComputerPlayerService } from '../../infra/services/random-computer-player.service';

describe('PlayRoundUseCase', () => {
  let playRoundUseCase: PlayRoundUseCase;
  let startGameUseCase: StartGameUseCase;
  let gameRepository: InMemoryGameRepository;
  let scoreRepository: InMemoryScoreRepository;
  let computerPlayerService: RandomComputerPlayerService;

  beforeEach(() => {
    gameRepository = new InMemoryGameRepository();
    scoreRepository = new InMemoryScoreRepository();
    computerPlayerService = new RandomComputerPlayerService();
    
    playRoundUseCase = new PlayRoundUseCase(gameRepository, scoreRepository, computerPlayerService);
    startGameUseCase = new StartGameUseCase(gameRepository, scoreRepository);
  });

  it('should play a complete round successfully', async () => {
    // Arrange: Start a game first
    const startResult = await startGameUseCase.execute({
      playerName: 'Alice'
    });

    // Act: Play a round
    const playResult = await playRoundUseCase.execute({
      gameId: startResult.gameId,
      humanMove: 'rock'
    });

    // Assert
    expect(playResult.success).toBe(true);
    expect(playResult.gameId).toBe(startResult.gameId);
    expect(playResult.humanMove).toBe('rock');
    expect(playResult.computerMove).toMatch(/^(rock|paper|scissors)$/);
    expect(playResult.result).toMatch(/^(win|loss|draw)$/);
    expect(typeof playResult.scoreChange).toBe('number');
    expect(typeof playResult.newScore).toBe('number');
    expect(playResult.message).toBeTruthy();
  });

  it('should update score correctly for a win', async () => {
    // Arrange
    const startResult = await startGameUseCase.execute({
      playerName: 'Alice'
    });

    // Mock computer service to always return scissors (so rock wins)
    jest.spyOn(computerPlayerService, 'generateMove').mockResolvedValue(
      require('../../domain/entities/move.entity').Move.scissors()
    );

    // Act
    const playResult = await playRoundUseCase.execute({
      gameId: startResult.gameId,
      humanMove: 'rock'
    });

    // Assert
    expect(playResult.result).toBe('win');
    expect(playResult.scoreChange).toBe(1);
    expect(playResult.newScore).toBe(1);
  });

  it('should update score correctly for a loss', async () => {
    // Arrange
    const startResult = await startGameUseCase.execute({
      playerName: 'Alice'
    });

    // Mock computer service to always return paper (so rock loses)
    jest.spyOn(computerPlayerService, 'generateMove').mockResolvedValue(
      require('../../domain/entities/move.entity').Move.paper()
    );

    // Act
    const playResult = await playRoundUseCase.execute({
      gameId: startResult.gameId,
      humanMove: 'rock'
    });

    // Assert
    expect(playResult.result).toBe('loss');
    expect(playResult.scoreChange).toBe(-1);
    expect(playResult.newScore).toBe(-1);
  });

  it('should handle draw correctly', async () => {
    // Arrange
    const startResult = await startGameUseCase.execute({
      playerName: 'Alice'
    });

    // Mock computer service to always return rock (so rock draws)
    jest.spyOn(computerPlayerService, 'generateMove').mockResolvedValue(
      require('../../domain/entities/move.entity').Move.rock()
    );

    // Act
    const playResult = await playRoundUseCase.execute({
      gameId: startResult.gameId,
      humanMove: 'rock'
    });

    // Assert
    expect(playResult.result).toBe('draw');
    expect(playResult.scoreChange).toBe(0);
    expect(playResult.newScore).toBe(0);
  });

  it('should throw error for non-existent game', async () => {
    // Act & Assert
    await expect(
      playRoundUseCase.execute({
        gameId: 'non-existent-game-id',
        humanMove: 'rock'
      })
    ).rejects.toThrow('Game with id non-existent-game-id not found');
  });

  it('should throw error for invalid move', async () => {
    // Arrange
    const startResult = await startGameUseCase.execute({
      playerName: 'Alice'
    });

    // Act & Assert
    await expect(
      playRoundUseCase.execute({
        gameId: startResult.gameId,
        humanMove: 'invalid-move'
      })
    ).rejects.toThrow('Invalid move');
  });
});