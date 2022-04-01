let count = 0;
let countArray = [];
let output;

export function counter(firstValue, secondValue) {

  let outputCount = function (input1, input2) {
    if (typeof input1 !== 'string' && input2 === undefined) {
      input1 ? (count = input1) : count;
      return count++;
    } else if (typeof input1 === 'string' && input2 === undefined) {
      count = 0;

      if (countArray.length === 0) {
        countArray.push({ request: input1, response: 0 });
        return 0;
      }

      countArray.forEach((arr) => {
        if (arr.request === input1) {
          output = ++arr.response;
        } else if (arr.request[input1] === undefined) {
          arr.request = input1;
          arr.response = 0;
          output = arr.response;
        }
      });

      return output;
    }

    if (countArray.length === 0) {
      countArray.push({ request: input2, response: input1 });
      return input1;
    }

    countArray.forEach((arr) => {
      if (arr.request === input2) {
        output = ++arr.response;
      }

      arr.request = input2;
      arr.response = input1;
      output = arr.response;
    });

    return output;
  }

  return outputCount(firstValue, secondValue);
}


export function callableMultiplier(...inputs) {
  if (inputs.length > 0) {
    return function (...resultInputs) {
      if (resultInputs.length === 0) {
        return inputs.reduce((accumulator, input) => accumulator * input);
      }
      return callableMultiplier(...inputs, ...resultInputs);
    }
  }
  return null;
}

export function createCalculator(input) {
  function Calculator(initialCountValue = 0) {
    this.initialCount = initialCountValue;

    Object.defineProperty(this, 'value', {
      get: () => this.initialCount,
      set: () => {
      },
    });

    this.log = [{ operation: 'init', value: this.initialCount }];

    this.add = (init) => {
      this.initialCount += init;
      calculate('add', init, this.log);
    }

    this.subtract = (init) => {
      this.initialCount -= init;
      calculate('subtract', init, this.log);
    }

    this.multiply = (init) => {
      this.initialCount *= init;
      calculate('multiply', init, this.log);
    }

    this.divide = (init) => {
      this.initialCount /= init;
      calculate('divide', init, this.log);
    }
  }

  return new Calculator(input);
}

const calculate = (operation, init, logEntry) => {
  logEntry.push({ operation: operation, value: init });
}