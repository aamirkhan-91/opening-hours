import Typography from '@core-components/Typography';
import StoreFrontIcon from '@icons/Storefront';
import { RestaurantData } from '@type-definitions/types';
import { isClosedToday } from '@utils/restaurant';
import Image from 'next/image';

type HeaderCardProps = {
  restaurantData: RestaurantData;
};

const HeaderCard: React.FC<HeaderCardProps> = ({ restaurantData }) => {
  const isClosed = isClosedToday(restaurantData.openingHours);

  return (
    <div className='z-[2] flex w-full items-center justify-between rounded-md bg-white p-6 shadow-md'>
      <div>
        <Typography variant='lg'>{restaurantData.name}</Typography>
        {isClosed ? (
          <Typography color='grey' className='mt-1'>
            Closed today
          </Typography>
        ) : null}
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
