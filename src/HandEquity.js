export default class HandEquity {
  constructor() {
    this.possibleHandsCount = 0;
    this.bestHandCount = 0;
    this.tieHandCount = 0;
  }
  addPossibility(isBestHand, isTie) {
    this.possibleHandsCount++;
    if (isBestHand) {
      this.bestHandCount++;
    }
    else if (isTie) {
      this.tieHandCount++;
    }
  }
  getEquity() {
    if (this.possibleHandsCount === 0) {
      return 0;
    }
    return Math.round(this.bestHandCount * 100.0 / this.possibleHandsCount);
  }
  getTiePercentage() {
    if (this.possibleHandsCount === 0) {
      return 0;
    }
    return Math.round(this.tieHandCount * 100.0 / this.possibleHandsCount);
  }
  toString() {
    let s = `${this.getEquity()}%`;
    let tie = this.getTiePercentage();
    if (tie > 0) {
      s += ` (Tie: ${tie}%)`;
    }
    return s;
  }
}