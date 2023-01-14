export const APP_NAME = 'BoatBooking';

export const pluralize = (num: number, item: string | { singular: string, plural: string }) =>
  typeof item === 'string'
    ? (num === 1 ? item : `${item}s`)
    : (num === 1 ? item.singular : item.plural);
