"use client";
import React from 'react';
import { useGameState } from '@modules/app/react/GameStateProvider';
import { ShifumiBtn, SHIFUMI_RESULT_MOVE_CLASSNAME } from './ShifumiBtn';
import { MoveType } from '@modules/shifumi/domain/entities/move.entity';

type PickPanelProps = {
  title: string;
  move?: MoveType | null;
  waiting?: boolean;
  highlightWinner?: boolean;
};

const PickPanel = ({ title, move, waiting = false, highlightWinner = false }: PickPanelProps) => {
  return (
    <div className="flex min-w-0 max-w-full flex-col items-center gap-6">
      <div className="md:order-1">
        {move ? (
          <ShifumiBtn
            move={move}
            isResultDisplay
            highlightWinner={highlightWinner}
            className={SHIFUMI_RESULT_MOVE_CLASSNAME}
          />
        ) : (
          <div
            className={`rounded-full bg-black/20 ${SHIFUMI_RESULT_MOVE_CLASSNAME}`}
          />
        )}
      </div>
      <p className="text-center text-[0.95rem] font-semibold tracking-[0.18em] text-white md:order-0 md:text-[1.1rem]">
        {title}
      </p>
      {waiting && <span className="sr-only">Waiting for the house pick</span>}
    </div>
  );
};

export const GameBoard = () => {
  const { gameState, startNewGame } = useGameState();
  const isWin = gameState.outcome === 'win';
  const isLoss = gameState.outcome === 'loss';
  const isDraw = gameState.outcome === 'draw';

  if (gameState.phase === 'finished' && gameState.playerPick && gameState.housePick) {
    const resultPanels = [
      {
        key: 'you',
        title: 'YOU PICKED',
        move: gameState.playerPick as MoveType,
        highlightWinner: isWin,
        cellOrder: 'order-1 md:order-0',
      },
      {
        key: 'house',
        title: 'THE HOUSE PICKED',
        move: gameState.housePick as MoveType,
        highlightWinner: isLoss,
        cellOrder: 'order-2 md:order-0',
      },
    ] as const;

    return (
      <div className="game-board flex w-full min-w-0 max-w-full flex-col items-center px-4 py-4 sm:px-6">
        <div className="grid w-full min-w-0 max-w-full grid-cols-1 justify-items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] md:items-center md:gap-4 md:justify-items-center lg:gap-8">
          <div className={`${resultPanels[0].cellOrder} flex w-full min-w-0 max-w-full justify-center`}>
            <PickPanel
              title={resultPanels[0].title}
              move={resultPanels[0].move}
              highlightWinner={resultPanels[0].highlightWinner}
            />
          </div>

          <div className="order-3 flex w-full min-w-0 max-w-full flex-col items-center justify-center space-y-4 md:order-0 md:px-2">
            <h2 className="max-w-full text-center text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {isWin && 'YOU WIN'}
              {isLoss && 'YOU LOSE'}
              {isDraw && 'DRAW'}
            </h2>
            <button
              type="button"
              onClick={startNewGame}
              className="min-w-56 max-w-full cursor-pointer rounded-lg bg-white px-8 py-3 text-[0.95rem] font-semibold tracking-[0.16em] text-navy-900"
            >
              PLAY AGAIN
            </button>
          </div>

          <div className={`${resultPanels[1].cellOrder} flex w-full min-w-0 max-w-full justify-center`}>
            <PickPanel
              title={resultPanels[1].title}
              move={resultPanels[1].move}
              highlightWinner={resultPanels[1].highlightWinner}
            />
          </div>
        </div>
      </div>
    );
  }

  if (gameState.phase === 'revealing' && gameState.playerPick) {
    return (
      <div className="flex w-full min-w-0 max-w-full flex-col items-center gap-14 md:grid md:grid-cols-2 md:justify-items-center md:gap-12 lg:gap-16">
        <PickPanel title="YOU PICKED" move={gameState.playerPick} />
        <PickPanel title="THE HOUSE PICKED" waiting />
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
