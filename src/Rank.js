export default class Rank {
  static all() {
    return [
      Rank.TWO, Rank.THREE, Rank.FOUR, Rank.FIVE, Rank.SIX, Rank.SEVEN,
      Rank.EIGHT, Rank.NINE, Rank.TEN, Rank.JACK, Rank.QUEEN, Rank.KING, Rank.ACE
    ];
  }
  static fromString(s) {
    const n = Number(s);
    switch (s) {
      case 't':
        return Rank.TEN;
      case 'j':
        return Rank.JACK;
      case 'q':
        return Rank.QUEEN;
      case 'k':
        return Rank.KING;
      case 'a':
        return Rank.ACE;
      default:
        if (isNaN(n) || n < Rank.TWO || n > Rank.NINE) {
          throw new Error(`Invalid card rank: ${s}`);
        }
        return n;
    }
  }
}

Rank.TWO = 2;
Rank.THREE = 3;
Rank.FOUR = 4;
Rank.FIVE = 5;
Rank.SIX = 6;
Rank.SEVEN = 7;
Rank.EIGHT = 8;
Rank.NINE = 9;
Rank.TEN = 10;
Rank.JACK = 11;
Rank.QUEEN = 12;
Rank.KING = 13;
Rank.ACE = 14;
Rank.names = [
  null,
  null,
  { singular: 'deuce', plural: 'deuces' },
  { singular: 'three', plural: 'threes' },
  { singular: 'four', plural: 'fours' },
  { singular: 'five', plural: 'fives' },
  { singular: 'six', plural: 'sixes' },
  { singular: 'seven', plural: 'sevens' },
  { singular: 'eight', plural: 'eights' },
  { singular: 'nine', plural: 'nines' },
  { singular: 'ten', plural: 'tens' },
  { singular: 'jack', plural: 'jacks' },
  { singular: 'queen', plural: 'queens' },
  { singular: 'king', plural: 'kings' },
  { singular: 'ace', plural: 'aces' }
];
