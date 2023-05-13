import { InstanceDto } from "./instance";
import { getNextAvailableBookingDate } from "./opening-times";
import { OperatorDto } from "./operator";
import { ServicePricingDto } from "./pricing";
import { ServiceDto } from "./service";

export type BookingStatus = "pending" | "confirmed" | "rejected";
export type BookingPaymentStatus =
  | "pending"
  | "succeeded"
  | "failed"
  | "cancelled";

export interface PerPersonBookingPriceDetails {
  numberOfPeople: number;
}

export interface PerAdultAndChildBookingPriceDetails {
  adultGuests: number;
  childGuests: number;
}

export interface PerAgeCohortBookingPriceDetails {
  guestsInCohorts: Record<string, number>;
}

export interface TieredBookingPriceDetails {
  tier?: string;
}

export type BookingPriceDetails = Partial<{
  perPerson: PerPersonBookingPriceDetails;
  perAdultAndChild: PerAdultAndChildBookingPriceDetails;
  perAgeCohort: PerAgeCohortBookingPriceDetails;
  tiered: TieredBookingPriceDetails;
}>;

export const getDefaultBookingPriceDetails = (
  price: ServicePricingDto
): BookingPriceDetails => ({
  perPerson: {
    numberOfPeople: 1,
  },
  perAdultAndChild: {
    adultGuests: 1,
    childGuests: 0,
  },
  perAgeCohort: {
    guestsInCohorts:
      price.perAgeCohort?.ageCohorts?.reduce<Record<string, number>>(
        (acc, cur) => ({
          ...acc,
          [cur.name]: 0,
        }),
        {}
      ) || {},
  },
  tiered: {
    tier: "",
  },
});

export interface DefaultBookingFields {
  date?: string;
  time?: string;
  numberOfPeople?: number;
}

export type DefaultBookingFieldType = keyof DefaultBookingFields;

export const getDefaultDefaultBookingFields = (
  service: ServiceDto
): DefaultBookingFields => {
  const schema = service.serviceSchema;

  return {
    date: schema.defaultBookingFields.includes("date")
      ? getNextAvailableBookingDate(service).format("DD MMM YYYY")
      : undefined,
    time: schema.defaultBookingFields.includes("time") ? "09:00" : undefined,
    numberOfPeople: schema.defaultBookingFields.includes("numberOfPeople")
      ? 1
      : 0,
  };
};

export type AdditionalBookingFieldContent = string;

export interface BookingDto extends DefaultBookingFields {
  _id: string;
  service: ServiceDto;
  operator: OperatorDto;
  instance?: InstanceDto;
  name: string;
  email: string;
  phoneNumber: string;
  bookingDate?: Date;
  priceDetails: BookingPriceDetails;
  additionalFields?: Record<string, AdditionalBookingFieldContent>;
  notes?: string;
  paymentIntentId?: string;
  setupIntentId?: string;
  stripeCustomerId?: string;
  paymentStatus?: BookingPaymentStatus;
  status: BookingStatus;
  fulfilled: boolean;
}

export type BookingNoId = Omit<BookingDto, "_id">;
