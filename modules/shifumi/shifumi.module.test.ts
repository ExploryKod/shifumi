import { createShifumiModule } from './shifumi.module';

describe('Shifumi Module Integration', () => {
  let shifumiModule: ReturnType<typeof createShifumiModule>;

  beforeEach(() => {
    shifumiModule = createShifumiModule();
  });

  describe('Complete Game Flow', () => {
    it('should handle a complete game session with multiple rounds', async () => {
      // Start a game
      const startResult = await shifumiModule.startGame.execute({
        playerName: 'Alice'
      });

      expect(startResult.success).toBe(true);
      expect(startResult.gameId).toBeTruthy();
      expect(startResult.playerId).toBeTruthy();

      // Check initial score
      const initialScore = await shifumiModule.getPlayerScore.execute({
        playerId: startResult.playerId
      });
      expect(initialScore.score).toBe(0);
      expect(initialScore.isZero).toBe(true);

      // Play first round
      const round1 = await shifumiModule.playRound.execute({
        gameId: startResult.gameId,
        humanMove: 'rock'
      });

      expect(round1.success).toBe(true);
      expect(round1.humanMove).toBe('rock');
      expect(['rock', 'paper', 'scissors']).toContain(round1.computerMove);
      expect(['win', 'loss', 'draw']).toContain(round1.result);
      expect([-1, 0, 1]).toContain(round1.scoreChange);

      // Start second game (new round)
      const startResult2 = await shifumiModule.startGame.execute({
        playerName: 'Alice',
        playerId: startResult.playerId // Same player
      });

      // Play second round
      const round2 = await shifumiModule.playRound.execute({
        gameId: startResult2.gameId,
        humanMove: 'paper'
      });

      expect(round2.success).toBe(true);
      expect(round2.humanMove).toBe('paper');

      // Final score should reflect both rounds
      const finalScore = await shifumiModule.getPlayerScore.execute({
        playerId: startResult.playerId
      });

      const expectedScore = round1.scoreChange + round2.scoreChange;
      expect(finalScore.score).toBe(expectedScore);
    });

    it('should maintain score persistence across games for same player', async () => {
      const playerId = 'test-player-123';

      // Game 1: Win scenario (mock computer to lose)
      const game1 = await shifumiModule.startGame.execute({
        playerName: 'TestPlayer',
        playerId
      });

      // Mock the computer service to always return scissors (so rock wins)
      jest.spyOn(shifumiModule._internal.computerPlayerService, 'generateMove')
        .mockResolvedValueOnce(require('./domain/entities/move.entity').Move.scissors());

      const round1 = await shifumiModule.playRound.execute({
        gameId: game1.gameId,
        humanMove: 'rock'
      });

      expect(round1.result).toBe('win');
      expect(round1.newScore).toBe(1);

      // Game 2: Loss scenario
      const game2 = await shifumiModule.startGame.execute({
        playerName: 'TestPlayer',
        playerId
      });

      // Mock computer to return paper (so rock loses)
      jest.spyOn(shifumiModule._internal.computerPlayerService, 'generateMove')
        .mockResolvedValueOnce(require('./domain/entities/move.entity').Move.paper());

      const round2 = await shifumiModule.playRound.execute({
        gameId: game2.gameId,
        humanMove: 'rock'
      });

      expect(round2.result).toBe('loss');
      expect(round2.newScore).toBe(0); // 1 - 1 = 0

      // Verify final score
      const finalScore = await shifumiModule.getPlayerScore.execute({
        playerId
      });
      expect(finalScore.score).toBe(0);
      expect(finalScore.isZero).toBe(true);
    });

    it('should handle different players independently', async () => {
      // Player 1
      const player1Game = await shifumiModule.startGame.execute({
        playerName: 'Alice'
      });

      jest.spyOn(shifumiModule._internal.computerPlayerService, 'generateMove')
        .mockResolvedValueOnce(require('./domain/entities/move.entity').Move.scissors());

      await shifumiModule.playRound.execute({
        gameId: player1Game.gameId,
        humanMove: 'rock'
      });

      // Player 2
      const player2Game = await shifumiModule.startGame.execute({
        playerName: 'Bob'
      });

      jest.spyOn(shifumiModule._internal.computerPlayerService, 'generateMove')
        .mockResolvedValueOnce(require('./domain/entities/move.entity').Move.paper());

      await shifumiModule.playRound.execute({
        gameId: player2Game.gameId,
        humanMove: 'rock'
      });

      // Check scores are independent
      const alice = await shifumiModule.getPlayerScore.execute({
        playerId: player1Game.playerId
      });
      const bob = await shifumiModule.getPlayerScore.execute({
        playerId: player2Game.playerId
      });

      expect(alice.score).toBe(1); // Won
      expect(bob.score).toBe(-1); // Lost
    });
  });

  describe('Error Handling', () => {
    it('should throw error for invalid game ID', async () => {
      await expect(
        shifumiModule.playRound.execute({
          gameId: 'invalid-game-id',
          humanMove: 'rock'
        })
      ).rejects.toThrow('Game with id invalid-game-id not found');
    });

    it('should throw error for invalid move', async () => {
      const game = await shifumiModule.startGame.execute({
        playerName: 'Alice'
      });

      await expect(
        shifumiModule.playRound.execute({
          gameId: game.gameId,
          humanMove: 'invalid-move'
        })
      ).rejects.toThrow('Invalid move');
    });
  });

  describe('Clean Architecture Validation', () => {
    it('should properly inject dependencies through interfaces', () => {
      // Verify that the module exposes use cases, not repositories directly
      expect(shifumiModule.startGame).toBeDefined();
      expect(shifumiModule.playRound).toBeDefined();
      expect(shifumiModule.getPlayerScore).toBeDefined();
      
      // Internal dependencies should be available for testing but not part of public API
      expect(shifumiModule._internal.gameRepository).toBeDefined();
      expect(shifumiModule._internal.scoreRepository).toBeDefined();
      expect(shifumiModule._internal.computerPlayerService).toBeDefined();
    });

    it('should use repository interfaces correctly', async () => {
      const gameRepo = shifumiModule._internal.gameRepository;
      const scoreRepo = shifumiModule._internal.scoreRepository;

      // Initially empty
      expect(gameRepo.size()).toBe(0);
      expect(scoreRepo.size()).toBe(0);

      // After starting a game
      await shifumiModule.startGame.execute({
        playerName: 'Alice'
      });

      expect(gameRepo.size()).toBe(1);
      expect(scoreRepo.size()).toBe(1);
    });
  });
});