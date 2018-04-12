export default class Suit {
  static all() {
    return [Suit.CLUB, Suit.DIAMOND, Suit.HEART, Suit.SPADE];
  }
  static fromString(s) {
    switch (s) {
      case 'c':
        return Suit.CLUB;
      case 'd':
        return Suit.DIAMOND;
      case 'h':
        return Suit.HEART;
      case 's':
        return Suit.SPADE;
      default:
        throw new Error(`Invalid card suit: ${s}`);
    }
  }
}

Suit.CLUB = 1;
Suit.DIAMOND = 2;
Suit.HEART = 3;
Suit.SPADE = 4;
