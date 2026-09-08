#!/usr/bin/env node

/**
 * Node.js CLI calculator.
 *
 * Supported operations:
 *   +  Addition
 *   -  Subtraction
 *   *  Multiplication
 *   /  Division
 *   %  Modulo
 *   ^  Exponentiation (power)
 *   sqrt Square root (use: node src/calculator.js sqrt <number>)
 */

function modulo(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new Error('Both operands must be valid numbers.');
  }
  if (b === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }

  return a % b;
}

function power(base, exponent) {
  if (!Number.isFinite(base) || !Number.isFinite(exponent)) {
    throw new Error('Both operands must be valid numbers.');
  }

  const result = base ** exponent;
  if (!Number.isFinite(result)) {
    throw new Error('The power result must be a finite number.');
  }

  return result;
}

function squareRoot(n) {
  if (!Number.isFinite(n)) {
    throw new Error('The input must be a valid number.');
  }
  if (n < 0) {
    throw new Error('Cannot calculate the square root of a negative number.');
  }

  return Math.sqrt(n);
}

const OPERATIONS = {
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '*': (left, right) => left * right,
  '/': (left, right) => {
    if (right === 0) {
      throw new Error('Division by zero is not allowed.');
    }

    return left / right;
  },
  '%': modulo,
  '^': power,
};

function calculate(left, operator, right) {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new Error('Both operands must be valid numbers.');
  }

  const operation = OPERATIONS[operator];
  if (!operation) {
    throw new Error(
      `Unsupported operation "${operator}". Use +, -, *, /, %, or ^.`,
    );
  }

  return operation(left, right);
}

function main(args) {
  if (args[0] === 'sqrt') {
    if (args.length !== 2) {
      throw new Error('Usage: node src/calculator.js sqrt <number>');
    }

    console.log(squareRoot(Number(args[1])));
    return;
  }

  if (args.length !== 3) {
    throw new Error(
      'Usage: node src/calculator.js <number> <operator> <number>',
    );
  }

  const [leftInput, operator, rightInput] = args;
  const left = Number(leftInput);
  const right = Number(rightInput);

  console.log(calculate(left, operator, right));
}

if (require.main === module) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { calculate, modulo, power, squareRoot };
