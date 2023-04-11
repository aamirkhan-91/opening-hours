'use client';

import MoonIcon from '@icons/Moon';
import SunIcon from '@icons/Sun';
import { useEffect, useId, useState } from 'react';

const DarkModeToggle: React.FC = () => {
  const [enabled, toggle] = useState(false);
  const checkboxId = useId();

  useEffect(() => {
    const htmlElement = document.querySelector('html');

    // todo use context?

    if (htmlElement) {
      if (enabled) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
    }
  }, [enabled]);

  return (
    <div className='darkModeToggle'>
      <SunIcon className='text-black transition-colors dark:text-white' width={20} height={20} />
      <input
        checked={enabled}
        id={checkboxId}
        className='invisible h-0 w-0'
        type='checkbox'
        onClick={() => toggle(!enabled)}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={checkboxId} />
      <MoonIcon className='text-black transition-colors dark:text-white' width={20} height={20} />
    </div>
  );
};

export default DarkModeToggle;
