#!/usr/bin/env tsx

// Demo script to showcase the domain logic without interactive input
import { Game } from '../modules/shifumi/domain/entities/game.entity';
import { Move, MoveType } from '../modules/shifumi/domain/entities/move.entity';
import { Player } from '../modules/shifumi/domain/entities/player.entity';
import { Score } from '../modules/shifumi/domain/entities/score.entity';

function getMoveEmoji(move: Move): string {
  switch (move.type) {
    case MoveType.ROCK:
      return '🪨';
    case MoveType.PAPER:
      return '📄';
    case MoveType.SCISSORS:
      return '✂️';
    default:
      return '❓';
  }
}

function playDemo() {
  console.log('\n🎮 Rock Paper Scissors - Domain Demo 🎮');
  console.log('========================================\n');

  const humanPlayer = Player.createHuman('Alice');
  const computerPlayer = Player.createComputer('HAL');
  let playerScore = Score.zero(humanPlayer.id.value);

  console.log('📋 Classic Rules:');
  console.log('• Paper beats Rock');
  console.log('• Rock beats Scissors');
  console.log('• Scissors beats Paper\n');

  // Demo scenarios
  const scenarios = [
    { human: Move.rock(), computer: Move.scissors(), description: 'Rock vs Scissors' },
    { human: Move.paper(), computer: Move.rock(), description: 'Paper vs Rock' },
    { human: Move.scissors(), computer: Move.paper(), description: 'Scissors vs Paper' },
    { human: Move.rock(), computer: Move.rock(), description: 'Rock vs Rock (Draw)' },
    { human: Move.scissors(), computer: Move.rock(), description: 'Scissors vs Rock (Loss)' }
  ];

  scenarios.forEach((scenario, index) => {
    console.log(`🎯 Round ${index + 1}: ${scenario.description}`);
    console.log('='.repeat(30));

    // Create and play game
    const game = Game.create({ humanPlayer, computerPlayer });
    game.makeHumanMove(scenario.human);
    game.makeComputerMove(scenario.computer);

    // Show moves
    console.log(`👤 ${humanPlayer.name}: ${getMoveEmoji(scenario.human)} ${scenario.human.getDisplayName()}`);
    console.log(`🤖 ${computerPlayer.name}: ${getMoveEmoji(scenario.computer)} ${scenario.computer.getDisplayName()}`);

    // Show result
    const result = game.getResult();
    if (result.isWin()) {
      console.log('🎉 HUMAN WINS! ' + result.message);
    } else if (result.isLoss()) {
      console.log('🤖 COMPUTER WINS! ' + result.message);
    } else {
      console.log('🤝 DRAW! ' + result.message);
    }

    // Update score
    playerScore = playerScore.applyChange(result.getScoreChange());
    console.log(`📊 Score: ${playerScore.value}\n`);
  });

  // Final summary
  console.log('🏁 Demo Complete!');
  console.log('==================');
  if (playerScore.isPositive()) {
    console.log(`🏆 Human wins overall with score: ${playerScore.value}`);
  } else if (playerScore.isNegative()) {
    console.log(`🤖 Computer wins overall with score: ${Math.abs(playerScore.value)}`);
  } else {
    console.log(`🤝 Perfect tie! Final score: ${playerScore.value}`);
  }

  console.log('\n✅ Domain entities working perfectly!');
  console.log('🎯 Ready for use cases and infrastructure layers.\n');
}

// Run demo
playDemo();