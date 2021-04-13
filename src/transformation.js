const math = require('mathjs');

const getDFT = signals => {
  const result = [];
  for (let i = 0; i < signals.length; i++) {
    let sum = math.complex();
    for (let j = 0; j < signals.length; j++) {
      const arg = (2 * Math.PI * i * j) / signals.length;
      const w = math.complex(math.cos(arg), -math.sin(arg));
      sum = math.add(sum, math.multiply(w, signals[j]));
    }
    result.push(sum);
  }
  return result;
};

const getFFT = signals => {
  if (signals.length === 1) {
    return signals;
  }
  const result = [];
  const evens = getFFT(signals.filter((value, index) => !(index % 2)));
  const odds = getFFT(signals.filter((value, index) => index % 2));
  for (let i = 0; i < signals.length / 2; i++) {
    const x = -2 * Math.PI * (i / signals.length);
    const root = math.complex(math.cos(x), math.sin(x));
    result[i] = math.add(evens[i], math.multiply(root, odds[i]));
    result[i + signals.length / 2] = math.subtract(evens[i], math.multiply(root, odds[i]));
  }
  return result;
};


const complexToReal = (array) => array.map((x) => math.abs(x));

module.exports = {
  getDFT,
  getFFT,
  complexToReal,
};
