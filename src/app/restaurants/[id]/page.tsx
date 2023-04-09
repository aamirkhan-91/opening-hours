import { RestaurantData } from '@type-definitions/types';
import fs from 'fs/promises';
import path from 'path';

import HeaderCard from './components/HeaderCard';
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

  return (
    <section className='flex flex-grow flex-col items-center bg-grey-2 p-4'>
      <HeaderCard restaurantData={restaurantData} />
      <OpeningHoursCard restaurantData={restaurantData} />
    </section>
  );
};

export default Home;
