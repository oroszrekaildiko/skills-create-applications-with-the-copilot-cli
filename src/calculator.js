#!/usr/bin/env node

/**
 * Node.js CLI calculator.
 *
 * Supported operations:
 *   +  Addition
 *   -  Subtraction
 *   *  Multiplication
 *   /  Division
 */

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
};

function calculate(left, operator, right) {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new Error('Both operands must be valid numbers.');
  }

  const operation = OPERATIONS[operator];
  if (!operation) {
    throw new Error(`Unsupported operation "${operator}". Use +, -, *, or /.`);
  }

  return operation(left, right);
}

function main(args) {
  if (args.length !== 3) {
    throw new Error('Usage: node src/calculator.js <number> <operator> <number>');
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

module.exports = { calculate };
