export enum MoveType {
  ROCK = 'rock',
  PAPER = 'paper',
  SCISSORS = 'scissors'
}

export class Move {
  private constructor(public readonly type: MoveType) {}

  static rock(): Move {
    return new Move(MoveType.ROCK);
  }

  static paper(): Move {
    return new Move(MoveType.PAPER);
  }

  static scissors(): Move {
    return new Move(MoveType.SCISSORS);
  }

  static fromString(moveString: string): Move {
    const normalizedMove = moveString.toLowerCase().trim();
    
    switch (normalizedMove) {
      case 'rock':
        return Move.rock();
      case 'paper':
        return Move.paper();
      case 'scissors':
        return Move.scissors();
      default:
        throw new InvalidMoveError(moveString);
    }
  }

  static getAllMoves(): Move[] {
    return [Move.rock(), Move.paper(), Move.scissors()];
  }

  static getRandomMove(): Move {
    const moves = Move.getAllMoves();
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
  }

  /**
   * Domain rule: determines if this move beats the opponent's move
   * Classic rules: Paper beats Rock, Rock beats Scissors, Scissors beats Paper
   */
  beats(opponent: Move): boolean {
    if (this.type === MoveType.PAPER && opponent.type === MoveType.ROCK) {
      return true;
    }
    if (this.type === MoveType.ROCK && opponent.type === MoveType.SCISSORS) {
      return true;
    }
    if (this.type === MoveType.SCISSORS && opponent.type === MoveType.PAPER) {
      return true;
    }
    return false;
  }

  equals(other: Move): boolean {
    return this.type === other.type;
  }

  toString(): string {
    return this.type;
  }

  /**
   * Get display name for UI
   */
  getDisplayName(): string {
    return this.type.charAt(0).toUpperCase() + this.type.slice(1);
  }
}

export class InvalidMoveError extends Error {
  constructor(move: string) {
    super(`Invalid move: ${move}. Valid moves are: rock, paper, scissors`);
    this.name = "InvalidMoveError";
  }
}