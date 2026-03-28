"use client";
import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { useShifumi } from './ShifumiProvider';
import type { MoveType } from '@modules/shifumi/domain/entities/move.entity';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface GameState {
  playerId: string | null;
  currentGameId: string | null;
  score: number;
  lastResult: string | null;
  playerPick: MoveType | null;
  housePick: MoveType | null;
  outcome: 'win' | 'loss' | 'draw' | null;
  phase: 'idle' | 'revealing' | 'finished';
  isLoading: boolean;
}

interface GameStateContextType {
  gameState: GameState;
  startNewGame: () => Promise<void>;
  playMove: (move: string) => Promise<void>;
  refreshScore: () => Promise<void>;
}

// -----------------------------------------------------------------------------
// Context
// -----------------------------------------------------------------------------

const GameStateContext = createContext<GameStateContextType | null>(null);

// -----------------------------------------------------------------------------
// Provider
// -----------------------------------------------------------------------------

export const GameStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const shifumi = useShifumi();

  const [gameState, setGameState] = useState<GameState>({
    playerId: null,
    currentGameId: null,
    score: 0,
    lastResult: null,
    playerPick: null,
    housePick: null,
    outcome: null,
    phase: 'idle',
    isLoading: false,
  });

  const startNewGame = useCallback(async () => {
    setGameState(prev => ({ ...prev, isLoading: true }));

    try {
      const result = await shifumi.startGame.execute({
        playerName: 'Player',
        playerId: gameState.playerId || undefined
      });

      setGameState(prev => ({
        ...prev,
        currentGameId: result.gameId,
        playerId: result.playerId,
        lastResult: null,
        playerPick: null,
        housePick: null,
        outcome: null,
        phase: 'idle',
        isLoading: false,
      }));
    } catch (error) {
      setGameState(prev => ({
        ...prev,
        lastResult: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        isLoading: false,
      }));
    }
  }, [shifumi, gameState.playerId]);

  const playMove = useCallback(async (move: string) => {
    const normalizedMove = move as MoveType;
    setGameState(prev => ({
      ...prev,
      isLoading: true,
      playerPick: normalizedMove,
      housePick: null,
      outcome: null,
      phase: 'revealing',
      lastResult: null,
    }));

    try {
      let gameId = gameState.currentGameId;
      let playerId = gameState.playerId;

      if (!gameId) {
        const startResult = await shifumi.startGame.execute({
          playerName: 'Player',
          playerId: playerId || undefined
        });
        gameId = startResult.gameId;
        playerId = startResult.playerId;
      }

      const result = await shifumi.playRound.execute({
        gameId,
        humanMove: move
      });

      setGameState(prev => ({
        ...prev,
        currentGameId: gameId,
        playerId,
        score: result.newScore,
        playerPick: result.humanMove as MoveType,
        housePick: result.computerMove as MoveType,
        outcome: result.result,
        phase: 'finished',
        lastResult: `You: ${result.humanMove} | Computer: ${result.computerMove} | ${result.result.toUpperCase()}! ${result.message}`,
        isLoading: false,
      }));
    } catch (error) {
      setGameState(prev => ({
        ...prev,
        lastResult: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        phase: 'idle',
        isLoading: false,
      }));
    }
  }, [shifumi, gameState.currentGameId, gameState.playerId]);

  const refreshScore = useCallback(async () => {
    if (!gameState.playerId) return;

    try {
      const scoreResult = await shifumi.getPlayerScore.execute({
        playerId: gameState.playerId
      });

      setGameState(prev => ({
        ...prev,
        score: scoreResult.score,
      }));
    } catch (error) {
      console.error('Failed to refresh score:', error);
    }
  }, [shifumi, gameState.playerId]);

  const contextValue: GameStateContextType = {
    gameState,
    startNewGame,
    playMove,
    refreshScore,
  };

  return (
    <GameStateContext.Provider value={contextValue}>
      {children}
    </GameStateContext.Provider>
  );
};

// -----------------------------------------------------------------------------
// Hooks
// -----------------------------------------------------------------------------

export const useGameState = (): GameStateContextType => {
  const context = useContext(GameStateContext);

  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }

  return context;
};

export const useScore = () => {
  const { gameState } = useGameState();
  return gameState.score;
};

export const useLastResult = () => {
  const { gameState } = useGameState();
  return gameState.lastResult;
};

export const useGameActions = () => {
  const { startNewGame, playMove, refreshScore } = useGameState();
  return { startNewGame, playMove, refreshScore };
};
