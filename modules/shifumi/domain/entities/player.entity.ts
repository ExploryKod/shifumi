export enum PlayerType {
  HUMAN = 'human',
  COMPUTER = 'computer'
}

export class PlayerId {
  private constructor(public readonly value: string) {}

  static create(value: string): PlayerId {
    const trimmed = value.trim();
    if (!trimmed) {
      throw new Error('PlayerId cannot be empty');
    }
    return new PlayerId(trimmed);
  }

  static generateId(): PlayerId {
    return PlayerId.create(`${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`);
  }
}

export class Player {
  private constructor(
    public readonly id: PlayerId,
    public readonly type: PlayerType,
    public readonly name: string
  ) {}

  static createHuman(name: string, id?: PlayerId): Player {
    return new Player(
      id ?? PlayerId.generateId(),
      PlayerType.HUMAN,
      name || 'Player'
    );
  }

  static createComputer(name?: string, id?: PlayerId): Player {
    return new Player(
      id ?? PlayerId.generateId(),
      PlayerType.COMPUTER,
      name || 'Computer'
    );
  }

  isHuman(): boolean {
    return this.type === PlayerType.HUMAN;
  }

  isComputer(): boolean {
    return this.type === PlayerType.COMPUTER;
  }

  equals(other: Player): boolean {
    return this.id.value === other.id.value;
  }
}