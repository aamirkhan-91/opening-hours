import { DayOfTheWeek } from './types';

export type HoursByDayFormData = { [key in DayOfTheWeek]: FormDataEntryValue | null };
