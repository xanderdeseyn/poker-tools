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