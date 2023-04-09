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
    timeSlots = <Typography color='grey'>Closed</Typography>;
  } else {
    timeSlots = (
      <ul>
        {slots.map((slot) => (
          <li key={slot.opening + slot.closing}>
            <Typography>{`${getTimeIn12HourFormat(slot.opening)} - ${getTimeIn12HourFormat(slot.closing)}`}</Typography>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <li className='flex items-center justify-between border-b-2 border-grey-2 py-2'>
      <div className='flex items-center'>
        <Typography className='capitalize' variant='body-medium'>
          {day}
        </Typography>
        {isToday ? (
          <Typography className='ml-3' variant='sm' color='green'>
            TODAY
          </Typography>
        ) : null}
      </div>
      {timeSlots}
    </li>
  );
};

export default ListItem;
