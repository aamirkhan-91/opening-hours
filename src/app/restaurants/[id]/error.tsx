'use client';

import Typography from '@core-components/Typography';

type RestaurantErrorPageProps = {
  error: Error;
};

const RestaurantErrorPage: React.FC<RestaurantErrorPageProps> = ({ error: { message } }) => {
  return (
    <>
      <Typography className='mt-4' color='error' size='base' weight='medium'>
        {message}
      </Typography>
    </>
  );
};

export default RestaurantErrorPage;
