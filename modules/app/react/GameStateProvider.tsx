"use client";
import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { useShifumi } from './ShifumiProvider';

// Game state interface
interface GameState {
  playerId: string | null;
  currentGameId: string | null;
  score: number;
  lastResult: string | null;
  isLoading: boolean;
}

// Context interface
interface GameStateContextType {
  // State
  gameState: GameState;
  
  // Actions
  startNewGame: () => Promise<void>;
  playMove: (move: string) => Promise<void>;
  refreshScore: () => Promise<void>;
}

// Create context
const GameStateContext = createContext<GameStateContextType | null>(null);

// Provider component
export const GameStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const shifumi = useShifumi();
  
  const [gameState, setGameState] = useState<GameState>({
    playerId: null,
    currentGameId: null,
    score: 0,
    lastResult: null,
    isLoading: false,
  });

  // Start new game action
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
        lastResult: 'Game started!',
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

  // Play move action
  const playMove = useCallback(async (move: string) => {
    if (!gameState.currentGameId) {
      setGameState(prev => ({
        ...prev,
        lastResult: 'Start a game first!'
      }));
      return;
    }

    setGameState(prev => ({ ...prev, isLoading: true }));

    try {
      const result = await shifumi.playRound.execute({
        gameId: gameState.currentGameId,
        humanMove: move
      });

      // Update state with new score and result
      setGameState(prev => ({
        ...prev,
        score: result.newScore,
        lastResult: `You: ${result.humanMove} | Computer: ${result.computerMove} | ${result.result.toUpperCase()}! ${result.message}`,
        isLoading: false,
      }));

      // Start new game for next round
      await startNewGame();
    } catch (error) {
      setGameState(prev => ({
        ...prev,
        lastResult: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        isLoading: false,
      }));
    }
  }, [shifumi, gameState.currentGameId, startNewGame]);

  // Refresh score action (for components that just want to display score)
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

// Hook to use game state
export const useGameState = (): GameStateContextType => {
  const context = useContext(GameStateContext);
  
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  
  return context;
};

// Convenience hooks for specific parts of state
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