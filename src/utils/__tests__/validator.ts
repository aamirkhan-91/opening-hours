import { describe, expect } from '@jest/globals';
import { validateOpeningHours } from '@utils/validator';

describe('validator:validateOpeningHours', () => {
  test('it returns false for an input of type "string"', () => {
    expect(validateOpeningHours('This is a string')).toBe(false);
  });

  test('it returns false for an input of "number"', () => {
    expect(validateOpeningHours(532523)).toBe(false);
  });

  test('it returns false for an input of "undefined"', () => {
    expect(validateOpeningHours(undefined)).toBe(false);
  });

  test('it returns false for an input of "null"', () => {
    expect(validateOpeningHours(null)).toBe(false);
  });

  test('it returns false for an input of "boolean"', () => {
    expect(validateOpeningHours(true)).toBe(false);
  });

  test('it returns false for an input of "array"', () => {
    expect(validateOpeningHours([1, 2, 3])).toBe(false);
  });

  test('it returns false for an input of type "object" which is not the correct schema [1]', () => {
    expect(validateOpeningHours({ thisIsARandomObject: true })).toBe(false);
  });

  test('it returns false for an input of type "object" which is not the correct schema [2]', () => {
    expect(
      validateOpeningHours({
        monday: {},
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      })
    ).toBe(false);
  });

  test('it returns true for an input of type "object" which is the correct schema', () => {
    expect(
      validateOpeningHours({
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      })
    ).toBe(true);
  });

  // TODO: Update if additional validation is added
});
