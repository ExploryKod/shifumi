"use client";
import React, { useState } from 'react';
import { useShifumi } from '@modules/app/react/ShifumiProvider';

export const GameDemo: React.FC = () => {
  const shifumi = useShifumi();
  const [gameId, setGameId] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [lastResult, setLastResult] = useState<string | null>(null);

  const startNewGame = async () => {
    try {
      const result = await shifumi.startGame.execute({
        playerName: 'Player',
        playerId: playerId || undefined
      });
      
      setGameId(result.gameId);
      setPlayerId(result.playerId);
      setLastResult('Game started!');
    } catch (error) {
      setLastResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const playMove = async (move: string) => {
    if (!gameId) {
      setLastResult('Start a game first!');
      return;
    }

    try {
      const result = await shifumi.playRound.execute({
        gameId,
        humanMove: move
      });

      setScore(result.newScore);
      setLastResult(
        `You: ${result.humanMove} | Computer: ${result.computerMove} | ${result.result.toUpperCase()}! ${result.message}`
      );

      // Start new game for next round
      await startNewGame();
    } catch (error) {
      setLastResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <h2 className="text-2xl font-bold text-white">Rock Paper Scissors Demo</h2>
      
      <div className="text-center">
        <p className="text-lg text-white">Score: {score}</p>
        {lastResult && (
          <p className="text-sm text-gray-300 mt-2">{lastResult}</p>
        )}
      </div>

      {!gameId ? (
        <button
          onClick={startNewGame}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Game
        </button>
      ) : (
        <div className="flex space-x-4">
          <button
            onClick={() => playMove('rock')}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            🪨 Rock
          </button>
          <button
            onClick={() => playMove('paper')}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            📄 Paper
          </button>
          <button
            onClick={() => playMove('scissors')}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            ✂️ Scissors
          </button>
        </div>
      )}
    </div>
  );
};