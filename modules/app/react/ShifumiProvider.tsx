"use client";
import React, { createContext, useContext, ReactNode } from 'react';
import { createShifumiModule, type ShifumiModule } from '@/modules/shifumi/shifumi.module';

// Create the context
const ShifumiContext = createContext<ShifumiModule | null>(null);

// Provider component
export const ShifumiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Create the shifumi module instance (singleton pattern)
  const shifumiModule = React.useMemo(() => createShifumiModule(), []);

  return (
    <ShifumiContext.Provider value={shifumiModule}>
      {children}
    </ShifumiContext.Provider>
  );
};

// Hook to use the shifumi module
export const useShifumi = (): ShifumiModule => {
  const context = useContext(ShifumiContext);
  
  if (!context) {
    throw new Error('useShifumi must be used within a ShifumiProvider');
  }
  
  return context;
};

// Individual hooks for specific use cases (optional convenience)
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