import { Game } from './game.entity';
import { Move } from './move.entity';
import { Player } from './player.entity';
import { GameOutcome } from './game-result.entity';

describe('Game Entity', () => {
  let humanPlayer: Player;
  let computerPlayer: Player;

  beforeEach(() => {
    humanPlayer = Player.createHuman('Alice');
    computerPlayer = Player.createComputer();
  });

  describe('Game Creation', () => {
    it('should create a new game with human and computer players', () => {
      const game = Game.create({
        humanPlayer,
        computerPlayer
      });

      expect(game.humanPlayer).toBe(humanPlayer);
      expect(game.computerPlayer).toBe(computerPlayer);
      expect(game.isWaitingForPlayerMove()).toBe(true);
      expect(game.isCompleted()).toBe(false);
    });

    it('should throw error if first player is not human', () => {
      const anotherComputer = Player.createComputer('Bot2');
      
      expect(() => {
        Game.create({
          humanPlayer: anotherComputer, // Wrong: should be human
          computerPlayer
        });
      }).toThrow('First player must be human');
    });
  });

  describe('Game Flow', () => {
    let game: Game;

    beforeEach(() => {
      game = Game.create({ humanPlayer, computerPlayer });
    });

    it('should allow human to make a move', () => {
      const move = Move.rock();
      game.makeHumanMove(move);

      expect(game.hasHumanMoved()).toBe(true);
      expect(game.getHumanMove()).toBe(move);
    });

    it('should complete game after both players move', () => {
      game.makeHumanMove(Move.rock());
      game.makeComputerMove(Move.scissors());

      expect(game.isCompleted()).toBe(true);
      expect(game.hasComputerMoved()).toBe(true);
      
      const result = game.getResult();
      expect(result.isWin()).toBe(true); // Rock beats Scissors
    });

    it('should handle draw correctly', () => {
      game.makeHumanMove(Move.paper());
      game.makeComputerMove(Move.paper());

      const result = game.getResult();
      expect(result.isDraw()).toBe(true);
    });

    it('should handle loss correctly', () => {
      game.makeHumanMove(Move.scissors());
      game.makeComputerMove(Move.rock());

      const result = game.getResult();
      expect(result.isLoss()).toBe(true); // Rock beats Scissors
    });
  });

  describe('Move Rules', () => {
    it('should implement classic rules correctly', () => {
      // Paper beats Rock
      expect(Move.paper().beats(Move.rock())).toBe(true);
      expect(Move.rock().beats(Move.paper())).toBe(false);

      // Rock beats Scissors
      expect(Move.rock().beats(Move.scissors())).toBe(true);
      expect(Move.scissors().beats(Move.rock())).toBe(false);

      // Scissors beats Paper
      expect(Move.scissors().beats(Move.paper())).toBe(true);
      expect(Move.paper().beats(Move.scissors())).toBe(false);
    });

    it('should handle same moves as draw', () => {
      expect(Move.rock().beats(Move.rock())).toBe(false);
      expect(Move.paper().beats(Move.paper())).toBe(false);
      expect(Move.scissors().beats(Move.scissors())).toBe(false);
    });
  });

  describe('Random Computer Move', () => {
    it('should make a valid random move', () => {
      const game = Game.create({ humanPlayer, computerPlayer });
      game.makeHumanMove(Move.rock());
      game.makeRandomComputerMove();

      expect(game.hasComputerMoved()).toBe(true);
      expect(game.isCompleted()).toBe(true);
      
      const computerMove = game.getComputerMove();
      expect([Move.rock(), Move.paper(), Move.scissors()].some(m => 
        m.equals(computerMove)
      )).toBe(true);
    });
  });
});