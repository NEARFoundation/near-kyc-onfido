// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, test } from '@jest/globals';

import isValidationFailure from '../../utils/isValidationFailure';

describe('isValidationFailure function', () => {
  test('isValidationFailure("consider") should return true', () => {
    expect(isValidationFailure('consider')).toBeTruthy();
  });

  test('isValidationFailure("unidentified") should return true', () => {
    expect(isValidationFailure('unidentified')).toBeTruthy();
  });

  test('isValidationFailure("rejected") should return true', () => {
    expect(isValidationFailure('rejected')).toBeTruthy();
  });

  test('isValidationFailure("caution") should return true', () => {
    expect(isValidationFailure('caution')).toBeTruthy();
  });

  test('isValidationFailure("clear") should return false', () => {
    expect(isValidationFailure('clear')).toBeFalsy();
  });
});
