import Typography from '@core-components/Typography';

const Header: React.FC = () => {
  return (
    <header className='z-[5] flex items-center justify-between bg-grey-3 px-4 py-6 shadow-md'>
      <Typography variant='lg' color='white'>
        Opening Hours
      </Typography>
    </header>
  );
};

export default Header;
