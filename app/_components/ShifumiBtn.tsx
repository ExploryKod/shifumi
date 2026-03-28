import Image from "next/image";
import { MoveType } from "@modules/shifumi/domain/entities/move.entity";
import { useGameState } from "@modules/app/react/GameStateProvider";
import { useMemo } from "react";

type ShifumiBtnProps = {
  move: MoveType;
  isResultDisplay?: boolean;
  onClick?: () => void;
  className?: string;
  highlightWinner?: boolean;
};

/** Fits inside the triangle board (`w-[min(92vw,28rem)]`); do not add `md:` upscaling here. */
export const SHIFUMI_TRIANGLE_MOVE_CLASSNAME =
  "size-[clamp(8rem,30vw,10.5rem)]";

/** Result / reveal rows: same size for both picks; wider on `md+` is OK outside the triangle. */
export const SHIFUMI_RESULT_MOVE_CLASSNAME =
  "size-[clamp(8rem,30vw,10.5rem)] md:size-[clamp(12rem,22vw,18rem)]";

export const ShifumiBtn = ({
  move,
  isResultDisplay = false,
  onClick,
  className = SHIFUMI_TRIANGLE_MOVE_CLASSNAME,
  highlightWinner = false,
}: ShifumiBtnProps) => {
  const { gameState, playMove } = useGameState();
  
  const moveInfo = useMemo(() => {
    const icons = {
      [MoveType.ROCK]: "/shifumi/icon-rock.svg",
      [MoveType.PAPER]: "/shifumi/icon-paper.svg",
      [MoveType.SCISSORS]: "/shifumi/icon-scissors.svg",
    };
    
    const colors = {
      [MoveType.ROCK]: "shadow-[0_0.5rem_0_hsl(347,75%,35%)]",
      [MoveType.PAPER]: "shadow-[0_0.5rem_0_hsl(229,64%,46%)]",
      [MoveType.SCISSORS]: "shadow-[0_0.5rem_0_hsl(28,76%,44%)]",
    };

    const bgColors = {
      [MoveType.ROCK]: { backgroundColor: "hsl(349, 71%, 52%)" },
      [MoveType.PAPER]: { backgroundColor: "hsl(230, 89%, 62%)" },
      [MoveType.SCISSORS]: { backgroundColor: "hsl(39, 89%, 49%)" },
    };
    
    return {
      icon: icons[move],
      shadowColor: colors[move],
      bgStyle: bgColors[move],
    };
  }, [move]);

  const handleClick = async () => {
    if (onClick) {
      onClick();
      return;
    }
    if (!isResultDisplay && !gameState.isLoading) {
      await playMove(move);
    }
  };

  const buttonClasses = `
    ${className}
    relative cursor-pointer rounded-full ${moveInfo.shadowColor}
    flex items-center justify-center
    transition-transform duration-200
    disabled:cursor-pointer
    ${!isResultDisplay ? "hover:scale-105 active:scale-95" : ""}
    ${gameState.isLoading && !isResultDisplay ? "opacity-50" : ""}
  `;

  return (
    <button
      onClick={handleClick}
      disabled={isResultDisplay || gameState.isLoading}
      className={buttonClasses}
      style={moveInfo.bgStyle}
      aria-label={`${move} button`}
    >
      {highlightWinner && (
        <>
          <span
            className="pointer-events-none absolute inset-[-18%] rounded-full bg-white/4"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute inset-[-36%] rounded-full bg-white/3"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute inset-[-54%] rounded-full bg-white/2"
            aria-hidden="true"
          />
        </>
      )}
      <div className="flex size-[76%] items-center justify-center rounded-full bg-white shadow-[inset_0_0.35rem_0_rgba(0,0,0,0.08)]">
        <Image
          src={moveInfo.icon}
          alt={move}
          width={64}
          height={64}
          className="h-[42%] w-[42%] object-contain"
        />
      </div>
    </button>
  );
};