import dayjs from "dayjs";

export interface OpeningHoursDto {
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

export const defaultOpeningDayTime: OpeningHoursDto = {
  allDay: true,
  closed: false,
  openingTime: '09:00',
  closingTime: '21:00',
}

export type OpeningTimesDto = Record<Day, OpeningHoursDto>;


export const defaultOpeningTimes: Record<Day, OpeningHoursDto> = {
  Mon: defaultOpeningDayTime,
  Tue: defaultOpeningDayTime,
  Wed: defaultOpeningDayTime,
  Thu: defaultOpeningDayTime,
  Fri: defaultOpeningDayTime,
  Sat: defaultOpeningDayTime,
  Sun: defaultOpeningDayTime,
};

export const isDateDisabled = (operatorOpeningTimes: OpeningTimesDto, serviceOpeningTimes: OpeningTimesDto, day: dayjs.Dayjs) => {
  const operatorOpeningTimesToday =
    (operatorOpeningTimes || defaultOpeningTimes)[dayNumberToDayMap[day.day()]];

  const serviceOpeningTimesToday =
    (serviceOpeningTimes || defaultOpeningTimes)[dayNumberToDayMap[day.day()]];

  return operatorOpeningTimesToday.closed! || serviceOpeningTimesToday.closed!;
}

export const getOpeningTimesOnDay = (openingTimes: OpeningTimesDto | undefined, date: string | undefined) => {
  const times = openingTimes || defaultOpeningTimes;
  const openingTimesOnDay: OpeningHoursDto = {
    ...defaultOpeningDayTime,
    ...times[dayNumberToDayMap[dayjs(date).day()]],
  };

  return openingTimesOnDay;
};

export const timeIsOutOfOpeningHours = (openingTimes: OpeningTimesDto | undefined, date: string | undefined, time: string | undefined) => {
  if (!openingTimes) {
    return false;
  }

  if (!date) {
    return false;
  }

  const openingTimesOnDay = getOpeningTimesOnDay(openingTimes, date);

  if (openingTimesOnDay.allDay) {
    return false;
  }

  if (openingTimesOnDay.closed) {
    return true;
  }

  const openingTime = dayjs(openingTimesOnDay.openingTime, "HH:mm");
  const closingTime = dayjs(openingTimesOnDay.closingTime, "HH:mm");

  const timeObject = dayjs(time, "HH:mm");
  const isAfterOpening =
    timeObject.hour() < openingTime.hour()
      ? false
      : timeObject.minute() >= openingTime.minute();
  const isBeforeClosing =
    timeObject.hour() > closingTime.hour()
      ? false
      : timeObject.minute() <= openingTime.minute();

  return !(isAfterOpening && isBeforeClosing);
};
