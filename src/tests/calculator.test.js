const { execFileSync } = require('node:child_process');
const path = require('node:path');

const { calculate } = require('../calculator');

const calculatorPath = path.join(__dirname, '..', 'calculator.js');

describe('calculate', () => {
  describe('basic operations from the calculator examples', () => {
    test('adds two numbers', () => {
      expect(calculate(2, '+', 3)).toBe(5);
    });

    test('subtracts two numbers', () => {
      expect(calculate(10, '-', 4)).toBe(6);
    });

    test('multiplies two numbers', () => {
      expect(calculate(45, '*', 2)).toBe(90);
    });

    test('divides two numbers', () => {
      expect(calculate(20, '/', 5)).toBe(4);
    });
  });

  describe('edge cases', () => {
    test('handles negative and decimal operands', () => {
      expect(calculate(-2.5, '+', 1.5)).toBe(-1);
      expect(calculate(-6, '*', -2)).toBe(12);
      expect(calculate(7.5, '/', 2.5)).toBe(3);
    });

    test('allows zero when it is not a divisor', () => {
      expect(calculate(0, '+', 8)).toBe(8);
      expect(calculate(8, '-', 8)).toBe(0);
      expect(calculate(0, '*', 8)).toBe(0);
    });

    test('rejects division by zero', () => {
      expect(() => calculate(20, '/', 0)).toThrow(
        'Division by zero is not allowed.',
      );
    });

    test('rejects non-finite operands', () => {
      expect(() => calculate(Number.NaN, '+', 1)).toThrow(
        'Both operands must be valid numbers.',
      );
      expect(() => calculate(1, '+', Number.POSITIVE_INFINITY)).toThrow(
        'Both operands must be valid numbers.',
      );
    });

    test('rejects unsupported operations', () => {
      expect(() => calculate(2, '^', 3)).toThrow(
        'Unsupported operation "^". Use +, -, *, or /.',
      );
    });
  });
});

describe('calculator CLI', () => {
  test.each([
    ['2', '+', '3', '5'],
    ['10', '-', '4', '6'],
    ['45', '*', '2', '90'],
    ['20', '/', '5', '4'],
  ])('prints the result for %s %s %s', (left, operator, right, result) => {
    expect(execFileSync(process.execPath, [calculatorPath, left, operator, right], {
      encoding: 'utf8',
    })).toBe(`${result}\n`);
  });

  test('exits with an error for division by zero', () => {
    expect(() =>
      execFileSync(process.execPath, [calculatorPath, '20', '/', '0'], {
        encoding: 'utf8',
        stdio: 'pipe',
      }),
    ).toThrow('Division by zero is not allowed.');
  });
});
