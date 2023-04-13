import { HoursByDayFormData } from '@type-definitions/forms';
import { DayOfTheWeek, OpeningHours } from '@type-definitions/types';

import { timeToSeconds } from './time';

export const parse = (hoursByDay: HoursByDayFormData): OpeningHours => {
  const openingHours: OpeningHours = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  };
  
  const days: DayOfTheWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  for (let i = 0; i < days.length; i += 1) {
    const day = days[i];
    const value = hoursByDay[day];

    if (!value) {
      // is closed
      openingHours[day] = [];
    } else {
      const tokens = value.toString().split(',');

      for (let j = 0; j < tokens.length; j += 1) {
        const [opening, closing] = tokens[j].trim().split(' - ');

        const openingSeconds = timeToSeconds(opening);
        const closingSeconds = timeToSeconds(closing);
        // Does the restaurant close past 12 AM?
        const closesNextDay = openingSeconds >= closingSeconds;

        openingHours[day].push({
          type: 'open',
          value: openingSeconds,
        });

        // If closes the same day, make closing entry on the same day
        if (!closesNextDay) {
          openingHours[day].push({
            type: 'close',
            value: closingSeconds,
          });
        } else {
          // Closes the next day, insert closing entry at first index on the next days entries
          const nextDay = days[(i + 1) % days.length];
          openingHours[nextDay].unshift({
            type: 'close',
            value: closingSeconds,
          });
        }
      }
    }
  }

  return openingHours;
};
