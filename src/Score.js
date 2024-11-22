class Score {
  #list;
  #profit;

  constructor(lottos, winningNumbers, bonusNumber) {
    lottos.forEach(lotto => {
      this.#list = { three: 0, four: 0, five: 0, fiveBonus: 0, six: 0 };
      const cnt = lotto.compare(winningNumbers);
      const isBonus = lotto.include(bonusNumber);

      if (cnt == 6) this.#list.six++;
      else if (cnt == 5 && isBonus) this.#list.fiveBonus++;
      else if (cnt == 5) this.#list.five++;
      else if (cnt == 4) this.#list.four++;
      else if (cnt == 3) this.#list.three++;
    });
  }

  get list() {
    return this.#list;
  }

  calculateProfit() {
    this.#profit = this.#list.six * 2000000000
      + this.#list.fiveBonus * 30000000
      + this.#list.five * 1500000
      + this.#list.four * 50000
      + this.#list.three * 5000;
  }

  calculateProfitRate(quantity) {
    return (this.#profit / (quantity * 1000) * 100).toFixed(1);
  }
}

export default Score;