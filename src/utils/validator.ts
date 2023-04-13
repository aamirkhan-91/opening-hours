import { DayOfTheWeek } from '@type-definitions/types';

export function validateOpeningHours(input: unknown): boolean {
  if (input === null || input === undefined) {
    return false;
  }

  if (typeof input !== 'object') {
    // Not an Object
    return false;
  }

  if (typeof input === 'object' && Array.isArray(input)) {
    // Object but an array
    return false;
  }

  // At this point we have determined that we have an "object"
  const keys: DayOfTheWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  let hasValidData = true;

  for (let i = 0; i < keys.length; i += 1) {
    if (!Object.hasOwn(input, keys[i])) {
      hasValidData = false;
      break;
    }
  }

  if (hasValidData) {
    const values = Object.values(input);

    for (let i = 0; i < keys.length; i += 1) {
      if (!Array.isArray(values[i])) {
        hasValidData = false;
        break;
      }
    }
  }

  return hasValidData;
}
