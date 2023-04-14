'use client';

import Button from '@core-components/Button';
import Typography from '@core-components/Typography';
import { DayOfTheWeek } from '@type-definitions/types';
import { useId } from 'react';

type SuggestRestaurantFormProps = {
  isSubmitting?: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

const SuggestRestaurantForm: React.FC<SuggestRestaurantFormProps> = ({ isSubmitting = false, onSubmit, onCancel }) => {
  const nameId = useId();
  const imageUrlId = useId();

  const days: DayOfTheWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <form className='mt-8 flex flex-col items-end px-6' onSubmit={onSubmit}>
      <ul className='mb-4 w-full space-y-4'>
        <li>
          <label className='mb-1 block font-medium' htmlFor={nameId}>
            Name of Restaurant *
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
            Logo image URL
          </label>
          <input
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
                  name={day}
                  pattern='(([0-9])+\s(PM|AM)\s-\s([0-9])+\s(PM|AM))((,\s?)(([0-9])+\s(PM|AM)\s-\s([0-9])+\s(PM|AM)))*'
                  placeholder='E.g. 9 AM - 3 PM, 6 PM - 10 PM'
                  className='ml-auto w-full basis-2/3 rounded-md border border-grey-3 px-2 py-2  outline-none placeholder:text-sm'
                />
              </div>
            ))}
          </ul>
        </li>
      </ul>
      <div className='mt-4 flex w-full flex-col-reverse sm:flex-row sm:space-x-2 sm:space-y-0'>
        <Button className='mt-2 sm:mt-0' fullWidth variant='danger' type='button' onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button fullWidth type='submit' loading={isSubmitting}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default SuggestRestaurantForm;
