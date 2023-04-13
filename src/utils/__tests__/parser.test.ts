import { describe, expect } from '@jest/globals';
import { HoursByDayFormData } from '@type-definitions/forms';
import { OpeningHours } from '@type-definitions/types';
import { parse } from '@utils/parser';

describe('parser:parse', () => {
  test('it converts input data into output data correctly', () => {
    const input: HoursByDayFormData = {
      monday: '9 AM - 3 PM, 6 PM - 10 PM',
      tuesday: '9 AM - 11 AM, 12 PM - 1 AM',
      wednesday: '9 AM - 10 PM',
      thursday: null,
      friday: '12 PM - 1 AM',
      saturday: '12 PM - 12 AM',
      sunday: '6 PM - 1 AM',
    };

    const output: OpeningHours = {
      monday: [
        {
          type: 'close',
          value: 3600,
        },
        {
          type: 'open',
          value: 32400,
        },
        {
          type: 'close',
          value: 54000,
        },
        {
          type: 'open',
          value: 64800,
        },
        {
          type: 'close',
          value: 79200,
        },
      ],
      tuesday: [
        {
          type: 'open',
          value: 32400,
        },
        {
          type: 'close',
          value: 39600,
        },
        {
          type: 'open',
          value: 43200,
        },
      ],
      wednesday: [
        {
          type: 'close',
          value: 3600,
        },
        {
          type: 'open',
          value: 32400,
        },
        {
          type: 'close',
          value: 79200,
        },
      ],
      thursday: [],
      friday: [
        {
          type: 'open',
          value: 43200,
        },
      ],
      saturday: [
        {
          type: 'close',
          value: 3600,
        },
        {
          type: 'open',
          value: 43200,
        },
      ],
      sunday: [
        {
          type: 'close',
          value: 0,
        },
        {
          type: 'open',
          value: 64800,
        },
      ],
    };

    expect(parse(input)).toEqual(output);
  });

  // TODO: Add throwError test case for invalid data after adding it to parser
});
