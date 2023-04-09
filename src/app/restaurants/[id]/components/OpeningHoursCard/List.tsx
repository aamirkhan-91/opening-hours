import { DayOfTheWeek, OpeningHours } from '@type-definitions/types';
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
        const [day, openingHours] = entry;

        const isClosed = !openingHours.length;
        const slots: { opening: number; closing: number }[] = [];

        if (!isClosed) {
          // Find the index of the first opening on this day
          const firstOpeningIndex = openingHours.findIndex((entry) => entry.type === 'open');

          for (let i = firstOpeningIndex; i < openingHours.length; i += 1) {
            if (openingHours[i].type === 'open' && i < openingHours.length - 1) {
              slots.push({
                opening: openingHours[i].value,
                closing: openingHours[i + 1].value,
              });
            }
          }

          const entryAtLastIndex = openingHours[openingHours.length - 1];
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
      })}
    </ul>
  );
};

export default List;
