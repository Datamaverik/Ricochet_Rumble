# [Ricochet Rumble](https://datamaverik.github.io/Delta-Task-1/)

Ricochet Rumble is an exciting two-player, turn-based board game designed to be more engaging than traditional chess. It features various pieces with unique abilities and combines strategy with dynamic gameplay.

## Table of Contents

- [Ricochet Rumble](#ricochet-rumble)
  - [Table of Contents](#table-of-contents)
  - [Game Logic](#game-logic)
    - [Movement and Rotation](#movement-and-rotation)
    - [Objective](#objective)
  - [Power Ups](#power-ups)
    - [Set-Trap](#set-trap)
    - [Teleportation](#teleportation)
    - [Add Ricochet](#add-ricochet)
    - [Add Semi-Ricochet](#add-semi-ricochet)
## Game Logic

Ricochet Rumble is played on an 8x8 board with the following pieces:

- **Titan**
- **Tank**
- **Ricochets**
- **Semi Ricochets**
- **Cannon**

### Movement and Rotation

- Any piece can move one tile in any direction (horizontal, vertical, or diagonal) or rotate once per turn.
  
- The cannon can only move horizontally and is initially positioned in the base rank.

### Objective

The goal is to destroy the opponent’s Titan by shooting a bullet through a series of Ricochets.

## Power Ups
The Power ups can be accessed through the shop which is enabled when enough energy stars are picked up.

At the beginning of the game 4 energy stars will be available to be picked up. The energy stars keep reappearing at random intervals of time as the game progresses

### <u>Set-Trap</u>

 This Power up allows the player to set a hidden trap in any empty tile in the game board. The player who sets up the trap is immune to these traps. 

 Once the opponent player piece steps on the tile with the trap, it'll get destroyed.

 **Constraint:** The trap can't not be set on the extreme most rows to safeguard the cannon.

### <u>Teleportation</u>

This Power up allows the player to teleport any of its piece to any empty tile on the game board.

### <u>Add Ricochet</u>

This Power up allows the player to add another Ricochet to the game board to any empty tile.

**Constraint:** Unlike the above two Power ups which can be activated any number of times, this Power up can only be activated once. 

### <u>Add Semi-Ricochet</u>

This Power up allows the player to add another Semi-Ricochet to the game board to any empty tile.

**Constraint:** It can also be activated only once by each  player.



 **[Click to play](https://datamaverik.github.io/Delta-Task-1/)**