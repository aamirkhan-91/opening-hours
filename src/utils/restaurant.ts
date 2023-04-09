import { OpeningHours } from '@type-definitions/types';

import { getDayOfTheWeek } from './time';

export const isClosedToday = (openingHours: OpeningHours): boolean => {
  const today = getDayOfTheWeek(new Date().getDay());
  const hoursToday = openingHours[today];
  return Boolean(hoursToday.length);
};
