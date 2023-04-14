import Typography from '@core-components/Typography';
import ClockIcon from '@icons/Clock';
import { RestaurantData } from '@type-definitions/types';

import List from './List';

type OpeningHoursCardProps = {
  restaurantData: RestaurantData | null;
};

const OpeningHoursCard: React.FC<OpeningHoursCardProps> = ({ restaurantData }) => {
  return (
    <div className='mt-4 w-full min-w-[350px] rounded-xl bg-foreground-light px-8 py-8 shadow-md transition-colors dark:bg-foreground-dark sm:w-auto md:my-auto'>
      <header className='flex items-center border-b-2 border-grey-3 pb-3 dark:border-grey-2'>
        <ClockIcon className='text-grey-3 dark:text-grey-2' />
        <Typography className='ml-2 text-black dark:text-white' size='lg' weight='medium'>
          Opening hours
        </Typography>
      </header>
      {restaurantData === null ? (
        <Typography>Invalid data</Typography>
      ) : (
        <List openingHours={restaurantData?.openingHours} />
      )}
    </div>
  );
};

export default OpeningHoursCard;
