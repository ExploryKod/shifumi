"use client";
import React from 'react';
import { useGameState } from '@modules/app/react/GameStateProvider';

export const GameControls = () => {
  const { gameState, startNewGame, playMove } = useGameState();

  return (
    <div className="flex flex-col items-center space-y-6">
      {!gameState.currentGameId ? (
        <button
          onClick={startNewGame}
          disabled={gameState.isLoading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {gameState.isLoading ? 'Starting...' : 'Start Game'}
        </button>
      ) : (
        <div className="flex space-x-4">
          <button
            onClick={() => playMove('rock')}
            disabled={gameState.isLoading}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🪨 Rock
          </button>
          <button
            onClick={() => playMove('paper')}
            disabled={gameState.isLoading}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            📄 Paper
          </button>
          <button
            onClick={() => playMove('scissors')}
            disabled={gameState.isLoading}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ✂️ Scissors
          </button>
        </div>
      )}
      
      {gameState.isLoading && (
        <p className="text-sm text-gray-400">Processing...</p>
      )}
    </div>
  );
};