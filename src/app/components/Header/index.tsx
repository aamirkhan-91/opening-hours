import DarkModeToggle from '@core-components/DarkModeToggle';
import Typography from '@core-components/Typography';

import SuggestionDialogButton from './SuggestionDialogButton';

const Header: React.FC = () => {
  return (
    <header className='z-[5] flex items-center justify-between bg-grey-3 px-4 py-6 shadow-md'>
      <Typography size='xl' weight='bold' color='white'>
        Opening Hours
      </Typography>
      <div className='flex items-center space-x-2'>
        <SuggestionDialogButton />
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;
