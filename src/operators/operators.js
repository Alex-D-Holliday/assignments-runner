export function add(a, b) {
  if (Number.isInteger(a) && Number.isInteger(b)) {
    return a + b;
  }
  return null;
}

export function subtract(a, b) {
  if (Number.isInteger(a) && Number.isInteger(b)) {
    return a - b;
  }
  return null;
}

export function complex(multipliers, dividers) {
  let multiCheck = multipliers.every((element) => {
    return Number.isInteger(element);
  });

  let divideCheck = dividers.every((element) => {
    return Number.isInteger(element);
  });

  if (multiCheck && divideCheck) {
    const multiply = multipliers[0] * multipliers[1];
    const divide = dividers[0] / dividers[1];
    return Math.pow(multiply, divide);
  }
  return null;
}