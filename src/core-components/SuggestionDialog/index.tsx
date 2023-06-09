'use client';

import useNotifications from '@hooks/useNotifications';
import { HoursByDayFormData } from '@type-definitions/forms';
import { DayOfTheWeek, OpeningHours } from '@type-definitions/types';
import { parse } from '@utils/parser';
import FocusTrap from 'focus-trap-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import Header from './SuggestionDialogHeader';
import SuggestionForm from './SuggestionForm';

type SuggestionDialogProps = {
  show: boolean;
  onClose: () => void;
};

const SuggestionDialog: React.FC<SuggestionDialogProps> = ({ show, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { addNotification } = useNotifications();

  const handleEscapeKeyPress = (event: KeyboardEvent) => {
    event.stopPropagation();

    if (event.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscapeKeyPress);

    return () => {
      window.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, []);

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
      hoursByDay[day] = formData.get(day) as string;
    });

    try {
      data.openingHours = parse(hoursByDay);
    } catch (error: unknown) {
      if (error instanceof Error) {
        addNotification({
          title: 'Error',
          message: error.message,
          variant: 'error',
          duration: 10000,
        });
      }
    }

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

        // TODO: Check all error/success cases
        if (response.ok) {
          const { id }: { id: string } = await response.json();

          addNotification({
            title: 'Success',
            message: 'The restaurant has been successfully added.',
            duration: 5000,
            variant: 'success',
          });

          onClose();
          router.push(`/restaurants/${id}`);
        } else {
          const { error }: { error: string } = await response.json();

          addNotification({
            title: 'Error',
            message: error,
            duration: 5000,
            variant: 'error',
          });
        }
      } catch (error: unknown) {
        addNotification({
          title: 'Error',
          message: 'An unexpected error occurred.',
          duration: 5000,
          variant: 'error',
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Should ideally use a portal here but seems like there is a bug using createPortal with Next.js 13 causing 500 Server Error when rendering a page on the server
  return (
    <>
      <CSSTransition unmountOnExit timeout={300} in={show} classNames='backdrop'>
        <div className='pointer-events-none fixed left-0 top-0 z-[10] h-full w-full bg-black' role='presentation' />
      </CSSTransition>
      <CSSTransition unmountOnExit timeout={300} in={show} classNames='dialog'>
        <FocusTrap
          focusTrapOptions={{
            escapeDeactivates: false,
            allowOutsideClick: true,
          }}
        >
          <div
            className='absolute left-1/2 top-1/2 z-[11] mx-auto w-[calc(100%_-_20px)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white pb-5 shadow-lg sm:w-[400px]'
            role='dialog'
          >
            <Header onClose={onClose} />
            <SuggestionForm onSubmit={onSubmit} isSubmitting={isSubmitting} onCancel={onClose} />
          </div>
        </FocusTrap>
      </CSSTransition>
    </>
  );
};

export default SuggestionDialog;
