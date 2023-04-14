import { DayOfTheWeek } from '@type-definitions/types';

export const timeToSeconds = (input: string): number => {
  const [number, amOrPm] = input.split(' ');

  if (!number || !amOrPm) {
    throw new Error('Invalid input provided.');
  }

  const numberNumeric = Number.parseInt(number, 10);

  if (numberNumeric > 12) {
    throw new Error('Invalid input provided.');
  }

  let seconds = 0;

  if (amOrPm.toUpperCase() === 'AM') {
    if (numberNumeric === 12) {
      seconds = 0;
    } else {
      seconds = numberNumeric * 3600;
    }
  } else {
    if (numberNumeric === 12) {
      seconds = 43200;
    } else {
      // Add the base seconds at 12 PM then add any additional hours
      seconds = 43200 + numberNumeric * 3600;
    }
  }

  if (seconds < 0 || seconds > 86399) {
    throw new Error('Invalid input provided.');
  }

  return seconds;
};

const secondsToHoursAndMinutes = (
  seconds: number
): {
  hours: {
    value: number;
    amOrPm: string;
  };
  minutes: number | undefined;
} => {
  const elapsedHours = Math.floor(seconds / 3600);
  let amOrPm: string;
  let hours: number;

  if (Math.floor(elapsedHours / 12) === 0) {
    amOrPm = 'AM';
  } else {
    amOrPm = 'PM';
  }

  hours = elapsedHours % 12;
  if (hours === 0) {
    hours = 12;
  }

  let additonalSeconds = 0;
  let minutes: number | undefined;

  additonalSeconds = seconds % 3600;

  if (additonalSeconds > 0) {
    minutes = additonalSeconds / 60;
  }

  return {
    hours: {
      value: hours,
      amOrPm,
    },
    minutes,
  };
};

export const getTimeIn12HourFormat = (seconds: number): string | null => {
  if (seconds > 86399) {
    return null;
  }

  if (seconds < 0) {
    return null;
  }

  const timeBreakdown = secondsToHoursAndMinutes(seconds);
  let formattedTime = '';

  if (timeBreakdown.minutes) {
    formattedTime = `${timeBreakdown.hours.value}:${timeBreakdown.minutes} ${timeBreakdown.hours.amOrPm}`;
  } else {
    formattedTime = `${timeBreakdown.hours.value} ${timeBreakdown.hours.amOrPm}`;
  }

  return formattedTime;
};

export const getDayOfTheWeek = (index: number): DayOfTheWeek => {
  const days: DayOfTheWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  return days[index];
};
