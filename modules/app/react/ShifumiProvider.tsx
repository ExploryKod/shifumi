"use client";
import React, { createContext, useContext, ReactNode } from 'react';
import { createShifumiModule, type ShifumiModule } from '@/modules/shifumi/shifumi.module';

// -----------------------------------------------------------------------------
// Context
// -----------------------------------------------------------------------------

const ShifumiContext = createContext<ShifumiModule | null>(null);

// -----------------------------------------------------------------------------
// Provider
// -----------------------------------------------------------------------------

export const ShifumiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const shifumiModule = React.useMemo(() => createShifumiModule(), []);

  return (
    <ShifumiContext.Provider value={shifumiModule}>
      {children}
    </ShifumiContext.Provider>
  );
};

// -----------------------------------------------------------------------------
// Hooks
// -----------------------------------------------------------------------------

export const useShifumi = (): ShifumiModule => {
  const context = useContext(ShifumiContext);

  if (!context) {
    throw new Error('useShifumi must be used within a ShifumiProvider');
  }

  return context;
};

export const useStartGame = () => {
  const shifumi = useShifumi();
  return shifumi.startGame;
};

export const usePlayRound = () => {
  const shifumi = useShifumi();
  return shifumi.playRound;
};

export const useGetPlayerScore = () => {
  const shifumi = useShifumi();
  return shifumi.getPlayerScore;
};
