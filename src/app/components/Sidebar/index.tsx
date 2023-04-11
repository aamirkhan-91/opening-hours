import { RestaurantData } from '@type-definitions/types';

import RestaurantList from './RestaurantList';

type SidebarProps = {
  restaurants: RestaurantData[];
};

const Sidebar: React.FC<SidebarProps> = ({ restaurants }) => {
  return (
    <aside className='z-[1] w-full bg-sidebar-light shadow-lg transition-colors dark:bg-sidebar-dark md:w-[300px]'>
      <RestaurantList restaurants={restaurants} />
    </aside>
  );
};

export default Sidebar;
