export type DayOfTheWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type OpeningHoursEntry = {
  type: 'open' | 'close';
  value: number;
};

export type OpeningHours = {
  [key in DayOfTheWeek]: OpeningHoursEntry[];
};

export type RestaurantData = {
  id: string;
  name: string;
  image: string;
  openingHours: OpeningHours;
};

export type SVGProps = {
  className?: string;
  height?: number;
  width?: number;
};
