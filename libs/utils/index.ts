import { BookingNoId, BookingPriceDetails, ServiceNoId } from 'dtos';
import { getSchemaForServiceType } from 'service-schemas';

export type ExtractInterface<T> = Pick<T, keyof T>;

export const calculateBookingPrice = (bookingDetails: BookingPriceDetails, service: ServiceNoId) => {
  const schema = getSchemaForServiceType(service.type);

  switch (schema.pricingStrategy) {
    case 'fixed': return service.price.fixed?.price || 0;
    case 'perPerson': return (service.price.perPerson?.price || 0) * (bookingDetails.perPerson?.numberOfPeople || 0);
    case 'perAdultAndChild':
      return (
        (service.price.perAdultAndChild?.adultPrice || 0) * (bookingDetails.perAdultAndChild?.adultGuests! || 0) +
        (service.price.perAdultAndChild?.childPrice || 0) * (bookingDetails.perAdultAndChild?.childGuests! || 0)
      );
  }
}

export const createPriceString = (price: number) =>
  `€${price.toFixed(2)}`;

export const getReadablePricingStringsForService = (service: ServiceNoId): Record<string, string> => {
  const schema = getSchemaForServiceType(service.type);
  
  switch (schema.pricingStrategy) {
    case 'fixed': return { Price: createPriceString(service.price.fixed?.price!) };
    case 'perPerson': return { "Price per person": createPriceString(service.price.perPerson?.price!) };
    case 'perAdultAndChild':
      return {
        "Price per adult": createPriceString(service.price.perAdultAndChild?.adultPrice!),
        "Price per child": createPriceString(service.price.perAdultAndChild?.childPrice!)
      }
  }
}

export const getReadableBookingDetails = (booking: BookingNoId): Record<string, string> => {
  const schema = getSchemaForServiceType(booking.service.type);

  switch (schema.pricingStrategy) {
    case 'fixed': return {};
    case 'perPerson': return { 'Number of people': `${booking.priceDetails.perPerson?.numberOfPeople}` };
    case 'perAdultAndChild':
      return {
        'Number of adults': `${booking.priceDetails.perAdultAndChild?.adultGuests}`,
        'Number of children': `${booking.priceDetails.perAdultAndChild?.childGuests}`,
      }
  }
}

export const calculateBookingTotalPeople = (booking: BookingNoId): number | undefined => {
  const schema = getSchemaForServiceType(booking.service.type);

  switch (schema.pricingStrategy) {
    case 'fixed': return undefined;
    case 'perPerson': return booking.priceDetails.perPerson?.numberOfPeople;
    case 'perAdultAndChild':
        return (booking.priceDetails.perAdultAndChild?.adultGuests || 0) + (booking.priceDetails.perAdultAndChild?.childGuests || 0);
  }
}

export const bookingSatisfiesPeoplePolicy = (booking: BookingNoId, service: ServiceNoId): 'unknown' | 'too-many' | 'too-few' | 'okay' => {
  const totalPeople = calculateBookingTotalPeople(booking);

  if (totalPeople === undefined) {
    return 'unknown';
  }

  if (service.maxPeople !== null && totalPeople > service.maxPeople) {
    return 'too-many';
  }

  if (service.minPeople !== null && totalPeople < service.minPeople) {
    return 'too-few';
  }

  return 'okay';
}
