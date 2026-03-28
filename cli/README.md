# 🎮 Rock Paper Scissors CLI

Terminal-based Rock Paper Scissors game showcasing clean domain architecture.

## 🚀 Quick Start

```bash
cd shifumi
pnpm install
```

## 🎯 Available Commands

### Interactive Game
```bash
pnpm game
```
Play Rock Paper Scissors against the computer in your terminal!

### Domain Demo
```bash
pnpm game:demo
```
Watch a scripted demonstration of the domain logic in action.

### Run Tests
```bash
pnpm test modules/shifumi
```
Run the domain entity tests.

## 🎮 How to Play

1. **Choose your move**: Enter `1` (Rock), `2` (Paper), `3` (Scissors)
2. **Alternative input**: Type `rock`, `paper`, or `scissors`
3. **Computer responds**: Automatically makes a random move
4. **See results**: Win (+1), Loss (-1), Draw (0)
5. **Track score**: Persistent scoring across rounds
6. **Play again**: Choose to continue or quit

## 🏗️ Architecture Showcase

This CLI demonstrates:

✅ **Pure Domain Logic**
- `Move` entity with game rules
- `Game` aggregate managing state
- `Player` and `Score` value objects
- Rich domain behavior

✅ **Clean Architecture**
- Domain entities independent of UI
- No framework dependencies
- Testable business logic
- Clear separation of concerns

✅ **Domain-Driven Design**
- Aggregate roots (`Game`)
- Value objects (`Move`, `Score`)
- Domain services and rules
- Ubiquitous language

## 📊 Game Rules

**Classic Mode (Current)**
- Paper beats Rock 📄 > 🪨
- Rock beats Scissors 🪨 > ✂️
- Scissors beats Paper ✂️ > 📄

**Scoring**
- Win: +1 point 🎉
- Loss: -1 point 😞
- Draw: 0 points 🤝

## 🧪 Testing

The domain is fully tested with Jest:

```bash
# Run all shifumi tests
pnpm test modules/shifumi

# Run specific entity tests
pnpm test modules/shifumi/domain/entities/game.entity.test.ts

# Watch mode for development
pnpm test --watch modules/shifumi
```

## 🎯 Next Steps

This CLI proves the domain works independently. Ready to:
1. ✅ Domain entities (Complete)
2. 🔄 Use cases layer (Next)
3. 🔄 Infrastructure layer
4. 🔄 Web UI integration
5. 🔄 Bonus mode (Lizard, Spock)

The clean architecture means the same domain logic will work seamlessly in:
- 🖥️ Terminal CLI (This!)
- 🌐 Next.js web app
- 📱 React Native mobile
- 🤖 Discord bot
- 📡 REST API

**Domain-first development FTW!** 🚀