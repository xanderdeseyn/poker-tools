import _ from 'lodash';
import Rank from './Rank';
import CardGroup from './CardGroup';

export default class HandRank {
  constructor(rank, highcards) {
    this.rank = rank;
    this.highcards = highcards;
  }

  getHighCards() { return this.highcards; }
  getRank() { return this.rank; }

  compareTo(handrank) {
    if (this.getRank() === handrank.getRank()) {
      for (let i = 0; i < 5; i++) {
        if (this.getHighCards().getCard(i).getRank() !== handrank.getHighCards().getCard(i).getRank()) {
          return this.getHighCards().getCard(i).getRank() > handrank.getHighCards().getCard(i).getRank() ? 1 : -1;
        }
      }
      return 0;
    }
    return this.getRank() > handrank.getRank() ? 1 : -1;
  }

  static evaluate(cardgroup) {
    cardgroup.sortCards('desc');
    // Group card by ranks
    const countByRanks = cardgroup.countBy('rank');
    const quadRanks = [];
    const tripRanks = [];
    const pairRanks = [];
    let straightCardsCount = 0;
    let straightMaxCardRank = 0;
    let straightLastCardRank = 0;
    const allRanks = Object.keys(countByRanks).reverse();
    for (const rank of allRanks) {
      if (countByRanks[rank] === 2) {
        pairRanks.push(Number(rank));
      }
      else if (countByRanks[rank] === 3) {
        tripRanks.push(Number(rank));
      }
      else if (countByRanks[rank] === 4) {
        quadRanks.push(Number(rank));
      }
      if (straightCardsCount !== 5) {
        if (straightLastCardRank === 0 || straightLastCardRank - 1 !== Number(rank)) {
          straightMaxCardRank = straightLastCardRank = Number(rank);
          straightCardsCount = 1;
        }
        else {
          straightCardsCount += 1;
          straightLastCardRank = Number(rank);
        }
      }
    }
    // Group card by suit
    const countBySuits = cardgroup.countBy('suit');
    let flushSuit = 0;
    for (const suit in countBySuits) {
      if (countBySuits[suit] >= 5) {
        flushSuit = Number(suit);
        break;
      }
    }
    // Straight flush
    if (flushSuit > 0) {
      if (straightCardsCount >= 5) {
        const straightFlushCards = _.filter(cardgroup.getCards(), (card) => {
          return card.getSuit() === flushSuit && card.getRank() <= straightMaxCardRank;
        });
        if (straightFlushCards.length >= 5) {
          let isStraightFlush = true;
          for (let i = 1; i <= 4; i++) {
            if (straightFlushCards[i].getRank() != straightFlushCards[i - 1].getRank() - 1) {
              isStraightFlush = false;
              break;
            }
          }
          if (isStraightFlush) {
            return new HandRank(HandRank.STRAIGHT_FLUSH, new CardGroup(straightFlushCards.slice(0, 5)));
          }
        }
        else if (straightFlushCards.length === 4 && straightFlushCards[0].getRank() === Rank.FIVE) {
          const aceCards = _.filter(cardgroup.getCards(), (card) => {
            return card.getSuit() === flushSuit && card.getRank() === Rank.ACE;
          });
          if (aceCards.length) {
            return new HandRank(HandRank.STRAIGHT_FLUSH, new CardGroup(straightFlushCards.concat(aceCards[0])));
          }
        }
      }
      else if (straightCardsCount === 4 && straightMaxCardRank === Rank.FIVE) {
        // Five high straight flush (5-4-3-2-A)
        const aceCards = _.filter(cardgroup.getCards(), (card) => {
          return card.getSuit() === flushSuit && card.getRank() === Rank.ACE;
        });
        if (aceCards.length > 0) {
          const straightFlushCards = _.filter(cardgroup.getCards(), (card) => {
            return card.getSuit() === flushSuit && card.getRank() <= straightMaxCardRank;
          });
          if (straightFlushCards.length === 4) {
            return new HandRank(HandRank.STRAIGHT_FLUSH, new CardGroup(straightFlushCards.concat(aceCards[0]).slice(0, 5)));
          }
        }
      }
    }
    // Quads
    if (quadRanks.length == 1) {
      const quadCards = _.filter(cardgroup.getCards(), { rank: quadRanks[0] });
      const cards = _.reject(cardgroup.getCards(), { rank: quadRanks[0] });
      return new HandRank(HandRank.QUADS, new CardGroup(quadCards.concat(cards).slice(0, 5)));
    }
    // Full house
    if (tripRanks.length == 1 && pairRanks.length >= 1) {
      const tripCards = _.filter(cardgroup.getCards(), { rank: tripRanks[0] });
      const pairCards = _.filter(cardgroup.getCards(), { rank: pairRanks[0] });
      return new HandRank(HandRank.FULL_HOUSE, new CardGroup(tripCards.concat(pairCards)));
    }
    else if (tripRanks.length > 1) {
      const tripCards = _.filter(cardgroup.getCards(), { rank: tripRanks[0] });
      const pairCards = _.filter(cardgroup.getCards(), { rank: tripRanks[1] });
      return new HandRank(HandRank.FULL_HOUSE, new CardGroup(tripCards.concat(pairCards.slice(0, 2))));
    }
    // Flush
    if (flushSuit > 0) {
      const flushCards = _.filter(cardgroup.getCards(), { suit: flushSuit });
      return new HandRank(HandRank.FLUSH, new CardGroup(flushCards.slice(0, 5)));
    }
    // Straight
    if (straightCardsCount === 5) {
      const straightCards = _.uniqWith(_.filter(cardgroup.getCards(), (card) => {
        return card.getRank() <= straightMaxCardRank;
      }), (c1, c2) => {
        return c1.getRank() === c2.getRank();
      });
      return new HandRank(HandRank.STRAIGHT, new CardGroup(straightCards.slice(0, 5)));
    }
    else if (straightCardsCount === 4 && straightMaxCardRank === Rank.FIVE) {
      // Five high straight (5-4-3-2-A)
      const aceCards = _.filter(cardgroup.getCards(), (card) => {
        return card.getRank() === Rank.ACE;
      });
      if (aceCards.length > 0) {
        const straightCards = _.uniqWith(_.filter(cardgroup.getCards(), (card) => {
          return card.getRank() <= straightMaxCardRank;
        }), (c1, c2) => {
          return c1.getRank() === c2.getRank();
        });
        return new HandRank(HandRank.STRAIGHT, new CardGroup(straightCards.concat(aceCards[0]).slice(0, 5)));
      }
    }
    // Trips
    if (tripRanks.length == 1) {
      const tripCards = _.filter(cardgroup.getCards(), { rank: tripRanks[0] });
      const cards = _.reject(cardgroup.getCards(), { rank: tripRanks[0] });
      return new HandRank(HandRank.TRIPS, new CardGroup(tripCards.concat(cards).slice(0, 5)));
    }
    // Two pairs
    if (pairRanks.length >= 2) {
      const pairedHigherCards = _.filter(cardgroup.getCards(), { rank: pairRanks[0] });
      const pairedLowerCards = _.filter(cardgroup.getCards(), { rank: pairRanks[1] });
      const unpairedCards = _.reject(_.reject(cardgroup.getCards(), { rank: pairRanks[0] }), { rank: pairRanks[1] });
      return new HandRank(HandRank.TWO_PAIRS, new CardGroup(pairedHigherCards.concat(pairedLowerCards).concat(unpairedCards).slice(0, 5)));
    }
    // One pair
    if (pairRanks.length == 1) {
      const pairedCards = _.filter(cardgroup.getCards(), { rank: pairRanks[0] });
      const unpairedCards = _.reject(cardgroup.getCards(), { rank: pairRanks[0] });
      return new HandRank(HandRank.PAIR, new CardGroup(pairedCards.concat(unpairedCards).slice(0, 5)));
    }
    // High card
    return new HandRank(HandRank.HIGH_CARD, new CardGroup(cardgroup.getCards().slice(0, 5)));
  }
  toString() {
    let showHighcards = 0;
    let s = '';
    switch (this.rank) {
      case HandRank.STRAIGHT_FLUSH:
        if (this.highcards.getCard(0).getRank() === Rank.ACE) {
          s = 'Royal flush';
        }
        else {
          s = _.capitalize(this.highcards.getCard(0).toString(false, true)) + ' high straight flush';
        }
        break;
      case HandRank.QUADS:
        s = 'Quad ' + this.highcards.getCard(0).toString(false, true, true);
        showHighcards = 1;
        break;
      case HandRank.FULL_HOUSE:
        s = `Full house: ${this.highcards.getCard(0).toString(false, true, true)} full of ${this.highcards.getCard(4).toString(false, true, true)}`;
        break;
      case HandRank.FLUSH:
        s = _.capitalize(this.highcards.getCard(0).toString(false, true)) + ' high flush';
        break;
      case HandRank.STRAIGHT:
        s = _.capitalize(this.highcards.getCard(0).toString(false, true)) + ' high straight';
        break;
      case HandRank.TRIPS:
        s = `Trip ${this.highcards.getCard(0).toString(false, true, true)}`;
        showHighcards = 2;
        break;
      case HandRank.TWO_PAIRS:
        s = `Two pairs: ${this.highcards.getCard(0).toString(false, true, true)} and ${this.highcards.getCard(2).toString(false, true, true)}`;
        showHighcards = 1;
        break;
      case HandRank.PAIR:
        s = `Pair of ${this.highcards.getCard(0).toString(false, true, true)}`;
        showHighcards = 3;
        break;
      default:
        s = 'High card';
        showHighcards = 5;
        break;
    }
    if (showHighcards > 0) {
      const highcards = this.highcards.getCards().slice(5 - showHighcards, 5).map((h) => {
        return h.toString(false);
      });
      s = s + ` (${highcards.join(',')} high)`;
    }
    return s;
  }
}

HandRank.HIGH_CARD = 1;
HandRank.PAIR = 2;
HandRank.TWO_PAIRS = 3;
HandRank.TRIPS = 4;
HandRank.STRAIGHT = 5;
HandRank.FLUSH = 6;
HandRank.FULL_HOUSE = 7;
HandRank.QUADS = 8;
HandRank.STRAIGHT_FLUSH = 9;
