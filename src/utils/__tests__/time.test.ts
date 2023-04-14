import { describe, expect } from '@jest/globals';
import { getDayOfTheWeek, getTimeIn12HourFormat, timeToSeconds } from '@utils/time';

describe('time:timeToSeconds', () => {
  test('it converts input string "8 AM" correctly into seconds', () => {
    expect(timeToSeconds('8 AM')).toBe(28800);
  });

  test('it converts input string "8 PM" correctly into seconds', () => {
    expect(timeToSeconds('8 PM')).toBe(72000);
  });

  test('it converts input string "12 PM" correctly into seconds', () => {
    expect(timeToSeconds('12 PM')).toBe(43200);
  });

  test('it converts input string 12 AM correctly into seconds', () => {
    expect(timeToSeconds('12 AM')).toBe(0);
  });
});

describe('time:getTimeIn12HourFormat', () => {
  test('it correctly converts input seconds equivalent to 8 AM into the correct string representation', () => {
    expect(getTimeIn12HourFormat(28800)).toBe('8 AM');
  });

  test('it correctly converts input seconds equivalent to 8 PM into the correct string representation', () => {
    expect(getTimeIn12HourFormat(72000)).toBe('8 PM');
  });

  test('it correctly converts input seconds equivalent to 12 AM into the correct string representation', () => {
    expect(getTimeIn12HourFormat(0)).toBe('12 AM');
  });

  test('it correctly converts input seconds equivalent to 12:30 AM into the correct string representation', () => {
    expect(getTimeIn12HourFormat(1800)).toBe('12:30 AM');
  });
});

describe('time:getDayOfTheWeek', () => {
  test('it correctly gets the current day of the week', () => {
    expect(getDayOfTheWeek(0)).toBe('sunday');
    expect(getDayOfTheWeek(1)).toBe('monday');
    expect(getDayOfTheWeek(2)).toBe('tuesday');
    expect(getDayOfTheWeek(3)).toBe('wednesday');
    expect(getDayOfTheWeek(4)).toBe('thursday');
    expect(getDayOfTheWeek(5)).toBe('friday');
    expect(getDayOfTheWeek(6)).toBe('saturday');
  });
});
