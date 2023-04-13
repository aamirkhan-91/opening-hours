import { OpeningHoursEntry } from '@type-definitions/types';

export const isClosedOnDay = (openingHoursEntries: OpeningHoursEntry[]): boolean => {
  if (!openingHoursEntries.length) {
    return true;
  } else if (openingHoursEntries.length === 1 && openingHoursEntries[0].type === 'close') {
    return true;
  }

  return false;
};
