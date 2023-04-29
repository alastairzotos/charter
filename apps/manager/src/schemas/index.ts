import {
  InstanceNoId,
  OperatorNoId,
  PerAdultAndChildPriceDto,
  PerAgeCohortPriceDto,
  PriceDto,
  ServiceNoId,
  ServicePricingDto,
  TieredPriceDto,
} from "dtos";
import * as yup from "yup";

export const instanceValidationSchema: yup.SchemaOf<InstanceNoId> = yup
  .object()
  .shape({
    name: yup.string().required("Name is required"),
    admins: yup.array().of(yup.object()).notRequired(),
  });

export const operatorValidationSchema: yup.SchemaOf<
  Omit<OperatorNoId, "owner" | "slug" | "instance">
> = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  phoneNumber: yup.string().required("Phone number is required"),
  description: yup.string().required("Description is required"),
  photo: yup.string().required("Photo is required"),
  openingTimes: yup.object(),
});

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
    | "slug"
    | "type"
    | "operator"
    | "minPeople"
    | "maxPeople"
    | "numberOfBookings"
    | "openingTimes"
    | "price"
    | "instance"
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
