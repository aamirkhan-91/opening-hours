import Typography from '@core-components/Typography';
import StoreFrontIcon from '@icons/Storefront';
import { RestaurantData } from '@type-definitions/types';
// import { isClosedToday } from '@utils/restaurant';
import Image from 'next/image';

type HeaderCardProps = {
  restaurantData: RestaurantData;
};

const HeaderCard: React.FC<HeaderCardProps> = ({ restaurantData }) => {
  // const isClosed = isClosedToday(restaurantData.openingHours);

  return (
    <div className='z-[2] flex w-full items-center justify-between rounded-md bg-foreground-light p-6 text-black shadow-md transition-colors dark:bg-foreground-dark'>
      <div>
        <Typography size='lg' className='text-black dark:text-white' weight='medium'>
          {restaurantData.name}
        </Typography>
        {/* {isClosed ? <Typography className='mt-1 text-black dark:text-white'>Closed today</Typography> : null} */}
      </div>
      {restaurantData.image ? (
        <Image
          className='h-[50px]'
          src={restaurantData.image}
          alt={`${restaurantData?.name} image`}
          width={50}
          height={50}
        />
      ) : (
        <StoreFrontIcon width={40} height={40} className='text-grey-3' />
      )}
    </div>
  );
};

export default HeaderCard;
