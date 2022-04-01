export function add(a, b) {
  if (isNumber(a) && isNumber(b)) {
    return a + b;
  }
  return null;
}

export function subtract(a, b) {
  if (isNumber(a) && isNumber(b) && !Array.isArray(a)) {
    return a - b;
  }
  return null;
}

export function complex([firstMultiplier, secondMultiplier], [dividend, divider]) {
  // TODO: check if we can combine this checks into one 
  // Example: [isNumber(secondMultiplier), ...].every((check) => !check)
  if (!isNumber(firstMultiplier) && !isNumber(secondMultiplier)) {
    return null;
  } else if (!isNumber(dividend) && !isNumber(divider) || !dividend) {
    return null;
  }
  // TODO: Check const instead
  let multiply = firstMultiplier * secondMultiplier;
  let divide = dividend / divider;
  return Math.pow(multiply, divide);
}

const isNumber = (arg) => /^-?\d$/.test(arg);