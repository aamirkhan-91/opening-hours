import Typography from '@core-components/Typography';
import CrossIcon from '@icons/Cross';

type HeaderProps = {
  onClose: () => void;
};

const Header: React.FC<HeaderProps> = ({ onClose }) => (
  <header className='flex items-center justify-between pl-4 pr-2 pt-4'>
    <Typography size='lg'>Suggest new restaurant</Typography>
    <button
      aria-label='Close dialog'
      onClick={onClose}
      className='rounded-full bg-white p-1 transition-colors duration-300 hover:bg-grey-2'
    >
      <CrossIcon width={24} height={24} className='text-grey-3 transition-colors hover:text-black' />
    </button>
  </header>
);

export default Header;
