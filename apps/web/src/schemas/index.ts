import {
  BookingNoId,
  BookingPriceDetails,
  PerAdultAndChildBookingPriceDetails,
  PerAdultAndChildPriceDto,
  PerPersonBookingPriceDetails,
  PriceDto,
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

export const tieredValidationSchema: yup.SchemaOf<TieredPriceDto> =
  yup.object();

export const priceValidationSchema: yup.SchemaOf<ServicePricingDto> = yup
  .object()
  .shape({
    fixed: basicPriceValidationSchema.optional(),
    perPerson: basicPriceValidationSchema.optional(),
    perAdultAndChild: perAdultAndChildValidationSchema.optional(),
    tiered: tieredValidationSchema.optional(),
  });

export const serviceValidationSchema: yup.SchemaOf<
  Omit<
    ServiceNoId,
    "type" | "operator" | "minPeople" | "maxPeople" | "numberOfBookings"
  >
> = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  price: yup.object(), // TODO: Use this. It won't let me save when creating a service -> priceValidationSchema,
  photos: yup.array().of(yup.string().required("Photo is required")),
  data: yup.object(),
});

export const perPersonBookingValidationSchema: yup.SchemaOf<PerPersonBookingPriceDetails> =
  yup.object().shape({
    numberOfPeople: yup.number().required("Number of people is required"),
  });

export const perAdultAndChildBookingValidationSchema: yup.SchemaOf<PerAdultAndChildBookingPriceDetails> =
  yup.object().shape({
    adultGuests: yup.number().required("Number of adults is required"),
    childGuests: yup.number().required("Number of children is required"),
  });

export const tieredBookingValidationSchema: yup.SchemaOf<TieredBookingPriceDetails> =
  yup.object().shape({
    tier: yup.string().required(),
  });

export const priceDetailsValidationSchema: yup.SchemaOf<BookingPriceDetails> =
  yup.object().shape({
    perPerson: perPersonBookingValidationSchema.optional(),
    perAdultAndChild: perAdultAndChildBookingValidationSchema.optional(),
    tiered: tieredBookingValidationSchema.optional(),
  });

export const bookingValidationSchema: yup.SchemaOf<
  Omit<BookingNoId, "operator" | "status" | "service" | "paymentStatus">
> = yup.object().shape({
  name: yup.string().required("Enter your name"),
  email: yup
    .string()
    .required("Enter your email")
    .email("Enter a valid email address"),
  date: yup.string().required("Enter your departure date"),
  priceDetails: priceDetailsValidationSchema,
  bookingDate: yup.date(),
  paymentIntentId: yup.string().optional(),
  paymentStatus: yup.string().optional(),
});
