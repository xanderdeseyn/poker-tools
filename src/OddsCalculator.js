import Card from './Card';
import Rank from './Rank';
import Suit from './Suit';
import CardGroup from './CardGroup';
import HandRank from './HandRank';
import HandEquity from './HandEquity';
import _ from 'lodash';

export default class OddsCalculator {
  constructor(equities, handranks, iterations, elapsedTime) {
    this.equities = equities;
    this.handranks = handranks;
    this.iterations = iterations;
    this.elapsedTime = elapsedTime;
  }

  getIterationCount() { return this.iterations; }
  getElapsedTime() { return this.elapsedTime; }

  static calculateWinner(cardgroups, board) {
    const handranks = cardgroups.map((cardgroup) => { return HandRank.evaluate(board ? cardgroup.concat(board) : cardgroup); });

    let highestRanking = null;
    let highestRankingIndex = [];
    for (let i = 0; i < cardgroups.length; i++) {
      const handranking = HandRank.evaluate(cardgroups[i].concat(board));
      const isBetter = highestRanking ? handranking.compareTo(highestRanking) : -1;

      if (highestRanking === null || isBetter >= 0) {
        if (isBetter == 0)
          highestRankingIndex.push(i);
        else
          highestRankingIndex = [i];
        highestRanking = handranking;
      }
    }

    return { winner: highestRankingIndex, hands: highestRankingIndex.map(i => handranks[i].toString()) };
  }


  static calculateEquity(cardgroups, board, iterations) {
    if (board && [0, 3, 4, 5].indexOf(board.length()) === -1) {
      throw new Error('The board must contain 0, 3, 4 or 5 cards');
    }

    // Detect duplicate cards
    for (let i = 0; i < cardgroups.length; i++) {
      for (let j = i + 1; j < cardgroups.length; j++) {
        for (const card of cardgroups[j].getCards()) {
          if (cardgroups[i].containsCard(card)) {
            throw new Error('Detected duplicate cards');
          }
        }
      }
    }
    if (board && board.length()) {
      for (let i = 0; i < cardgroups.length; i++) {
        for (const card of cardgroups[i].getCards()) {
          if (board.containsCard(card)) {
            throw new Error('Detected duplicate cards');
          }
        }
      }
    }

    iterations = iterations || 0;
    let odds = [];
    let handranks = [];
    // Find out which cards are left in the deck
    let remainingCards = new CardGroup([]);
    if (!board || board.length() <= 4) {
      for (const suit of Suit.all()) {
        for (const rank of Rank.all()) {
          const c = new Card(rank, suit);
          let isUsed = false;
          if (board) {
            for (const boardCard of board.getCards()) {
              if (c.equals(boardCard)) {
                isUsed = true;
                break;
              }
            }
          }
          if (!isUsed) {
            for (const cardgroup of cardgroups) {
              for (const card of cardgroup.getCards()) {
                if (c.equals(card)) {
                  isUsed = true;
                  break;
                }
              }
              if (isUsed) {
                break;
              }
            }
          }
          if (!isUsed) {
            remainingCards.push(c);
          }
        }
      }
    }

    const remainingCount = remainingCards.length();
    // Figure out hand ranking
    handranks = cardgroups.map((cardgroup) => { return HandRank.evaluate(board ? cardgroup.concat(board) : cardgroup); });
    const equities = cardgroups.map((cardgroup) => { return new HandEquity(); });

    const selectWinners = function (simulatedBoard) {
      let highestRanking = null;
      let highestRankingIndex = [];
      for (let i = 0; i < cardgroups.length; i++) {
        const handranking = HandRank.evaluate(cardgroups[i].concat(simulatedBoard));
        const isBetter = highestRanking
          ? handranking.compareTo(highestRanking)
          : -1;
        if (highestRanking === null || isBetter >= 0) {
          if (isBetter == 0)
            highestRankingIndex.push(i);
          else
            highestRankingIndex = [i];
          highestRanking = handranking;
        }
      }
      for (let i = 0; i < cardgroups.length; i++) {
        let isWinning = false;
        let isTie = false;
        if (highestRankingIndex.length > 1) {
          isTie = (highestRankingIndex.indexOf(i) > -1);
        }
        else {
          isWinning = (highestRankingIndex.indexOf(i) > -1);
        }
        equities[i].addPossibility(isWinning, isTie);
      }
    };

    const jobStartedAt = +new Date();
    if (!board || board.length() === 0) {
      iterations = iterations || 100000;
      for (let x = iterations; x > 0; x--) {
        const index1 = _.random(0, remainingCount - 1);
        let index2, index3, index4, index5;
        do {
          index2 = _.random(0, remainingCount - 1);
        } while (index2 === index1);
        do {
          index3 = _.random(0, remainingCount - 1);
        } while (index3 === index1 || index3 === index2);
        do {
          index4 = _.random(0, remainingCount - 1);
        } while (index4 === index1 || index4 === index2 || index4 === index3);
        do {
          index5 = _.random(0, remainingCount - 1);
        } while (index5 === index1 || index5 === index2 || index5 === index3 || index5 === index4);
        const simulatedBoard = new CardGroup([
          remainingCards.getCard(index1),
          remainingCards.getCard(index2),
          remainingCards.getCard(index3),
          remainingCards.getCard(index4),
          remainingCards.getCard(index5),
        ]);
        selectWinners(simulatedBoard);
      }
    }
    else if (board.length() >= 5) {
      iterations = 1;
      selectWinners(board);
    }
    else if (board.length() === 4) {
      for (const c of remainingCards.getCards()) {
        const simulatedBoard = board.concat(new CardGroup([c]));
        iterations++;
        selectWinners(simulatedBoard);
      }
    }
    else if (board.length() === 3) {
      for (let a = 0; a < remainingCount; a++) {
        for (let b = a + 1; b < remainingCount; b++) {
          let highestRanking = null;
          let highestRankingIndex = -1;
          const simulatedBoard = board.concat(new CardGroup([remainingCards.getCard(a), remainingCards.getCard(b)]));
          iterations++;
          selectWinners(simulatedBoard);
        }
      }
    }
    const jobEndedAt = +new Date();
    return new OddsCalculator(equities, handranks, iterations, jobEndedAt - jobStartedAt);
  }
  getHandRank(index) {
    return this.handranks[index];
  }
}