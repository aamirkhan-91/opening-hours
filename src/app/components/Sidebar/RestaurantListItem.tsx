'use client';

import Typography from '@core-components/Typography';
import StoreFrontIcon from '@icons/Storefront';
import { RestaurantData } from '@type-definitions/types';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type RestaurantListItemProps = {
  restaurant: RestaurantData;
};

const RestaurantListItem: React.FC<RestaurantListItemProps> = ({ restaurant }) => {
  const pathname = usePathname();

  return (
    <Link href={`restaurants/${restaurant.id}`}>
      <div
        className={clsx(
          'flex items-center justify-between border-b border-grey-2 px-4 py-4 transition-colors hover:bg-grey-1',
          {
            'bg-grey-2': pathname.toLowerCase() === `/restaurants/${restaurant.name.toLowerCase()}`,
          }
        )}
      >
        <Typography variant='body-medium'>{restaurant.name}</Typography>
        {restaurant.image ? (
          <Image className='h-[35px]' src={restaurant.image} alt='Logo' width={35} height={35} />
        ) : (
          <StoreFrontIcon width={30} height={30} className='text-grey-3' />
        )}
      </div>
    </Link>
  );
};

export default RestaurantListItem;
