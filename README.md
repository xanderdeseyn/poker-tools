# poker-tools

This library is a fork of the excellent [poker-odds-calculator](https://github.com/rundef/node-poker-odds-calculator) library by rundef.

The changes are:

1. Converted to ES6 from TypeScript.
2. Removed the Array subclassing since this is not yet widely supported.
3. Exposed another utility function `calculateWinner([cardgroups], board)`.

Example code:

```js
import { CardGroup, OddsCalculator } from './index';

const player1Cards = CardGroup.fromString('JhJs');
const player2Cards = CardGroup.fromString('JdQc');
const board = CardGroup.fromString('7s9sTs');
const board2 = CardGroup.fromString('7s9sTdQs3d');

const result = OddsCalculator.calculateEquity([player1Cards, player2Cards], board);

console.log(`Player #1 - ${player1Cards} - ${result.equities[0].getEquity()}%`);
console.log(`Player #2 - ${player2Cards} - ${result.equities[1].getEquity()}%`);
console.log(`Tie - ${player2Cards} - ${result.equities[1].getTiePercentage()}%`);

const winner = OddsCalculator.calculateWinner([player1Cards, player2Cards], board);
const winner2 = OddsCalculator.calculateWinner([player1Cards, player2Cards], board2);

console.log(winner);
console.log(winner2);
```

Output:
```
Player #1 - Jh Js - 75%
Player #2 - Jd Qc - 24%
[ 0 ]
[ 1 ]
```

Note that `calculateWinner` returns an array because there might be multiple winners (tie).

