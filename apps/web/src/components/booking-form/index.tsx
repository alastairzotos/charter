import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  BookingNoId,
  getDefaultBookingPriceDetails,
  getDefaultDefaultBookingFields,
  OperatorDto,
  ServiceDto,
} from "dtos";
import { Field, Formik } from "formik";
import { TextField } from "formik-mui";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { urls } from "urls";
import { calculateBookingPrice, createPriceString } from "utils";

import { BookingAdditionalForms } from "src/components/booking-additonal-forms";
import { BookingDefaultForms } from "src/components/booking-default-forms";
import { BookingModal } from "src/components/booking-modal";
import { BookingPaymentForm } from "src/components/booking-payment-form";
import { BookingPeoplePolicyFeedback } from "src/components/booking-people-policy-feedback";
import { BookingPriceDetails } from "src/components/booking-price-forms";
import { DefaultErrorFallback } from "src/components/default-error-fallback";
import { FormBox } from "src/components/form-box";
import { KeyValues } from "src/components/key-values";
import { bookingValidationSchema } from "src/schemas";
import { useCreateBooking } from "src/state/bookings";
import { useCreatePaymentIntent } from "src/state/payments";
import { useUserState } from "src/state/users";

interface Props {
  operator: OperatorDto;
  service: ServiceDto;

  onClose: () => void;
}

export const BookingForm: React.FC<Props> = ({
  operator,
  service,
  onClose,
}) => {
  const schema = service.serviceSchema;

  const [isNumberOfPeopleInvalid, setIsNumberOfPeopleInvalid] = useState(false);
  const [tAndCsAccepted, setTAndCsAccepted] = useState(false);

  const loggedinUser = useUserState((s) => s.loggedInUser);

  const [createBookingStatus, createBooking, bookingId] = useCreateBooking(
    (s) => [s.status, s.request, s.value]
  );

  const [paymentIntentCreateStatus, createPaymentIntent, clientSecret] =
    useCreatePaymentIntent((s) => [s.status, s.request, s.value]);

  useEffect(() => {
    if (!!bookingId) {
      if (schema.shouldPayNow) {
        createPaymentIntent(bookingId);
      } else {
        // router.push() doesn't work here for some reason
        window.location.href = urls.user.booking(bookingId);
      }
    }
  }, [bookingId]);

  const handleSubmit = async (booking: Omit<BookingNoId, "status">) =>
    await createBooking({ ...booking, status: "confirmed" });

  const initialValues: Omit<BookingNoId, "status"> = {
    operator,
    service,
    name: loggedinUser?.givenName || "",
    email: loggedinUser?.email || "",
    priceDetails: getDefaultBookingPriceDetails(),
    additionalFields: {},
    ...getDefaultDefaultBookingFields(schema),
  };

  const isSubmitting =
    createBookingStatus === "fetching" ||
    paymentIntentCreateStatus === "fetching";

  if (!!bookingId && !!clientSecret && schema.shouldPayNow) {
    return (
      <BookingPaymentForm
        paymentIntentCreateStatus={paymentIntentCreateStatus}
        clientSecret={clientSecret}
        bookingId={bookingId}
      />
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BookingModal>
        <Formik
          initialValues={initialValues}
          validationSchema={bookingValidationSchema(schema.pricingStrategy)}
          onSubmit={handleSubmit}
        >
          {({ isValid, values, setValues }) => (
            <ErrorBoundary
              FallbackComponent={DefaultErrorFallback}
              onReset={() => setValues(initialValues)}
              resetKeys={[initialValues]}
            >
              <FormBox
                title={`Book ${service.name} by ${operator.name}`}
                onClose={onClose}
              >
                <Field component={TextField} name="name" label="Your name" />

                <Field
                  component={TextField}
                  name="email"
                  label="Your email address"
                  type="email"
                />

                <BookingDefaultForms
                  schema={schema}
                  values={values}
                  setValues={setValues}
                  isSubmitting={isSubmitting}
                />

                <BookingPriceDetails
                  pricingStrategy={schema.pricingStrategy}
                  pricing={service.price}
                />

                <BookingPeoplePolicyFeedback
                  booking={values}
                  service={service}
                  setError={setIsNumberOfPeopleInvalid}
                />

                <BookingAdditionalForms
                  schema={schema}
                  values={values}
                  setValues={setValues}
                  isSubmitting={isSubmitting}
                />

                <Field
                  component={TextField}
                  name="notes"
                  label="Additional notes"
                  multiline
                  rows={4}
                />

                {schema.shouldPayNow && (
                  <KeyValues
                    kv={{
                      "Total Price (all taxes and fees included)":
                        createPriceString(
                          calculateBookingPrice(values.priceDetails, service)
                        ),
                    }}
                  />
                )}

                <FormControlLabel
                  label={
                    <Typography fontSize="small" color="GrayText">
                      I accept the{" "}
                      <Link
                        href={urls.user.terms()}
                        target="_blank"
                        style={{ textDecoration: "none" }}
                      >
                        terms and conditions
                      </Link>
                    </Typography>
                  }
                  control={
                    <Checkbox
                      checked={tAndCsAccepted}
                      onChange={(e) =>
                        setTAndCsAccepted(e.currentTarget.checked)
                      }
                    />
                  }
                />

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    color="success"
                    type="submit"
                    variant="contained"
                    disabled={
                      !isValid ||
                      isSubmitting ||
                      isNumberOfPeopleInvalid ||
                      !tAndCsAccepted ||
                      calculateBookingPrice(values.priceDetails, service) <= 0
                    }
                  >
                    {schema.shouldPayNow ? "Proceed to payment" : "Book now"}
                  </Button>
                </Box>
              </FormBox>
            </ErrorBoundary>
          )}
        </Formik>
      </BookingModal>
    </LocalizationProvider>
  );
};
