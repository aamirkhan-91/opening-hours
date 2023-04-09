import { RestaurantData } from '@type-definitions/types';

import RestaurantList from './RestaurantList';

type SidebarProps = {
  restaurants: RestaurantData[];
};

const Sidebar: React.FC<SidebarProps> = ({ restaurants }) => {
  return (
    <aside className='z-[1] w-[300px] bg-white shadow-lg'>
      <RestaurantList restaurants={restaurants} />
    </aside>
  );
};

export default Sidebar;
