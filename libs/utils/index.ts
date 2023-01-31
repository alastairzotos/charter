import { BookingNoId, TripNoId } from 'dtos';

export const createPriceString = (
  { adultGuests, childGuests }: Pick<BookingNoId, 'adultGuests' | 'childGuests'>,
  { adultPrice, childPrice }: Pick<TripNoId, 'adultPrice' | 'childPrice'>,
) => 
  `€${(adultGuests * adultPrice + childGuests * childPrice).toFixed(2)}`;
