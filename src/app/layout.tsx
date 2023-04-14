import './globals.css';

import NotificationsProvider from '@context/Notifications';
import Notifications from '@core-components/Notifications';
import { RestaurantData } from '@type-definitions/types';
import clsx from 'clsx';
import fs from 'fs/promises';
import { Roboto } from 'next/font/google';
import path from 'path';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

export const metadata = {
  title: 'Opening Hours',
  description: 'Opening Hours app',
};

const roboto = Roboto({
  weight: ['400', '500', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-roboto',
});

const getRestaurantList = async (): Promise<RestaurantData[]> => {
  const files = await fs.readdir('restaurant-data');
  const restaurantData: RestaurantData[] = [];

  for await (const file of files) {
    try {
      const fileData = JSON.parse(await fs.readFile(path.join('restaurant-data', `${file}`), 'utf8'));
      restaurantData.push(fileData);
    } catch (e: unknown) {
      if (e instanceof SyntaxError) {
        console.log(`${file} has malformed JSON, it will be ignored.`);
      } else {
        console.log(e);
      }
    }
  }

  return restaurantData;
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const restaurants = await getRestaurantList();

  return (
    <html lang='en' className={clsx(roboto.variable, 'h-screen')}>
      <body className='h-full bg-black dark:bg-black xl:py-6'>
        <div className='relative mx-auto flex h-full flex-col overflow-hidden xl:max-h-[1000px] xl:max-w-[1200px] xl:rounded-lg xl:shadow-lg'>
          <NotificationsProvider>
            <Header />
            <main className='flex h-full flex-grow flex-col md:flex-row'>
              <Notifications />
              <Sidebar restaurants={restaurants} />
              {children}
            </main>
          </NotificationsProvider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
