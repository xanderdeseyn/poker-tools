import { expect } from 'chai';
import CardGroup from '../src/CardGroup';
import Rank from '../src/Rank';
import Suit from '../src/Suit';

describe('CardGroup', () => {
  describe('fromString()', () => {
    it('parses correctly', () => {
      let cardgroup = CardGroup.fromString('Jh');
      expect(cardgroup.length()).to.equal(1);
      expect(cardgroup.length()).to.equal(1);

      expect(cardgroup.getCard(0).getRank()).to.equal(Rank.JACK);
      expect(cardgroup.getCard(0).getSuit()).to.equal(Suit.HEART);

      cardgroup = CardGroup.fromString('Jh As 3c');
      expect(cardgroup.length()).to.equal(3);

      expect(cardgroup.getCard(0).getRank()).to.equal(Rank.JACK);
      expect(cardgroup.getCard(0).getSuit()).to.equal(Suit.HEART);

      expect(cardgroup.getCard(1).getRank()).to.equal(Rank.ACE);
      expect(cardgroup.getCard(1).getSuit()).to.equal(Suit.SPADE);

      expect(cardgroup.getCard(2).getRank()).to.equal(Rank.THREE);
      expect(cardgroup.getCard(2).getSuit()).to.equal(Suit.CLUB);
    });

    it('throws exception', () => {
      expect(CardGroup.fromString.bind(null, 'Jhh')).to.throw(Error, 'Invalid cards: Jhh');
    });
  });

  describe('toString()', () => {
    it('formats correctly', () => {
      const strings = [
        'Ac 4d Th', 'Jh Qs'
      ];
      for (const s of strings) {
        expect(CardGroup.fromString(s).toString()).to.equal(s);
      }
    });
  });

  describe('sort()', () => {
    it('sorts asc correctly', () => {
      const cardgroup = CardGroup.fromString('Ac 3d 5s 5h');
      cardgroup.sortCards('asc');

      expect(cardgroup.getCard(0).getRank()).to.equal(Rank.THREE);
      expect(cardgroup.getCard(0).getSuit()).to.equal(Suit.DIAMOND);

      expect(cardgroup.getCard(1).getRank()).to.equal(Rank.FIVE);

      expect(cardgroup.getCard(2).getRank()).to.equal(Rank.FIVE);

      expect(cardgroup.getCard(3).getRank()).to.equal(Rank.ACE);
      expect(cardgroup.getCard(3).getSuit()).to.equal(Suit.CLUB);
    });

    it('sorts desc correctly', () => {
      const cardgroup = CardGroup.fromString('Ac 3d 5s 5h');
      cardgroup.sortCards('desc');

      expect(cardgroup.getCard(0).getRank()).to.equal(Rank.ACE);
      expect(cardgroup.getCard(0).getSuit()).to.equal(Suit.CLUB);

      expect(cardgroup.getCard(1).getRank()).to.equal(Rank.FIVE);

      expect(cardgroup.getCard(2).getRank()).to.equal(Rank.FIVE);

      expect(cardgroup.getCard(3).getRank()).to.equal(Rank.THREE);
      expect(cardgroup.getCard(3).getSuit()).to.equal(Suit.DIAMOND);
    });
  });
});