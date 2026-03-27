#!/usr/bin/env tsx

// Simple runner script for the CLI game
import { RockPaperScissorsGame } from './game-cli.js';

async function runGame() {
  const game = new RockPaperScissorsGame();
  await game.start();
}

runGame().catch(console.error);