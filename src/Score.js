import { PRICE } from "./constants/lottoRules.js";

class Score {
  #list;
  #profit;

  constructor(lottos, winningNumbers, bonusNumber) {
    this.#list = { three: 0, four: 0, five: 0, fiveBonus: 0, six: 0 };
    lottos.forEach(lotto => {
      const matches = lotto.compare(winningNumbers);
      if (matches == 6) this.#list.six++;
      else if (matches == 5 && lotto.include(bonusNumber)) this.#list.fiveBonus++;
      else if (matches == 5) this.#list.five++;
      else if (matches == 4) this.#list.four++;
      else if (matches == 3) this.#list.three++;
    });
  }

  get list() {
    return this.#list;
  }

  #calculateProfit() {
    this.#profit = this.#list.six * 2000000000
      + this.#list.fiveBonus * 30000000
      + this.#list.five * 1500000
      + this.#list.four * 50000
      + this.#list.three * 5000;
  }

  calculateProfitRate(quantity) {
    this.#calculateProfit();
    return parseFloat((this.#profit / (quantity * PRICE) * 100).toFixed(1)).toLocaleString('ko-KR');
  }
}

export default Score;
