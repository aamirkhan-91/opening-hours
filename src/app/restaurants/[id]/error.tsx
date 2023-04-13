'use client';

import Typography from '@core-components/Typography';

type RestaurantErrorPageProps = {
  error: Error;
};

const RestaurantErrorPage: React.FC<RestaurantErrorPageProps> = ({ error: { message } }) => {
  return (
    <>
      <Typography className='my-auto text-center text-red' size='base' weight='medium'>
        {message}
      </Typography>
    </>
  );
};

export default RestaurantErrorPage;
