"use client";
import React from 'react';
import { useGameState } from '@modules/app/react/GameStateProvider';
import { ShifumiBtn } from './ShifumiBtn';
import { MoveType } from '@modules/shifumi/domain/entities/move.entity';

export const GameBoard = () => {
  const { gameState, startNewGame } = useGameState();
  const isWin = gameState.outcome === 'win';
  const isLoss = gameState.outcome === 'loss';
  const isDraw = gameState.outcome === 'draw';

  // Show result screen after a game
  if (gameState.phase === 'finished' && gameState.playerPick && gameState.housePick) {
    return (
      <div className="flex flex-col items-center space-y-8">
        <div className="flex flex-col items-center gap-10 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-12">
          <div className="flex flex-col items-center space-y-4">
            <p className="text-white text-sm font-semibold tracking-wider">YOU PICKED</p>
            <ShifumiBtn move={gameState.playerPick} isResultDisplay className="size-[clamp(8rem,26vw,12rem)] md:size-[clamp(10rem,20vw,18rem)]" />
          </div>

          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-white text-4xl md:text-5xl font-bold">
              {isWin && 'YOU WIN'}
              {isLoss && 'YOU LOSE'}
              {isDraw && 'DRAW'}
            </h2>
            <button
              onClick={startNewGame}
              className="px-8 py-3 bg-white text-navy-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              PLAY AGAIN
            </button>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <p className="text-white text-sm font-semibold tracking-wider">THE HOUSE PICKED</p>
            <ShifumiBtn move={gameState.housePick} isResultDisplay className="size-[clamp(8rem,26vw,12rem)] md:size-[clamp(10rem,20vw,18rem)]" />
          </div>
        </div>
      </div>
    );
  }

  // Show waiting state while computer picks
  if (gameState.phase === 'revealing' && gameState.playerPick) {
    return (
      <div className="flex flex-col items-center gap-10 md:grid md:grid-cols-2 md:gap-16">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-white text-sm font-semibold tracking-wider">YOU PICKED</p>
          <ShifumiBtn move={gameState.playerPick} isResultDisplay className="size-[clamp(8rem,26vw,12rem)] md:size-[clamp(10rem,20vw,18rem)]" />
        </div>
        <div className="flex flex-col items-center space-y-4">
          <p className="text-white text-sm font-semibold tracking-wider">THE HOUSE PICKED</p>
          <div className="size-[clamp(8rem,26vw,12rem)] rounded-full bg-black/20 md:size-[clamp(10rem,20vw,18rem)]"></div>
        </div>
      </div>
    );
  }

  const slotClasses =
    "absolute -translate-x-1/2 -translate-y-1/2";

  return (
    <div className="flex flex-col items-center">
      <div className="relative mx-auto aspect-313/278 w-[min(92vw,28rem)]">
        <div
          className="absolute inset-[18%_12%_12%_12%] bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/patterns/bg-triangle.svg)",
            backgroundSize: "100% 100%",
          }}
          aria-hidden="true"
        />

        <div className={slotClasses} style={{ top: "16%", left: "22%" }}>
          <ShifumiBtn move={MoveType.PAPER} />
        </div>

        <div className={slotClasses} style={{ top: "16%", left: "78%" }}>
          <ShifumiBtn move={MoveType.SCISSORS} />
        </div>

        <div className={slotClasses} style={{ top: "76%", left: "50%" }}>
          <ShifumiBtn move={MoveType.ROCK} />
        </div>
      </div>

      {gameState.isLoading && gameState.phase === 'idle' && (
        <div className="mt-6 flex items-center gap-3 text-sm text-white/70">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
          <span>Starting game...</span>
        </div>
      )}
    </div>
  );
};