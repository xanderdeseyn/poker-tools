import { expect } from "chai";
import CardGroup from "../src/CardGroup";
import Rank from "../src/Rank";
import HandRank from "../src/HandRank";

describe("HandRank", () => {
  it("detects royal flush", () => {
    let board = CardGroup.fromString("Ad,Ah,Qd,Td,9h");
    let hand = CardGroup.fromString("KdJd");
    let handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.STRAIGHT_FLUSH);
    expect(handrank.getHighCards().length()).to.equal(5);
    expect(
      handrank
        .getHighCards()
        .getCard(0)
        .getRank()
    ).to.equal(Rank.ACE);
    expect(
      handrank
        .getHighCards()
        .getCard(1)
        .getRank()
    ).to.equal(Rank.KING);
    expect(
      handrank
        .getHighCards()
        .getCard(2)
        .getRank()
    ).to.equal(Rank.QUEEN);
    expect(
      handrank
        .getHighCards()
        .getCard(3)
        .getRank()
    ).to.equal(Rank.JACK);
    expect(
      handrank
        .getHighCards()
        .getCard(4)
        .getRank()
    ).to.equal(Rank.TEN);

    expect(handrank.toString()).to.equal("Royal flush");
  });

  it("detects straight flush", () => {
    let board = CardGroup.fromString("3d,4d,7d,4s,Ts");
    let hand = CardGroup.fromString("5d6d");
    let handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.STRAIGHT_FLUSH);
    expect(handrank.getHighCards().length()).to.equal(5);
    expect(
      handrank
        .getHighCards()
        .getCard(0)
        .getRank()
    ).to.equal(Rank.SEVEN);
    expect(
      handrank
        .getHighCards()
        .getCard(1)
        .getRank()
    ).to.equal(Rank.SIX);
    expect(
      handrank
        .getHighCards()
        .getCard(2)
        .getRank()
    ).to.equal(Rank.FIVE);
    expect(
      handrank
        .getHighCards()
        .getCard(3)
        .getRank()
    ).to.equal(Rank.FOUR);
    expect(
      handrank
        .getHighCards()
        .getCard(4)
        .getRank()
    ).to.equal(Rank.THREE);

    board = CardGroup.fromString("3d4dTcAs5d");
    hand = CardGroup.fromString("6d2d");
    handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.STRAIGHT_FLUSH);
    expect(handrank.getHighCards().length()).to.equal(5);
    expect(
      handrank
        .getHighCards()
        .getCard(0)
        .getRank()
    ).to.equal(Rank.SIX);
    expect(
      handrank
        .getHighCards()
        .getCard(1)
        .getRank()
    ).to.equal(Rank.FIVE);
    expect(
      handrank
        .getHighCards()
        .getCard(2)
        .getRank()
    ).to.equal(Rank.FOUR);
    expect(
      handrank
        .getHighCards()
        .getCard(3)
        .getRank()
    ).to.equal(Rank.THREE);
    expect(
      handrank
        .getHighCards()
        .getCard(4)
        .getRank()
    ).to.equal(Rank.TWO);

    board = CardGroup.fromString("4s7s8d8s2s");
    hand = CardGroup.fromString("5s6s");
    handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.STRAIGHT_FLUSH);
    expect(handrank.getHighCards().length()).to.equal(5);
    expect(
      handrank
        .getHighCards()
        .getCard(0)
        .getRank()
    ).to.equal(Rank.EIGHT);
    expect(
      handrank
        .getHighCards()
        .getCard(1)
        .getRank()
    ).to.equal(Rank.SEVEN);
    expect(
      handrank
        .getHighCards()
        .getCard(2)
        .getRank()
    ).to.equal(Rank.SIX);
    expect(
      handrank
        .getHighCards()
        .getCard(3)
        .getRank()
    ).to.equal(Rank.FIVE);
    expect(
      handrank
        .getHighCards()
        .getCard(4)
        .getRank()
    ).to.equal(Rank.FOUR);
  });

  it("detects ace-low straight flush", () => {
    let board = CardGroup.fromString("3d,4d,7s,4s,2d");
    let hand = CardGroup.fromString("Ad5d");
    let handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.STRAIGHT_FLUSH);
    expect(handrank.getHighCards().length()).to.equal(5);
    expect(
      handrank
        .getHighCards()
        .getCard(0)
        .getRank()
    ).to.equal(Rank.FIVE);
    expect(
      handrank
        .getHighCards()
        .getCard(1)
        .getRank()
    ).to.equal(Rank.FOUR);
    expect(
      handrank
        .getHighCards()
        .getCard(2)
        .getRank()
    ).to.equal(Rank.THREE);
    expect(
      handrank
        .getHighCards()
        .getCard(3)
        .getRank()
    ).to.equal(Rank.TWO);
    expect(
      handrank
        .getHighCards()
        .getCard(4)
        .getRank()
    ).to.equal(Rank.ACE);

    board = CardGroup.fromString("Ad,4d,5d,5c,2d");
    hand = CardGroup.fromString("Kd3d");
    handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.STRAIGHT_FLUSH);
    expect(handrank.getHighCards().length()).to.equal(5);
    expect(
      handrank
        .getHighCards()
        .getCard(0)
        .getRank()
    ).to.equal(Rank.FIVE);
    expect(
      handrank
        .getHighCards()
        .getCard(1)
        .getRank()
    ).to.equal(Rank.FOUR);
    expect(
      handrank
        .getHighCards()
        .getCard(2)
        .getRank()
    ).to.equal(Rank.THREE);
    expect(
      handrank
        .getHighCards()
        .getCard(3)
        .getRank()
    ).to.equal(Rank.TWO);
    expect(
      handrank
        .getHighCards()
        .getCard(4)
        .getRank()
    ).to.equal(Rank.ACE);

    board = CardGroup.fromString("3s4s5s7h6d");
    hand = CardGroup.fromString("As2s");
    handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.STRAIGHT_FLUSH);
    expect(handrank.getHighCards().length()).to.equal(5);
    expect(
      handrank
        .getHighCards()
        .getCard(0)
        .getRank()
    ).to.equal(Rank.FIVE);
    expect(
      handrank
        .getHighCards()
        .getCard(1)
        .getRank()
    ).to.equal(Rank.FOUR);
    expect(
      handrank
        .getHighCards()
        .getCard(2)
        .getRank()
    ).to.equal(Rank.THREE);
    expect(
      handrank
        .getHighCards()
        .getCard(3)
        .getRank()
    ).to.equal(Rank.TWO);
    expect(
      handrank
        .getHighCards()
        .getCard(4)
        .getRank()
    ).to.equal(Rank.ACE);
  });

  it("detects quads", () => {
    let board = CardGroup.fromString("2s,4d,7d,4s,Ts");
    let hand = CardGroup.fromString("4h4c");
    let handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.QUADS);
    expect(handrank.getHighCards().length()).to.equal(5);
    expect(
      handrank
        .getHighCards()
        .getCard(0)
        .getRank()
    ).to.equal(Rank.FOUR);
    expect(
      handrank
        .getHighCards()
        .getCard(1)
        .getRank()
    ).to.equal(Rank.FOUR);
    expect(
      handrank
        .getHighCards()
        .getCard(2)
        .getRank()
    ).to.equal(Rank.FOUR);
    expect(
      handrank
        .getHighCards()
        .getCard(3)
        .getRank()
    ).to.equal(Rank.FOUR);
    expect(
      handrank
        .getHighCards()
        .getCard(4)
        .getRank()
    ).to.equal(Rank.TEN);
  });

  it("detects fullhouse", () => {
    let board = CardGroup.fromString("2s,4d,7d,4s,Ts");
    let hand = CardGroup.fromString("ThTd");
    let handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.FULL_HOUSE);
    expect(handrank.getHighCards().length()).to.equal(5);
    expect(
      handrank
        .getHighCards()
        .getCard(0)
        .getRank()
    ).to.equal(Rank.TEN);
    expect(
      handrank
        .getHighCards()
        .getCard(1)
        .getRank()
    ).to.equal(Rank.TEN);
    expect(
      handrank
        .getHighCards()
        .getCard(2)
        .getRank()
    ).to.equal(Rank.TEN);
    expect(
      handrank
        .getHighCards()
        .getCard(3)
        .getRank()
    ).to.equal(Rank.FOUR);
    expect(
      handrank
        .getHighCards()
        .getCard(4)
        .getRank()
    ).to.equal(Rank.FOUR);

    board = CardGroup.fromString("4s7s8c4h7h");
    hand = CardGroup.fromString("8h8d");
    handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.FULL_HOUSE);
    expect(handrank.getHighCards().length()).to.equal(5);
    expect(
      handrank
        .getHighCards()
        .getCard(0)
        .getRank()
    ).to.equal(Rank.EIGHT);
    expect(
      handrank
        .getHighCards()
        .getCard(1)
        .getRank()
    ).to.equal(Rank.EIGHT);
    expect(
      handrank
        .getHighCards()
        .getCard(2)
        .getRank()
    ).to.equal(Rank.EIGHT);
    expect(
      handrank
        .getHighCards()
        .getCard(3)
        .getRank()
    ).to.equal(Rank.SEVEN);
    expect(
      handrank
        .getHighCards()
        .getCard(4)
        .getRank()
    ).to.equal(Rank.SEVEN);

    board = CardGroup.fromString("4s7s8c7d7h");
    hand = CardGroup.fromString("8h8d");
    handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.FULL_HOUSE);
    expect(handrank.getHighCards().length()).to.equal(5);
    expect(
      handrank
        .getHighCards()
        .getCard(0)
        .getRank()
    ).to.equal(Rank.EIGHT);
    expect(
      handrank
        .getHighCards()
        .getCard(1)
        .getRank()
    ).to.equal(Rank.EIGHT);
    expect(
      handrank
        .getHighCards()
        .getCard(2)
        .getRank()
    ).to.equal(Rank.EIGHT);
    expect(
      handrank
        .getHighCards()
        .getCard(3)
        .getRank()
    ).to.equal(Rank.SEVEN);
    expect(
      handrank
        .getHighCards()
        .getCard(4)
        .getRank()
    ).to.equal(Rank.SEVEN);
  });

  it("detects flush", () => {
    let board = CardGroup.fromString("2d,7d,Ts,9d,Th");
    let hand = CardGroup.fromString("JdQd");
    let handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.FLUSH);
    expect(handrank.getHighCards().length()).to.equal(5);
    expect(
      handrank
        .getHighCards()
        .getCard(0)
        .getRank()
    ).to.equal(Rank.QUEEN);
    expect(
      handrank
        .getHighCards()
        .getCard(1)
        .getRank()
    ).to.equal(Rank.JACK);
    expect(
      handrank
        .getHighCards()
        .getCard(2)
        .getRank()
    ).to.equal(Rank.NINE);
    expect(
      handrank
        .getHighCards()
        .getCard(3)
        .getRank()
    ).to.equal(Rank.SEVEN);
    expect(
      handrank
        .getHighCards()
        .getCard(4)
        .getRank()
    ).to.equal(Rank.TWO);

    board = CardGroup.fromString("4s7s8c2c2s");
    hand = CardGroup.fromString("5s6s");
    handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.FLUSH);
    expect(handrank.getHighCards().length()).to.equal(5);
    expect(
      handrank
        .getHighCards()
        .getCard(0)
        .getRank()
    ).to.equal(Rank.SEVEN);
    expect(
      handrank
        .getHighCards()
        .getCard(1)
        .getRank()
    ).to.equal(Rank.SIX);
    expect(
      handrank
        .getHighCards()
        .getCard(2)
        .getRank()
    ).to.equal(Rank.FIVE);
    expect(
      handrank
        .getHighCards()
        .getCard(3)
        .getRank()
    ).to.equal(Rank.FOUR);
    expect(
      handrank
        .getHighCards()
        .getCard(4)
        .getRank()
    ).to.equal(Rank.TWO);

    board = CardGroup.fromString("3s4s5c8s6d");
    hand = CardGroup.fromString("As2s");
    handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.FLUSH);
    expect(handrank.getHighCards().length()).to.equal(5);
    expect(
      handrank
        .getHighCards()
        .getCard(0)
        .getRank()
    ).to.equal(Rank.ACE);
    expect(
      handrank
        .getHighCards()
        .getCard(1)
        .getRank()
    ).to.equal(Rank.EIGHT);
    expect(
      handrank
        .getHighCards()
        .getCard(2)
        .getRank()
    ).to.equal(Rank.FOUR);
    expect(
      handrank
        .getHighCards()
        .getCard(3)
        .getRank()
    ).to.equal(Rank.THREE);
    expect(
      handrank
        .getHighCards()
        .getCard(4)
        .getRank()
    ).to.equal(Rank.TWO);
  });

  it("detects straight", () => {
    let board = CardGroup.fromString("2d,7d,Ts,9d,Th");
    let hand = CardGroup.fromString("8s6h");
    let handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.STRAIGHT);
    expect(handrank.getHighCards().length()).to.equal(5);
    expect(
      handrank
        .getHighCards()
        .getCard(0)
        .getRank()
    ).to.equal(Rank.TEN);
    expect(
      handrank
        .getHighCards()
        .getCard(1)
        .getRank()
    ).to.equal(Rank.NINE);
    expect(
      handrank
        .getHighCards()
        .getCard(2)
        .getRank()
    ).to.equal(Rank.EIGHT);
    expect(
      handrank
        .getHighCards()
        .getCard(3)
        .getRank()
    ).to.equal(Rank.SEVEN);
    expect(
      handrank
        .getHighCards()
        .getCard(4)
        .getRank()
    ).to.equal(Rank.SIX);

    board = CardGroup.fromString("3d4sTcAs5s");
    hand = CardGroup.fromString("6s2d");
    handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.STRAIGHT);
    expect(handrank.getHighCards().length()).to.equal(5);
    expect(
      handrank
        .getHighCards()
        .getCard(0)
        .getRank()
    ).to.equal(Rank.SIX);
    expect(
      handrank
        .getHighCards()
        .getCard(1)
        .getRank()
    ).to.equal(Rank.FIVE);
    expect(
      handrank
        .getHighCards()
        .getCard(2)
        .getRank()
    ).to.equal(Rank.FOUR);
    expect(
      handrank
        .getHighCards()
        .getCard(3)
        .getRank()
    ).to.equal(Rank.THREE);
    expect(
      handrank
        .getHighCards()
        .getCard(4)
        .getRank()
    ).to.equal(Rank.TWO);
  });

  it("detects ace-low straight", () => {
    let board = CardGroup.fromString("3d4s9s7s5s");
    let hand = CardGroup.fromString("Ad2d");
    let handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.STRAIGHT);
    expect(handrank.getHighCards().length()).to.equal(5);
    expect(
      handrank
        .getHighCards()
        .getCard(0)
        .getRank()
    ).to.equal(Rank.FIVE);
    expect(
      handrank
        .getHighCards()
        .getCard(1)
        .getRank()
    ).to.equal(Rank.FOUR);
    expect(
      handrank
        .getHighCards()
        .getCard(2)
        .getRank()
    ).to.equal(Rank.THREE);
    expect(
      handrank
        .getHighCards()
        .getCard(3)
        .getRank()
    ).to.equal(Rank.TWO);
    expect(
      handrank
        .getHighCards()
        .getCard(4)
        .getRank()
    ).to.equal(Rank.ACE);
  });

  it("detects trips", () => {
    let board = CardGroup.fromString("2d,7d,Ts,9d,Th");
    let hand = CardGroup.fromString("TcJc");
    let handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.TRIPS);
    expect(handrank.getHighCards().length()).to.equal(5);
    expect(
      handrank
        .getHighCards()
        .getCard(0)
        .getRank()
    ).to.equal(Rank.TEN);
    expect(
      handrank
        .getHighCards()
        .getCard(1)
        .getRank()
    ).to.equal(Rank.TEN);
    expect(
      handrank
        .getHighCards()
        .getCard(2)
        .getRank()
    ).to.equal(Rank.TEN);
    expect(
      handrank
        .getHighCards()
        .getCard(3)
        .getRank()
    ).to.equal(Rank.JACK);
    expect(
      handrank
        .getHighCards()
        .getCard(4)
        .getRank()
    ).to.equal(Rank.NINE);
  });

  it("detects two pairs", () => {
    let board = CardGroup.fromString("2d,7d,Ts,9d,Jh");
    let hand = CardGroup.fromString("TcJc");
    let handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.TWO_PAIRS);
    expect(handrank.getHighCards().length()).to.equal(5);
    expect(
      handrank
        .getHighCards()
        .getCard(0)
        .getRank()
    ).to.equal(Rank.JACK);
    expect(
      handrank
        .getHighCards()
        .getCard(1)
        .getRank()
    ).to.equal(Rank.JACK);
    expect(
      handrank
        .getHighCards()
        .getCard(2)
        .getRank()
    ).to.equal(Rank.TEN);
    expect(
      handrank
        .getHighCards()
        .getCard(3)
        .getRank()
    ).to.equal(Rank.TEN);
    expect(
      handrank
        .getHighCards()
        .getCard(4)
        .getRank()
    ).to.equal(Rank.NINE);

    board = CardGroup.fromString("2d,7d,7s,Jh");
    hand = CardGroup.fromString("AcJc");
    handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.TWO_PAIRS);
    expect(handrank.getHighCards().length()).to.equal(5);
    expect(
      handrank
        .getHighCards()
        .getCard(0)
        .getRank()
    ).to.equal(Rank.JACK);
    expect(
      handrank
        .getHighCards()
        .getCard(1)
        .getRank()
    ).to.equal(Rank.JACK);
    expect(
      handrank
        .getHighCards()
        .getCard(2)
        .getRank()
    ).to.equal(Rank.SEVEN);
    expect(
      handrank
        .getHighCards()
        .getCard(3)
        .getRank()
    ).to.equal(Rank.SEVEN);
    expect(
      handrank
        .getHighCards()
        .getCard(4)
        .getRank()
    ).to.equal(Rank.ACE);

    // double paired board
    board = CardGroup.fromString("5h,5s,7c,6c,7d");
    hand = CardGroup.fromString("JdJc");
    handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.TWO_PAIRS);
    expect(handrank.getHighCards().length()).to.equal(5);
    expect(
      handrank
        .getHighCards()
        .getCard(0)
        .getRank()
    ).to.equal(Rank.JACK);
    expect(
      handrank
        .getHighCards()
        .getCard(1)
        .getRank()
    ).to.equal(Rank.JACK);
    expect(
      handrank
        .getHighCards()
        .getCard(2)
        .getRank()
    ).to.equal(Rank.SEVEN);
    expect(
      handrank
        .getHighCards()
        .getCard(3)
        .getRank()
    ).to.equal(Rank.SEVEN);
    expect(
      handrank
        .getHighCards()
        .getCard(4)
        .getRank()
    ).to.equal(Rank.SIX);
  });

  it("detects pair", () => {
    let board = CardGroup.fromString("2d,7d,Ts,9d,6s");
    let hand = CardGroup.fromString("TcJc");
    let handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.PAIR);
    expect(handrank.getHighCards().length()).to.equal(5);
    expect(
      handrank
        .getHighCards()
        .getCard(0)
        .getRank()
    ).to.equal(Rank.TEN);
    expect(
      handrank
        .getHighCards()
        .getCard(1)
        .getRank()
    ).to.equal(Rank.TEN);
    expect(
      handrank
        .getHighCards()
        .getCard(2)
        .getRank()
    ).to.equal(Rank.JACK);
    expect(
      handrank
        .getHighCards()
        .getCard(3)
        .getRank()
    ).to.equal(Rank.NINE);
    expect(
      handrank
        .getHighCards()
        .getCard(4)
        .getRank()
    ).to.equal(Rank.SEVEN);

    hand = CardGroup.fromString("JdJh");
    handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.PAIR);
    expect(handrank.getHighCards().length()).to.equal(5);
    expect(
      handrank
        .getHighCards()
        .getCard(0)
        .getRank()
    ).to.equal(Rank.JACK);
    expect(
      handrank
        .getHighCards()
        .getCard(1)
        .getRank()
    ).to.equal(Rank.JACK);
    expect(
      handrank
        .getHighCards()
        .getCard(2)
        .getRank()
    ).to.equal(Rank.TEN);
    expect(
      handrank
        .getHighCards()
        .getCard(3)
        .getRank()
    ).to.equal(Rank.NINE);
    expect(
      handrank
        .getHighCards()
        .getCard(4)
        .getRank()
    ).to.equal(Rank.SEVEN);
  });

  it("detects high card", () => {
    let board = CardGroup.fromString("2c,4c,Jd,9d,6d");
    let hand = CardGroup.fromString("KcQc");
    let handrank = HandRank.evaluate(hand.concat(board));

    expect(handrank.getRank()).to.equal(HandRank.HIGH_CARD);
    expect(handrank.getHighCards().length()).to.equal(5);
    expect(
      handrank
        .getHighCards()
        .getCard(0)
        .getRank()
    ).to.equal(Rank.KING);
    expect(
      handrank
        .getHighCards()
        .getCard(1)
        .getRank()
    ).to.equal(Rank.QUEEN);
    expect(
      handrank
        .getHighCards()
        .getCard(2)
        .getRank()
    ).to.equal(Rank.JACK);
    expect(
      handrank
        .getHighCards()
        .getCard(3)
        .getRank()
    ).to.equal(Rank.NINE);
    expect(
      handrank
        .getHighCards()
        .getCard(4)
        .getRank()
    ).to.equal(Rank.SIX);
  });
});
