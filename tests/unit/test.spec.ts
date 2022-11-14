// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, test } from '@jest/globals';

function sum(a: number, b: number) {
  return a + b;
}

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    // eslint-disable-next-line no-magic-numbers
    expect(sum(1, 2)).toBe(3);
  });
});
