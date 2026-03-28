export enum GameOutcome {
  WIN = 'win',
  LOSS = 'loss', 
  DRAW = 'draw'
}

export class GameResult {
  private constructor(
    public readonly outcome: GameOutcome,
    public readonly message: string
  ) {}

  static win(message?: string): GameResult {
    return new GameResult(
      GameOutcome.WIN, 
      message || "You win!"
    );
  }

  static loss(message?: string): GameResult {
    return new GameResult(
      GameOutcome.LOSS,
      message || "You lose!"
    );
  }

  static draw(message?: string): GameResult {
    return new GameResult(
      GameOutcome.DRAW,
      message || "It's a draw!"
    );
  }

  isWin(): boolean {
    return this.outcome === GameOutcome.WIN;
  }

  isLoss(): boolean {
    return this.outcome === GameOutcome.LOSS;
  }

  isDraw(): boolean {
    return this.outcome === GameOutcome.DRAW;
  }

  /**
   * Get score change for this result
   * Win: +1, Loss: -1, Draw: 0
   */
  getScoreChange(): number {
    switch (this.outcome) {
      case GameOutcome.WIN:
        return 1;
      case GameOutcome.LOSS:
        return -1;
      case GameOutcome.DRAW:
        return 0;
    }
  }

  equals(other: GameResult): boolean {
    return this.outcome === other.outcome;
  }
}