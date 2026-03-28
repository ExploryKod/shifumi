"use client";
import React from "react";
import { ShifumiProvider } from "@modules/app/react/ShifumiProvider";
import { GameStateProvider } from "@modules/app/react/GameStateProvider";
import { ThemeProvider } from "@modules/app/react/ThemeProvider";
import { Header } from "@modules/app/react/layout/Header";

export const AppWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ShifumiProvider>
      <GameStateProvider>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          <Header />
          {children}
        </ThemeProvider>
      </GameStateProvider>
    </ShifumiProvider>
  );
};
