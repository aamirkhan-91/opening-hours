'use client';

import Typography from '@core-components/Typography';
import StoreFrontIcon from '@icons/Storefront';
import { RestaurantData } from '@type-definitions/types';
// import { isClosedToday } from '@utils/restaurant';
import Image from 'next/image';
import { useState } from 'react';

type HeaderCardProps = {
  restaurantData: RestaurantData;
};

const HeaderCard: React.FC<HeaderCardProps> = ({ restaurantData }) => {
  const [imageHasError, setImageHasError] = useState(false);

  return (
    <div className='z-[2] flex w-full items-center justify-between rounded-md bg-foreground-light p-6 text-black shadow-md transition-colors dark:bg-foreground-dark'>
      <div>
        <Typography size='lg' className='text-black dark:text-white' weight='medium'>
          {restaurantData.name}
        </Typography>
      </div>
      {!restaurantData.image || imageHasError ? (
        <StoreFrontIcon width={30} height={30} className='mb-1 text-grey-3 md:mb-0' />
      ) : (
        <Image
          className='mb-1 h-[35px] md:mb-0'
          src={restaurantData.image}
          alt={`${restaurantData.name} logo`}
          width={35}
          height={35}
          onError={() => setImageHasError(true)}
        />
      )}
    </div>
  );
};

export default HeaderCard;
