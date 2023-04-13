'use client';

import MoonIcon from '@icons/Moon';
import SunIcon from '@icons/Sun';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

type Props = {
  className?: string;
};

const DarkModeToggle: React.FC<Props> = ({ className }) => {
  const [enabled, toggle] = useState(false);

  useEffect(() => {
    const htmlElement = document.querySelector('html');

    if (htmlElement) {
      if (enabled) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
    }
  }, [enabled]);

  return (
    <button
      className={clsx('darkModeToggle', className)}
      aria-label='Toggle between darkmode and light mode'
      onClick={() => toggle(!enabled)}
    >
      <SunIcon className='text-black transition-colors dark:text-white' width={20} height={20} />
      <div
        className={clsx({
          enabled: enabled,
        })}
      />
      <MoonIcon className='text-black transition-colors dark:text-white' width={20} height={20} />
    </button>
  );
};

export default DarkModeToggle;
