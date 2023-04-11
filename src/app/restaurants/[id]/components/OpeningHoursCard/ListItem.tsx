import Typography from '@core-components/Typography';
import { DayOfTheWeek } from '@type-definitions/types';
import { getTimeIn12HourFormat } from '@utils/time';

type ListItemProps = {
  isToday: boolean;
  isClosed: boolean;
  day: DayOfTheWeek;
  slots: { opening: number; closing: number }[];
};

const ListItem: React.FC<ListItemProps> = ({ isToday, isClosed, day, slots }) => {
  let timeSlots;

  if (isClosed) {
    timeSlots = <Typography className='text-grey-3 dark:text-grey-2'>Closed</Typography>;
  } else {
    timeSlots = (
      <ul className='flex flex-col items-end'>
        {slots.map((slot) => (
          <li key={slot.opening + slot.closing}>
            <Typography className='text-black dark:text-white'>{`${getTimeIn12HourFormat(
              slot.opening
            )} - ${getTimeIn12HourFormat(slot.closing)}`}</Typography>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <li className='flex items-center justify-between border-b-2 border-grey-2 py-2'>
      <div className='flex items-center'>
        <Typography size='base' weight='medium' className='capitalize text-black dark:text-white'>
          {day}
        </Typography>
        {isToday ? (
          <Typography className='ml-3 text-green' size='xs' weight='bold'>
            TODAY
          </Typography>
        ) : null}
      </div>
      {timeSlots}
    </li>
  );
};

export default ListItem;
