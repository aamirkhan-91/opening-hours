'use client';

import { HoursByDayFormData } from '@type-definitions/forms';
import { DayOfTheWeek, OpeningHours } from '@type-definitions/types';
import { parse } from '@utils/parser';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import Header from './SuggestionDialogHeader';
import SuggestionForm from './SuggestionForm';

type SuggestionDialogProps = {
  show: boolean;
  onClose: () => void;
};

// TODO: Accessibility pass

const SuggestionDialog: React.FC<SuggestionDialogProps> = ({ show, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data: {
      name?: string;
      image?: string;
      openingHours?: OpeningHours | null;
    } = {};

    data.name = formData.get('name')?.toString().trim();
    data.image = formData.get('image')?.toString().trim();

    const days: DayOfTheWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const hoursByDay: HoursByDayFormData = {} as HoursByDayFormData;

    days.forEach((day) => {
      hoursByDay[day] = formData.get(day);
    });

    data.openingHours = parse(hoursByDay);

    if (data.openingHours) {
      try {
        setIsSubmitting(true);

        const response = await fetch('/api/restaurants', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert('Restaurant has been successfully added.');
          onClose();
          router.refresh();
        } else {
          alert('ERROR');
        }
      } catch (error: unknown) {
        alert('An unexpected error occurred.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <CSSTransition unmountOnExit timeout={300} in={show} classNames='backdrop'>
        <div className='fixed left-0 top-0 z-[10] h-full w-full bg-black' role='presentation' />
      </CSSTransition>
      <CSSTransition unmountOnExit timeout={300} in={show} classNames='dialog'>
        <div
          className='absolute left-1/2 top-1/2 z-[11] mx-auto w-[calc(100%_-_20px)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white pb-5 shadow-lg sm:w-[400px]'
          role='dialog'
        >
          <Header onClose={onClose} />
          <SuggestionForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
        </div>
      </CSSTransition>
    </>
  );
};

export default SuggestionDialog;
