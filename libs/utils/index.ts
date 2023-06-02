import {
  BookingDto,
  BookingNoId,
  BookingPriceDetails,
  PricingStrategyType,
  ServiceNoId,
} from "dtos";

export type ExtractInterface<T> = Pick<T, keyof T>;

const calculateBookingPriceBase = (
  bookingDetails: BookingPriceDetails,
  service: ServiceNoId
) => {
  switch (service.serviceSchema.pricingStrategy) {
    case "onPremises":
      return -1;
    case "fixed":
      return service.price.fixed?.price || 0;
    case "perPerson":
      return (
        (service.price.perPerson?.price || 0) *
        (bookingDetails.perPerson?.numberOfPeople || 0)
      );
    case "perAdultAndChild":
      return (
        (service.price.perAdultAndChild?.adultPrice || 0) *
          (bookingDetails.perAdultAndChild?.adultGuests! || 0) +
        (service.price.perAdultAndChild?.childPrice || 0) *
          (bookingDetails.perAdultAndChild?.childGuests! || 0)
      );
    case "perAgeCohort":
      return Object.keys(
        bookingDetails.perAgeCohort?.guestsInCohorts || {}
      ).reduce(
        (acc, cohort) =>
          acc +
          (service.price.perAgeCohort?.ageCohorts.find((c) => c.name === cohort)
            ?.price || 0) *
            (bookingDetails.perAgeCohort?.guestsInCohorts[cohort] || 0),
        0
      );
    case "tiered":
      return (
        service.price.tiered?.tiers.find(
          (tier) => tier.name === bookingDetails.tiered?.tier
        )?.rate || 0
      );
  }
};

export const BOOKING_FEE_PERCENTAGE = 3;

const calculateBookingFeeFromBasePrice = (basePrice: number) =>
  basePrice * (BOOKING_FEE_PERCENTAGE / 100);

export const calculateBookingFee = (
  bookingDetails: BookingPriceDetails,
  service: ServiceNoId
) =>
  calculateBookingFeeFromBasePrice(
    calculateBookingPriceBase(bookingDetails, service)
  );

export const calculateBookingPrice = (
  bookingDetails: BookingPriceDetails,
  service: ServiceNoId
) => {
  const basePrice = calculateBookingPriceBase(bookingDetails, service);

  return basePrice + calculateBookingFeeFromBasePrice(basePrice);
};

export const isValidBookingPrice = (
  bookingDetails: BookingPriceDetails,
  service: ServiceNoId
) => {
  if (service.serviceSchema.pricingStrategy === "onPremises") {
    return true;
  }

  return calculateBookingPrice(bookingDetails, service) > 0;
};

export const createPriceString = (price: number) => `€${price.toFixed(2)}`;

const priceOrFree = (price: number) =>
  price === 0 ? "Free" : createPriceString(price);

export const getReadablePricingStringsForService = (
  service: ServiceNoId
): Record<string, string> => {
  switch (service.serviceSchema.pricingStrategy) {
    case "onPremises":
      return {};
    case "fixed":
      return { Price: createPriceString(service.price.fixed?.price || 0) };
    case "perPerson":
      return {
        "Price per person": priceOrFree(service.price.perPerson?.price || 0),
      };
    case "perAdultAndChild":
      return {
        "Price per adult": priceOrFree(
          service.price.perAdultAndChild?.adultPrice || 0
        ),
        "Price per child": priceOrFree(
          service.price.perAdultAndChild?.childPrice || 0
        ),
      };
    case "perAgeCohort":
      return service.price.perAgeCohort!.ageCohorts.reduce<
        Record<string, string>
      >(
        (acc, cohort) => ({
          ...acc,
          [`Price for ${cohort.name.toLocaleLowerCase()} (Ages ${
            cohort.toAge === 100
              ? `${cohort.fromAge}+`
              : `${cohort.fromAge} to ${cohort.toAge}`
          })`]: priceOrFree(cohort.price),
        }),
        {}
      );
    case "tiered":
      return (service.price.tiered?.tiers || []).reduce(
        (acc, { name, rate }) => ({
          ...acc,
          [name]: priceOrFree(rate || 0),
        }),
        {} as Record<string, string>
      );
  }
};

