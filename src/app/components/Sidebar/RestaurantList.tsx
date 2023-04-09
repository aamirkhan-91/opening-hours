'use client';

import { RestaurantData } from '@type-definitions/types';
import { useState } from 'react';

import RestaurantListItem from './RestaurantListItem';
import SearchBar from './SearchBar';

type ListProps = {
  restaurants: RestaurantData[];
};

const List: React.FC<ListProps> = ({ restaurants }) => {
  const [search, setSearch] = useState('');

  return (
    <>
      <SearchBar search={search} onChange={setSearch} />
      <ul className='h-[calc(100%_-_138px)] overflow-y-auto border-t border-grey-2'>
        {restaurants
          .filter((restaurant) => restaurant.name.toLowerCase().includes(search.toLowerCase()))
          .map((restaurant) => (
            <li key={restaurant.name}>
              <RestaurantListItem restaurant={restaurant} />
            </li>
          ))}
      </ul>
    </>
  );
};

export default List;
