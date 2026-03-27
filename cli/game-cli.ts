#!/usr/bin/env node

import * as readline from 'readline';
import { MoveType } from '../modules/shifumi/domain/entities/move.entity';
import { createShifumiModule, type ShifumiModule } from '../modules/shifumi/shifumi.module';

class RockPaperScissorsGame {
  private rl: readline.Interface;
  private shifumiModule: ShifumiModule;
  private currentGameId?: string;
  private playerId?: string;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    this.shifumiModule = createShifumiModule();
  }

  async start(): Promise<void> {
    this.showWelcome();
    this.showRules();
    await this.gameLoop();
  }

  private showWelcome(): void {
    console.log('\n🎮 Welcome to Rock Paper Scissors! 🎮');
    console.log('=====================================\n');
  }

  private showRules(): void {
    console.log('📋 Rules:');
    console.log('• Paper beats Rock');
    console.log('• Rock beats Scissors');
    console.log('• Scissors beats Paper');
    console.log('• Win: +1 point, Loss: -1 point, Draw: 0 points\n');
  }

  private async gameLoop(): Promise<void> {
    let playAgain = true;

    while (playAgain) {
      await this.playRound();
      await this.showScore();
      playAgain = await this.askPlayAgain();
    }

    await this.showFinalScore();
    this.rl.close();
  }

  private async playRound(): Promise<void> {
    console.log('\n🎯 New Round!');
    console.log('=============');

    try {
      // Start new game if needed
      if (!this.currentGameId) {
        const startResult = await this.shifumiModule.startGame.execute({
          playerName: 'Player',
          playerId: this.playerId
        });
        this.currentGameId = startResult.gameId;
        this.playerId = startResult.playerId;
      } else {
        // Start a new game for each round
        const startResult = await this.shifumiModule.startGame.execute({
          playerName: 'Player',
          playerId: this.playerId
        });
        this.currentGameId = startResult.gameId;
      }

      // Get player move
      const playerMoveString = await this.getPlayerMove();

      // Play the round through use case
      const result = await this.shifumiModule.playRound.execute({
        gameId: this.currentGameId,
        humanMove: playerMoveString
      });

      // Show results
      this.showRoundResult(result);

    } catch (error) {
      console.log('❌ Error playing round:', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private async getPlayerMove(): Promise<string> {
    return new Promise((resolve) => {
      const askMove = () => {
        this.rl.question(
          '\n🤔 Choose your move:\n' +
          '1. Rock 🪨\n' +
          '2. Paper 📄\n' +
          '3. Scissors ✂️\n' +
          '\nEnter your choice (1-3 or rock/paper/scissors): ',
          (answer) => {
            try {
              const moveString = this.parsePlayerInput(answer.trim());
              resolve(moveString);
            } catch (error) {
              console.log('❌ Invalid choice! Please try again.');
              askMove();
            }
          }
        );
      };
      askMove();
    });
  }

  private parsePlayerInput(input: string): string {
    const normalized = input.toLowerCase();
    
    // Handle numeric input
    if (normalized === '1') {
      return 'rock';
    }
    if (normalized === '2') {
      return 'paper';
    }
    if (normalized === '3') {
      return 'scissors';
    }

    // Handle text input
    if (['rock', 'paper', 'scissors'].includes(normalized)) {
      return normalized;
    }

    throw new Error('Invalid input');
  }

  private showRoundResult(result: any): void {
    console.log('\n📊 Round Result:');
    console.log('================');
    console.log(`👤 You played: ${this.getMoveEmojiFromString(result.humanMove)} ${this.capitalizeFirst(result.humanMove)}`);
    console.log(`🤖 Computer played: ${this.getMoveEmojiFromString(result.computerMove)} ${this.capitalizeFirst(result.computerMove)}`);
    console.log('');

    if (result.result === 'win') {
      console.log('🎉 YOU WIN! ' + result.message);
    } else if (result.result === 'loss') {
      console.log('😞 YOU LOSE! ' + result.message);
    } else {
      console.log('🤝 IT\'S A DRAW! ' + result.message);
    }
  }

  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private getMoveEmojiFromString(move: string): string {
    switch (move.toLowerCase()) {
      case 'rock':
        return '🪨';
      case 'paper':
        return '📄';
      case 'scissors':
        return '✂️';
      default:
        return '❓';
    }
  }

  private async showScore(): Promise<void> {
    if (!this.playerId) return;

    try {
      const scoreResult = await this.shifumiModule.getPlayerScore.execute({
        playerId: this.playerId
      });

      console.log('\n📈 Current Score:');
      console.log('=================');
      
      if (scoreResult.isPositive) {
        console.log(`🏆 You: ${scoreResult.score} (You're winning!)`);
      } else if (scoreResult.isNegative) {
        console.log(`😔 You: ${scoreResult.score} (You're behind)`);
      } else {
        console.log(`⚖️ You: ${scoreResult.score} (It's tied!)`);
      }
    } catch (error) {
      console.log('❌ Error getting score:', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private async askPlayAgain(): Promise<boolean> {
    return new Promise((resolve) => {
      this.rl.question(
        '\n🎮 Play another round? (y/n): ',
        (answer) => {
          const normalized = answer.trim().toLowerCase();
          resolve(normalized === 'y' || normalized === 'yes');
        }
      );
    });
  }

  private async showFinalScore(): Promise<void> {
    if (!this.playerId) {
      console.log('\nThanks for playing Rock Paper Scissors! 👋\n');
      return;
    }

    try {
      const scoreResult = await this.shifumiModule.getPlayerScore.execute({
        playerId: this.playerId
      });

      console.log('\n🏁 Game Over!');
      console.log('==============');
      
      if (scoreResult.isPositive) {
        console.log(`🎊 Congratulations! Final Score: ${scoreResult.score}`);
        console.log('You dominated the computer! 🏆');
      } else if (scoreResult.isNegative) {
        console.log(`😅 Final Score: ${scoreResult.score}`);
        console.log('Better luck next time! The computer got you this time.');
      } else {
        console.log(`🤝 Final Score: ${scoreResult.score}`);
        console.log('Perfect tie! You and the computer are evenly matched.');
      }
      
      console.log('\nThanks for playing Rock Paper Scissors! 👋\n');
    } catch (error) {
      console.log('❌ Error getting final score:', error instanceof Error ? error.message : 'Unknown error');
      console.log('\nThanks for playing Rock Paper Scissors! 👋\n');
    }
  }
}

// Main execution
async function main() {
  try {
    const game = new RockPaperScissorsGame();
    await game.start();
  } catch (error) {
    console.error('❌ Game error:', error);
    process.exit(1);
  }
}

// Run the game if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { RockPaperScissorsGame };