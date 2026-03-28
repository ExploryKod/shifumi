export interface PlayRoundInput {
  gameId: string;
  humanMove: string; // 'rock', 'paper', 'scissors'
}

export interface PlayRoundOutput {
  gameId: string;
  humanMove: string;
  computerMove: string;
  result: 'win' | 'loss' | 'draw';
  message: string;
  scoreChange: number;
  newScore: number;
  success: true;
}