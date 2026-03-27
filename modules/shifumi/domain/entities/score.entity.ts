export class Score {
  private constructor(
    public readonly value: number,
    public readonly playerId: string
  ) {}

  static create(value: number, playerId: string): Score {
    return new Score(value, playerId);
  }

  static zero(playerId: string): Score {
    return new Score(0, playerId);
  }

  /**
   * Add points to the score
   */
  add(points: number): Score {
    return new Score(this.value + points, this.playerId);
  }

  /**
   * Subtract points from the score
   */
  subtract(points: number): Score {
    return new Score(this.value - points, this.playerId);
  }

  /**
   * Apply score change (can be positive, negative, or zero)
   */
  applyChange(change: number): Score {
    return new Score(this.value + change, this.playerId);
  }

  /**
   * Check if score is positive
   */
  isPositive(): boolean {
    return this.value > 0;
  }

  /**
   * Check if score is negative
   */
  isNegative(): boolean {
    return this.value < 0;
  }

  /**
   * Check if score is zero
   */
  isZero(): boolean {
    return this.value === 0;
  }

  /**
   * Get absolute value of score
   */
  getAbsoluteValue(): number {
    return Math.abs(this.value);
  }

  equals(other: Score): boolean {
    return this.value === other.value && this.playerId === other.playerId;
  }

  toString(): string {
    return this.value.toString();
  }
}