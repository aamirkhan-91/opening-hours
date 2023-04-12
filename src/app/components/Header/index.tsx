import DarkModeToggle from '@core-components/DarkModeToggle';
import Typography from '@core-components/Typography';

import SuggestionDialogButton from './SuggestionDialogButton';

const Header: React.FC = () => {
  return (
    <header className='z-[5] flex items-center justify-between bg-header-light px-4 py-6 shadow-md transition-colors dark:bg-header-dark'>
      <Typography size='xl' weight='bold' className='hidden text-black dark:text-white sm:block'>
        Opening Hours
      </Typography>
      <div className='flex w-full items-center justify-between sm:w-auto sm:justify-start'>
        <SuggestionDialogButton />
        <DarkModeToggle className='sm:ml-2' />
      </div>
    </header>
  );
};

export default Header;
