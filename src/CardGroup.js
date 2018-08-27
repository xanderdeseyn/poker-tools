import _ from "lodash";
import Card from "./Card";

export default class CardGroup {
  constructor(cards) {
    this.cards = cards;
  }

  static fromString(s) {
    const tmp = s.replace(/[^a-z0-9]/gi, "");
    if (tmp.length % 2 !== 0) {
      throw new Error(`Invalid cards: ${s}`);
    }

    const cards = [];
    for (let i = 0; i < tmp.length; i += 2) {
      cards.push(Card.fromString(tmp.substring(i, i + 2)));
    }
    return new CardGroup(cards);
  }

  getCards() {
    return this.cards;
  }

  getCard(i) {
    return this.cards[i];
  }

  setCards(cards) {
    this.cards = cards;
  }

  length() {
    return this.cards.length;
  }

  push(v) {
    this.cards.push(v);
  }

  containsCard(c) {
    return this.cards.reduce((acc, card) => card.equals(c) || acc, false);
  }

  toString() {
    return this.cards.join(" ");
  }

  sortCards(type) {
    const sorted = _.orderBy(this.cards, ["rank", "suit"], [type, type]);
    this.cards.splice.apply(this.cards, [0, this.cards.length].concat(sorted));
  }

  concat(cardgroup) {
    return new CardGroup(this.cards.concat(cardgroup.getCards()));
  }

  countBy(type) {
    return _.countBy(this.cards, type);
  }
}
