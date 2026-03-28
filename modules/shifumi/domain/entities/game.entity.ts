import { Move } from './move.entity';
import { GameResult, GameOutcome } from './game-result.entity';
import { Player } from './player.entity';

export class GameId {
  private constructor(public readonly value: string) {}

  static create(value: string): GameId {
    const trimmed = value.trim();
    if (!trimmed) {
      throw new Error('GameId cannot be empty');
    }
    return new GameId(trimmed);
  }

  static generate(): GameId {
    return GameId.create(`game-${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`);
  }
}

export enum GameStatus {
  WAITING_FOR_PLAYER_MOVE = 'waiting_for_player_move',
  COMPLETED = 'completed'
}

export type CreateGameProps = {
  id?: GameId;
  humanPlayer: Player;
  computerPlayer: Player;
};

export class Game {
  private constructor(
    public readonly id: GameId,
    public readonly humanPlayer: Player,
    public readonly computerPlayer: Player,
    private status: GameStatus,
    private humanMove?: Move,
    private computerMove?: Move,
    private result?: GameResult
  ) {}

  static create(props: CreateGameProps): Game {
    const gameId = props.id ?? GameId.generate();

    if (!props.humanPlayer.isHuman()) {
      throw new InvalidGameSetupError('First player must be human');
    }
    if (!props.computerPlayer.isComputer()) {
      throw new InvalidGameSetupError('Second player must be computer');
    }

    return new Game(
      gameId,
      props.humanPlayer,
      props.computerPlayer,
      GameStatus.WAITING_FOR_PLAYER_MOVE
    );
  }

  makeHumanMove(move: Move): void {
    if (this.status !== GameStatus.WAITING_FOR_PLAYER_MOVE) {
      throw new InvalidGameStateError('Game is not waiting for player move');
    }
    
    if (this.humanMove) {
      throw new InvalidGameStateError('Human move already made');
    }

    this.humanMove = move;
  }

  makeComputerMove(move: Move): void {
    if (!this.humanMove) {
      throw new InvalidGameStateError('Human must move first');
    }

    if (this.computerMove) {
      throw new InvalidGameStateError('Computer move already made');
    }

    this.computerMove = move;
    this.evaluateGame();
  }

  makeRandomComputerMove(): void {
    const randomMove = Move.getRandomMove();
    this.makeComputerMove(randomMove);
  }

  private evaluateGame(): void {
    if (!this.humanMove || !this.computerMove) {
      throw new InvalidGameStateError('Both players must have made moves');
    }

    // Determine result from human player's perspective
    if (this.humanMove.beats(this.computerMove)) {
      this.result = GameResult.win(
        `${this.humanMove.getDisplayName()} beats ${this.computerMove.getDisplayName()}`
      );
    } else if (this.computerMove.beats(this.humanMove)) {
      this.result = GameResult.loss(
        `${this.computerMove.getDisplayName()} beats ${this.humanMove.getDisplayName()}`
      );
    } else {
      this.result = GameResult.draw(
        `Both players chose ${this.humanMove.getDisplayName()}`
      );
    }

    this.status = GameStatus.COMPLETED;
  }

  getResult(): GameResult {
    if (!this.result) {
      throw new InvalidGameStateError('Game is not completed yet');
    }
    return this.result;
  }

  getHumanMove(): Move {
    if (!this.humanMove) {
      throw new InvalidGameStateError('Human has not made a move yet');
    }
    return this.humanMove;
  }

  getComputerMove(): Move {
    if (!this.computerMove) {
      throw new InvalidGameStateError('Computer has not made a move yet');
    }
    return this.computerMove;
  }

  isCompleted(): boolean {
    return this.status === GameStatus.COMPLETED;
  }

  isWaitingForPlayerMove(): boolean {
    return this.status === GameStatus.WAITING_FOR_PLAYER_MOVE;
  }

  hasHumanMoved(): boolean {
    return !!this.humanMove;
  }

  hasComputerMoved(): boolean {
    return !!this.computerMove;
  }

  getStatus(): GameStatus {
    return this.status;
  }
}

export class InvalidGameSetupError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidGameSetupError";
  }
}

export class InvalidGameStateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidGameStateError";
  }
}