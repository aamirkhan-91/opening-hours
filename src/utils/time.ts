import { DayOfTheWeek } from '@type-definitions/types';

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

export const getTimeIn12HourFormat = (seconds: number): string => {
  if (seconds > 86399) {
    // TODO: Handle this case gracefully
    console.log('Error');
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