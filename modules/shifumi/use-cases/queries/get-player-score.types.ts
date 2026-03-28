export interface GetPlayerScoreInput {
  playerId: string;
}

export interface GetPlayerScoreOutput {
  playerId: string;
  score: number;
  isPositive: boolean;
  isNegative: boolean;
  isZero: boolean;
  success: true;
}