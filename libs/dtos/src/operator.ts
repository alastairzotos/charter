import { LoggedInUserDetails } from "./auth";


export interface OperatorOpeningHoursDto {
  allDay?: boolean;
  closed?: boolean;
  openingTime?: string;
  closingTime?: string;
}

export const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
export type Day = typeof days[number];

export const dayNumberToDayMap: Record<number, Day> = {
  [0]: 'Sun',
  [1]: 'Mon',
  [2]: 'Tue',
  [3]: 'Wed',
  [4]: 'Thu',
  [5]: 'Fri',
  [6]: 'Sat',
}

export const defaultOpeningDayTime: OperatorOpeningHoursDto = {
  allDay: true,
  closed: false,
  openingTime: '09:00',
  closingTime: '21:00',
}

export const defaultOpeningTimes: Record<Day, OperatorOpeningHoursDto> = {
  Mon: defaultOpeningDayTime,
  Tue: defaultOpeningDayTime,
  Wed: defaultOpeningDayTime,
  Thu: defaultOpeningDayTime,
  Fri: defaultOpeningDayTime,
  Sat: defaultOpeningDayTime,
  Sun: defaultOpeningDayTime,
};

export interface OperatorDto {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  photo: string;
  description: string;
  openingTimes: Record<Day, OperatorOpeningHoursDto>;
  owner?: LoggedInUserDetails;
}

export type OperatorNoId = Omit<OperatorDto, '_id'>;
