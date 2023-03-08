export interface OperatorOpeningHoursDto {
  allDay?: boolean;
  openingTime?: string;
  closingTime?: string;
}

export const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
export type Day = typeof days[number];

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
