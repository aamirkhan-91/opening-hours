import Typography from '@core-components/Typography';
import StoreFrontIcon from '@icons/Storefront';
import { RestaurantData } from '@type-definitions/types';
import { isClosedToday } from '@utils/restaurant';
import fs from 'fs/promises';
import Image from 'next/image';
import path from 'path';

import OpeningHoursCard from './components/OpeningHoursCard';

const getRestaurantData = async (id: number): Promise<RestaurantData | null> => {
  let fileData: RestaurantData | null = null;

  try {
    fileData = JSON.parse(await fs.readFile(path.join('restaurant-data', `${id}.json`), 'utf8'));
  } catch (e: unknown) {
    if (e instanceof SyntaxError) {
      console.log(`${id} has malformed JSON, it will be ignored.`);
    }
  }

  return fileData;
};

export const generateStaticParams = async () => {
  const files = await fs.readdir('restaurant-data');

  return files
    .filter((file) => path.extname(file).toLowerCase() === '.json')
    .map((file) => file.slice(0, file.length - 5));
};

const Home = async ({ params }: { params: { id: number } }) => {
  const { id } = params;
  let restaurantData: RestaurantData | null;

  try {
    restaurantData = await getRestaurantData(id);
  } catch (e) {
    throw new Error('Someting went wrong. Please try again.');
  }

  if (restaurantData === null) return null;

  const { openingHours } = restaurantData;

  const isClosed = isClosedToday(openingHours);

  return (
    <section className='flex flex-grow flex-col items-center bg-grey-2 p-4'>
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
          <Image src={restaurantData.image} alt={`${restaurantData?.name} image`} width={50} height={50} />
        ) : (
          <StoreFrontIcon width={40} height={40} className='text-grey-3' />
        )}
      </div>
      <OpeningHoursCard restaurantData={restaurantData} />
    </section>
  );
};

export default Home;
