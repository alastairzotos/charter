import {
  BookingNoId,
  PerAdultAndChildBookingPriceDetails,
  PerAgeCohortBookingPriceDetails,
  PerPersonBookingPriceDetails,
  PricingStrategyType,
  TieredBookingPriceDetails,
} from "dtos";
import * as yup from "yup";

export const perPersonBookingValidationSchema: yup.SchemaOf<PerPersonBookingPriceDetails> =
  yup.object({
    numberOfPeople: yup.number().required("Number of people is required"),
  });

export const perAdultAndChildBookingValidationSchema: yup.SchemaOf<PerAdultAndChildBookingPriceDetails> =
  yup.object({
    adultGuests: yup.number().required("Number of adults is required"),
    childGuests: yup.number().required("Number of children is required"),
  });

export const perAgeCohortBookingValidationSchema: yup.SchemaOf<PerAgeCohortBookingPriceDetails> =
  yup.object({
    guestsInCohorts: yup.object(),
  });

export const tieredBookingValidationSchema: yup.SchemaOf<TieredBookingPriceDetails> =
  yup.object().shape({
    tier: yup.string().required("Price tier is required"),
  });

export const pricingStrategyValidators: Record<
  PricingStrategyType,
  yup.AnySchema
> = {
  onPremises: yup.object(),
  fixed: yup.object(),
  perPerson: yup.object({ perPerson: perPersonBookingValidationSchema }),
  perAdultAndChild: yup.object({
    perAdultAndChild: perAdultAndChildBookingValidationSchema,
  }),
  perAgeCohort: yup.object({
    perAgeCohort: perAgeCohortBookingValidationSchema,
  }),
  tiered: yup.object({ tiered: tieredBookingValidationSchema }),
};

export const bookingValidationSchema = (
  pricingType: PricingStrategyType
): yup.SchemaOf<
  Omit<
    BookingNoId,
    | "operator"
    | "status"
    | "service"
    | "paymentIntentId"
    | "paymentStatus"
    | "setupIntentId"
    | "stripeCustomerId"
    | "fulfilled"
    | "instance"
  >
> =>
  yup.object().shape({
    name: yup.string().required("Enter your name"),
    email: yup
      .string()
      .required("Enter your email")
      .email("Enter a valid email address"),
    bookingDate: yup.date(),
    priceDetails: pricingStrategyValidators[pricingType] as any,
    date: yup.string().notRequired(),
    time: yup.string().notRequired(),
    numberOfPeople: yup.number().notRequired(),
    additionalFields: yup.object().notRequired(),
    notes: yup.string().notRequired(),
  });
