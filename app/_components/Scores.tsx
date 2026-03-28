"use client";
import { useScore } from '@modules/app/react/GameStateProvider';

export const Scores = () => {
  const score = useScore();

  return (
    <div className="bg-white min-w-24 rounded-lg p-4 flex flex-col items-center justify-center">
      <h1 id="score-title">Score</h1>
      <p className="text-lg font-bold text-navy-900">{score}</p>
    </div>
  );
};