export const getReadableBookingDetails = (
  booking: BookingNoId
): Record<string, string> => {
  const schema = booking.service.serviceSchema;

  let obj: Record<string, string> = {
    Name: booking.name,
  };

  const hideContactDetails =
    booking.service.approveBookingBeforePayment &&
    booking.paymentStatus === "pending";

  if (!hideContactDetails) {
    obj["Email"] = booking.email;
    obj["Phone"] = booking.phoneNumber;
  }

  if (schema.defaultBookingFields.includes("date")) {
    obj["Date"] = booking.date!;
  }

  if (schema.defaultBookingFields.includes("time")) {
    obj["Time"] = booking.time!;
  }

  if (schema.defaultBookingFields.includes("numberOfPeople")) {
    obj["Number of people"] = `${booking.numberOfPeople!}`;
  }

  switch (schema.pricingStrategy) {
    case "onPremises":
      break;
    case "fixed":
      break;

    case "perPerson":
      obj[
        "Number of people"
      ] = `${booking.priceDetails.perPerson?.numberOfPeople}`;
      break;

    case "perAdultAndChild":
      obj[
        "Number of adults"
      ] = `${booking.priceDetails.perAdultAndChild?.adultGuests}`;
      obj[
        "Number of children"
      ] = `${booking.priceDetails.perAdultAndChild?.childGuests}`;
      break;

    case "perAgeCohort":
      Object.keys(
        booking.priceDetails.perAgeCohort?.guestsInCohorts || {}
      ).forEach((key) => {
        obj[
          `Number of ${key.toLocaleLowerCase()}`
        ] = `${booking.priceDetails.perAgeCohort?.guestsInCohorts[key]}`;
      });
      break;

    case "tiered":
      obj["Tier"] = booking.priceDetails.tiered?.tier || "";
      break;
  }

  if (!!booking.additionalFields) {
    Object.keys(booking.additionalFields).map((key) => {
      const schemaField =
        booking.service.serviceSchema.additionalBookingFields.find(
          (field) => field.key === key
        );

      if (schemaField) {
        const value = booking.additionalFields?.[key];

        if (value) {
          if (schemaField.type === "number") {
            obj[schemaField.title] = `${value}`;
          } else if (schemaField.type === "boolean") {
            obj[schemaField.title] = value ? "Yes" : "No";
          } else {
            obj[schemaField.title] = value as string;
          }
        }
      }
    });
  }

  if (!!booking.notes) {
    obj["Notes"] = booking.notes;
  }

  if (schema.shouldPayNow) {
    obj["Price"] = createPriceString(
      calculateBookingPrice(booking.priceDetails, booking.service)
    );
  }

  return obj;
};

export const calculateBookingTotalPeople = (
  booking: BookingNoId,
  service: ServiceNoId
): number | undefined => {
  switch (service.serviceSchema.pricingStrategy) {
    case "perPerson":
      return booking.priceDetails.perPerson?.numberOfPeople;
    case "perAdultAndChild":
      return (
        (booking.priceDetails.perAdultAndChild?.adultGuests || 0) +
        (booking.priceDetails.perAdultAndChild?.childGuests || 0)
      );
    case "perAgeCohort":
      return Object.values(
        booking.priceDetails.perAgeCohort?.guestsInCohorts || {}
      ).reduce((acc, c) => acc + c, 0);
    case "fixed":
    case "tiered":
      return undefined;
  }
};

export const bookingSatisfiesPeoplePolicy = (
  booking: BookingNoId,
  service: ServiceNoId
): "unknown" | "too-many" | "too-few" | "okay" => {
  const totalPeople = calculateBookingTotalPeople(booking, service);

  if (totalPeople === undefined) {
    return "unknown";
  }

  if (service.maxPeople !== null && totalPeople > service.maxPeople) {
    return "too-many";
  }

  if (service.minPeople !== null && totalPeople < service.minPeople) {
    return "too-few";
  }

  return "okay";
};

export const pricingStrategyProvidesNumberOfPeople = (
  pricingStrategy: PricingStrategyType
) =>
  (
    ["perAdultAndChild", "perAgeCohort", "perPerson"] as PricingStrategyType[]
  ).includes(pricingStrategy);

export const getQrCodeFilePathForBooking = (booking: BookingDto) =>
  `qr-code:${booking._id}`;

export const showBookingDetailsForm = (service: ServiceNoId) => {
  const schema = service.serviceSchema;

  const showPriceDetailsForm =
    schema.pricingStrategy !== "onPremises" &&
    schema.pricingStrategy !== "fixed";
  const showBookingPeoplePrompt =
    service.maxPeople !== null || service.minPeople !== null;

  return showPriceDetailsForm || showBookingPeoplePrompt;
};

export const DEFAULT_OPERATOR_PASSWORD = "password";
