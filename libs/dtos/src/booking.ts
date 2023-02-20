import dayjs from "dayjs";
import { OperatorDto } from "./operator";
import { ServiceDto } from "./service";
import { ServiceSchemaDto } from "./service-schema";

export type BookingStatus = 'pending' | 'confirmed' | 'rejected';
export type BookingPaymentStatus = 'pending' | 'succeeded' | 'failed' | 'cancelled';

export interface PerPersonBookingPriceDetails {
  numberOfPeople: number;
}

export interface PerAdultAndChildBookingPriceDetails {
  adultGuests: number;
  childGuests: number;
}

export interface TieredBookingPriceDetails {
  tier?: string;
}

export type BookingPriceDetails = Partial<{
  perPerson: PerPersonBookingPriceDetails;
  perAdultAndChild: PerAdultAndChildBookingPriceDetails;
  tiered: TieredBookingPriceDetails;
}>;

export const getDefaultBookingPriceDetails = (schema: ServiceSchemaDto): BookingPriceDetails => ({
  perPerson: {
    numberOfPeople: 1,
  },
  perAdultAndChild: {
    adultGuests: 1,
    childGuests: 0,
  },
  tiered: {
    tier: ''
  },
})

export interface DefaultBookingFields {
  date?: string;
  time?: string;
  numberOfPeople?: number;
}

export type DefaultBookingFieldType = keyof DefaultBookingFields;

export const getDefaultDefaultBookingFields = (schema: ServiceSchemaDto): DefaultBookingFields => {
  return {
    date: schema.defaultBookingFields.includes('date') ? dayjs().add(1, "day").format("DD MMM YYYY") : undefined,
    time: schema.defaultBookingFields.includes('time') ? '09:00' : undefined,
    numberOfPeople: schema.defaultBookingFields.includes('numberOfPeople') ? 1 : 0,
  }
}

export interface BookingDto extends DefaultBookingFields {
  _id: string;
  service: ServiceDto;
  operator: OperatorDto;
  name: string;
  email: string;
  bookingDate?: Date;
  priceDetails: BookingPriceDetails;
  paymentIntentId?: string;
  paymentStatus?: BookingPaymentStatus;
  status: BookingStatus;
}

export type BookingNoId = Omit<BookingDto, '_id'>;
