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
      console.log(`${id}.json has malformed JSON, it will be ignored.`);
    }
  }

  return fileData;
};

export const generateStaticParams = async () => {
  const files = await fs.readdir('restaurant-data');

  return (
    files
      // get only .json files
      .filter((file) => path.extname(file).toLowerCase() === '.json')
      //Remove .json extension
      .map((file) => file.slice(0, file.length - 5))
  );
};

const RestaurantDetails = async ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const restaurantData = await getRestaurantData(id);

  if (restaurantData === null) {
    throw new Error('A restaurant was not found for the provided ID. Please select one from the sidebar.');
  }

  return (
    <>
      <HeaderCard restaurantData={restaurantData} />
      <OpeningHoursCard restaurantData={restaurantData} />
    </>
  );
};

export default RestaurantDetails;
