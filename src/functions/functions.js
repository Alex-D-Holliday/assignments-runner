export const counter = (function () {
  let count = 0;
  let countArray = [];
  let output;

  return function (input1, input2) {
    if (!input2) {
      if (typeof input1 !== 'string') {
        input1 ? (count = input1) : count;
        return count++;
      }
      count = 0;

      if (countArray.length === 0) {
        countArray.push({ request: input1, response: 0 });
        return 0;
      }

      countArray.forEach((arr) => {
        if (arr.request === input1) {
          output = ++arr.response;
        } else if (!arr.request[input1]) {
          arr.request = input1;
          arr.response = 0;
          output = arr.response;
        }
      });

      return output;
    }

    countArray.forEach((arr) => {
      arr.request = input2;
      arr.response = input1;
      output = arr.response;
    });

    return output;
  };
})();


export function callableMultiplier(...inputs) {
  if (inputs.length === 0) {
    return null;
  }
  return function (...resultInputs) {
    if (resultInputs.length === 0) {
      return inputs.reduce((accumulator, input) => accumulator * input);
    }
    return callableMultiplier(...inputs, ...resultInputs);
  }
}

export function createCalculator(input) {
  function Calculator(initialCountValue = 0) {
    this.initialCount = initialCountValue;
    this.log = [{ operation: 'init', value: this.initialCount }];

    Object.defineProperty(this, 'value', {
      get: () => this.initialCount,
      set: () => {
      },
    });
  }

  Calculator.prototype.add = function (init) {
    this.initialCount += init;
    this.calculate('add', init, this.log);
  };

  Calculator.prototype.subtract = function (init) {
    this.initialCount -= init;
    this.calculate('subtract', init, this.log);
  };

  Calculator.prototype.multiply = function (init) {
    this.initialCount *= init;
    this.calculate('multiply', init, this.log);
  };

  Calculator.prototype.divide = function (init) {
    this.initialCount /= init;
    this.calculate('divide', init, this.log);
  };

  Calculator.prototype.calculate = function (operation, init, logEntry) {
    logEntry.push({ operation: operation, value: init });
  };

  return new Calculator(input);
}