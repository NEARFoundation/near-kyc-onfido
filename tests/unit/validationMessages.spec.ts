// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, test } from '@jest/globals';

import ValidationFailure from '../../types/ValidationFailure';
import validationMessages from '../../utils/validationMessages';

const keys = Object.values(ValidationFailure);

describe('validationMessages', () => {
  keys.forEach((key) => {
    test(`should have a message for ${key}`, () => {
      expect(validationMessages.has(key)).toBe(true);
    });
  });

  test('should have the same number of messages as ValidationFailure', () => {
    expect(validationMessages.size).toBe(keys.length);
  });
});
