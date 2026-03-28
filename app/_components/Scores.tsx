"use client";
import { useScore } from '@modules/app/react/GameStateProvider';

export const Scores = () => {
  const score = useScore();
  return <>{score}</>;
};
