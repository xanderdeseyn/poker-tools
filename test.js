import { CardGroup, OddsCalculator } from './index';

const player1Cards = CardGroup.fromString('JhJs');
const player2Cards = CardGroup.fromString('JdJc');
const board = CardGroup.fromString('7s9sTsAs');

const result = OddsCalculator.calculateWinner([player1Cards, player2Cards], board);

// console.log(`Player #1 - ${player1Cards} - ${result.equities[0].getEquity()}%`);
// console.log(`Player #2 - ${player2Cards} - ${result.equities[1].getEquity()}%`);