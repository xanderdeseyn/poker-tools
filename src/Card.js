import Suit from './Suit';
import Rank from './Rank';

export default class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  getRank() { return this.rank; }
  getSuit() { return this.suit; }

  equals(c) {
    return (this.getRank() === c.getRank() && this.getSuit() === c.getSuit());
  }

  static fromString(s) {
    const tmp = s.replace(/[^a-z0-9]/gi, '');
    if (tmp.length !== 2) {
      throw new Error(`Invalid card: ${tmp}`);
    }
    return new Card(Rank.fromString(tmp[0].toLowerCase()), Suit.fromString(tmp[1].toLowerCase()));
  }

  toString(suit = true, full, plural) {
    if (full) {
      if (plural) {
        return Rank.names[this.rank].plural;
      }
      return Rank.names[this.rank].singular;
    }
    let s = `${this.rank}`;
    if (this.rank === 10) {
      s = 'T';
    }
    else if (this.rank === 11) {
      s = 'J';
    }
    else if (this.rank === 12) {
      s = 'Q';
    }
    else if (this.rank === 13) {
      s = 'K';
    }
    else if (this.rank === 14) {
      s = 'A';
    }
    if (suit) {
      if (this.suit === Suit.CLUB) {
        s += 'c';
      }
      else if (this.suit === Suit.DIAMOND) {
        s += 'd';
      }
      else if (this.suit === Suit.HEART) {
        s += 'h';
      }
      else if (this.suit === Suit.SPADE) {
        s += 's';
      }
    }
    return s;
  }
}
