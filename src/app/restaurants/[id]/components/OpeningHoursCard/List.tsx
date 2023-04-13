import { DayOfTheWeek, OpeningHours } from '@type-definitions/types';
import { isClosedOnDay } from '@utils/restaurant';
import { getDayOfTheWeek } from '@utils/time';

import ListItem from './ListItem';

type ListProps = {
  openingHours: OpeningHours;
};

const List: React.FC<ListProps> = ({ openingHours }) => {
  const openingHoursEntries = Object.entries(openingHours);
  const today = getDayOfTheWeek(new Date().getDay());

  return (
    <ul>
      {openingHoursEntries.map((entry, index) => {
        try {
          const [day, openingHoursForDay] = entry;

          const isClosed = isClosedOnDay(openingHoursForDay);
          const slots: { opening: number; closing: number }[] = [];

          if (!isClosed) {
            // Find the index of the first opening on this day
            const firstOpeningIndex = openingHoursForDay.findIndex(
              (openingHoursEntry) => openingHoursEntry.type === 'open'
            );

            for (let i = firstOpeningIndex; i < openingHoursForDay.length; i += 1) {
              if (openingHoursForDay[i].type === 'open' && i < openingHoursForDay.length - 1) {
                slots.push({
                  opening: openingHoursForDay[i].value,
                  closing: openingHoursForDay[i + 1].value,
                });
              }
            }

            const entryAtLastIndex = openingHoursForDay[openingHoursForDay.length - 1];
            // Check if the last entry on this day is an opening and if so, retrieve the corresponding closing entry from the next day
            if (entryAtLastIndex.type === 'open') {
              const [, nextDayOpeningHours] = openingHoursEntries[(index + 1) % openingHoursEntries.length];

              // Get closing time from first entry on the next day
              slots.push({
                opening: entryAtLastIndex.value,
                closing: nextDayOpeningHours[0].value,
              });
            }
          }

          return (
            <ListItem
              key={day}
              isClosed={isClosed}
              isToday={today === (day as DayOfTheWeek)}
              day={day as DayOfTheWeek}
              slots={slots}
            />
          );
        } catch (error) {
          throw new Error('Invalid data.');
        }
      })}
    </ul>
  );
};

export default List;
