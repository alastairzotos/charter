import {
  BookingNoId,
  PerAdultAndChildBookingPriceDetails,
  PerAdultAndChildPriceDto,
  PerAgeCohortBookingPriceDetails,
  PerAgeCohortPriceDto,
  PerPersonBookingPriceDetails,
  PriceDto,
  PricingStrategyType,
  ServiceNoId,
  ServicePricingDto,
  TieredBookingPriceDetails,
  TieredPriceDto,
} from "dtos";
import * as yup from "yup";

export const basicPriceValidationSchema: yup.SchemaOf<PriceDto> = yup
  .object()
  .shape({
    price: yup.number().required("Price is required"),
  });

export const perAdultAndChildValidationSchema: yup.SchemaOf<PerAdultAndChildPriceDto> =
  yup.object().shape({
    adultPrice: yup.number().required("Adult price is required"),
    childPrice: yup.number().required("Child price is required"),
  });

export const perAgeCohortValidationSchema: yup.SchemaOf<PerAgeCohortPriceDto> =
  yup.object().shape({
    ageCohorts: yup.array().of(
      yup.object({
        name: yup.string().required("Name is required"),
        fromAge: yup.number().required("Age is required"),
        toAge: yup.number().required("Age is required"),
        price: yup.number().required("Price is required"),
      })
    ),
  });

export const tieredValidationSchema: yup.SchemaOf<TieredPriceDto> = yup
  .object()
  .shape({
    tiers: yup.array(),
  });

export const priceValidationSchema: yup.SchemaOf<
  Omit<ServicePricingDto, "onPremises">
> = yup.object().shape({
  fixed: basicPriceValidationSchema.optional(),
  perPerson: basicPriceValidationSchema.optional(),
  perAdultAndChild: perAdultAndChildValidationSchema.optional(),
  perAgeCohort: perAgeCohortValidationSchema.optional(),
  tiered: tieredValidationSchema.optional(),
});

export const serviceValidationSchema: yup.SchemaOf<
  Omit<
    ServiceNoId,
    | "type"
    | "operator"
    | "minPeople"
    | "maxPeople"
    | "numberOfBookings"
    | "openingTimes"
    | "price"
  >
> = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  content: yup.object(),
  // price: yup.object(), // TODO: Use this. It won't let me save when creating a service -> priceValidationSchema,
  photos: yup.array().of(yup.string().required("Photo is required")),
  data: yup.object(),
  serviceSchema: yup.object(),
  hidden: yup.boolean() as any,
  approveBookingBeforePayment: yup.boolean() as any,
  hasCutoffDays: yup.boolean(),
  cutoffDays: yup.number(),
});

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
