import { BookingNoId, ServiceNoId } from 'dtos';

export const createPriceString = (
  { adultGuests, childGuests }: Pick<BookingNoId, 'adultGuests' | 'childGuests'>,
  { adultPrice, childPrice }: Pick<ServiceNoId, 'adultPrice' | 'childPrice'>,
) => 
  `€${(adultGuests * adultPrice + childGuests * childPrice).toFixed(2)}`;
