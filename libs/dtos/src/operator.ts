export interface OperatorOpeningHoursDto {
  allDay?: boolean;
  closed?: boolean;
  openingTime?: string;
  closingTime?: string;
}

export const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
export type Day = typeof days[number];

export const defaultOpeningTimes: Record<Day, OperatorOpeningHoursDto> = {
  Mon: { allDay: true },
  Tue: { allDay: true },
  Wed: { allDay: true },
  Thu: { allDay: true },
  Fri: { allDay: true },
  Sat: { allDay: true },
  Sun: { allDay: true },
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
}

export type OperatorNoId = Omit<OperatorDto, '_id'>;
