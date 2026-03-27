"use client";
import React from 'react';
import { useScore, useLastResult } from '@modules/app/react/GameStateProvider';

export const Scores = () => {
  const score = useScore();
  const lastResult = useLastResult();

  return (
    <div className="text-center">
      <p className="text-lg text-white">Score: {score}</p>
      {lastResult && (
        <p className="text-sm text-gray-300 mt-2">{lastResult}</p>
      )}
    </div>
  );
};


