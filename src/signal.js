"use strict";

class SignalGenerator {
  constructor(signalHarmonics, frequency, disRepetitions) {
    this.signalHarmonics = signalHarmonics;
    this.disRepetitions = disRepetitions;
    this.minW = frequency / signalHarmonics;
    this.points = {};
  }

  setPoint(x, y) {
    const ay = this.points[x] || 0;
    this.points[x] = ay + y;
  }

  generateSignal() {
    for (let i = 1; i <= this.signalHarmonics; i++) {
      const wi = this.minW * i;
      for (let t = 0; t < this.disRepetitions; t++) {
        const x = Math.random() * Math.sin(wi * t + Math.random());
        this.setPoint(t, x);
      }
    }
    return { x: Object.keys(this.points), y: Object.values(this.points) };
  }
}

module.exports = { SignalGenerator };
