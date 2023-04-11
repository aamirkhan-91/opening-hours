'use client';

import Button from '@core-components/Button';
import Typography from '@core-components/Typography';
import { DayOfTheWeek } from '@type-definitions/types';
import { useId } from 'react';

type SuggestRestaurantFormProps = {
  isSubmitting?: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const SuggestRestaurantForm: React.FC<SuggestRestaurantFormProps> = ({ isSubmitting = false, onSubmit }) => {
  const nameId = useId();
  const imageUrlId = useId();

  const days: DayOfTheWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <form className='mt-8 flex flex-col items-end px-6' onSubmit={onSubmit}>
      <ul className='mb-4 w-full space-y-4'>
        <li>
          <label className='mb-1 block font-medium' htmlFor={nameId}>
            Name
          </label>
          <input
            required
            name='name'
            className='w-full rounded-md border border-grey-3 px-2 py-2 indent-2  outline-none'
            id={nameId}
          />
        </li>
        <li>
          <label className='mb-1 block font-medium' htmlFor={imageUrlId}>
            Image URL
          </label>
          <input
            required
            name='image'
            className='w-full rounded-md border border-grey-3 px-2 py-2 indent-2  outline-none'
            id={imageUrlId}
          />
        </li>
        <li>
          <Typography size='sm' className='mt-6 font-normal text-grey-3'>
            Provide opening timeslots. Accepted format: Time in 12-hour format separated by a hypen. Provide multiple
            slots by adding a coma in between. Leave blank if closed.
          </Typography>
          <ul className='mt-4 space-y-2'>
            {days.map((day) => (
              <div key={day} className='flex items-center justify-start'>
                <label className='capitalize' htmlFor={day}>
                  {day}
                </label>
                <input
                  id={day}
                  required
                  name={day}
                  placeholder='E.g. 9 AM - 3 PM, 6 PM - 10 PM'
                  className='ml-auto w-full basis-2/3 rounded-md border border-grey-3 px-2 py-2  outline-none placeholder:text-sm'
                />
              </div>
            ))}
          </ul>
        </li>
      </ul>
      <Button size='lg' type='submit' loading={isSubmitting}>
        Submit
      </Button>
    </form>
  );
};

export default SuggestRestaurantForm;
