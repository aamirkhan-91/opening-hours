import Typography from '@core-components/Typography';
import StoreFrontIcon from '@icons/Storefront';
import { RestaurantData } from '@type-definitions/types';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type RestaurantListItemProps = {
  restaurant: RestaurantData;
};

const RestaurantListItem: React.FC<RestaurantListItemProps> = ({ restaurant }) => {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const isActive = pathname.toLowerCase() === `/restaurants/${restaurant.id}`;

  const [imageHasError, setImageHasError] = useState(false);

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        if (ref.current) {
          ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest',
          });
        }
      }, 0);
    }
  }, [isActive]);

  return (
    <Link href={`restaurants/${restaurant.id}`}>
      <div
        ref={ref}
        className={clsx(
          'flex min-w-[175px] flex-col-reverse items-center justify-between px-4 py-4 transition-colors hover:bg-grey-1 md:flex-row md:border-b md:border-grey-2 dark:md:border-grey-3',
          {
            'bg-grey-2 dark:bg-white': isActive,
          }
        )}
      >
        <Typography size='base' weight='normal' className='text-black'>
          {restaurant.name}
        </Typography>
        {!restaurant.image || imageHasError ? (
          <StoreFrontIcon width={30} height={30} className='mb-1 text-grey-3 md:mb-0' />
        ) : (
          <Image
            className='mb-1 h-[35px] md:mb-0'
            src={restaurant.image}
            alt={`${restaurant.name} logo`}
            width={35}
            height={35}
            onError={() => setImageHasError(true)}
          />
        )}
      </div>
    </Link>
  );
};

export default RestaurantListItem;
