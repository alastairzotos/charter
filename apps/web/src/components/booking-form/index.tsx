import { Box, Button, Typography } from "@mui/material";
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
import React, { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { urls } from "urls";
import { calculateBookingPrice, createPriceString } from "utils";

import { BookingAdditionalForms } from "components/booking-additonal-forms";
import { BookingDefaultForms } from "components/booking-default-forms";
import { BookingPayLaterForm } from "components/booking-payment-forms/booking-pay-later-form";
import { BookingPayNowForm } from "components/booking-payment-forms/booking-pay-now-form";
import { BookingPeoplePolicyFeedback } from "components/booking-people-policy-feedback";
import { BookingPriceDetails } from "components/booking-price-forms";
import { DefaultErrorFallback } from "components/default-error-fallback";
import { FormBox } from "components/form-box";
import { KeyValues } from "components/key-values";
import { TAndCCheckbox } from "components/t-and-c-checkbox";
import { TabsView, TabsProvider } from "components/tabs";
import { TabsPrevNextButtons } from "components/tabs/prev-next-buttons";
import { bookingValidationSchema } from "schemas";
import { useCreateBooking } from "state/bookings";
import { useUserState } from "state/users";

interface Props {
  service: ServiceDto;

  onClose: () => void;
}

export const BookingForm: React.FC<Props> = ({ service, onClose }) => {
  const schema = service.serviceSchema;

  const [isNumberOfPeopleInvalid, setIsNumberOfPeopleInvalid] = useState(false);
  const [tAndCsAccepted, setTAndCsAccepted] = useState(false);

  const loggedInUser = useUserState((s) => s.loggedInUser);

  const [createBookingStatus, createBooking, booking] = useCreateBooking(
    (s) => [s.status, s.request, s.value]
  );

  useEffect(() => {
    if (!!booking?._id && !schema.shouldPayNow) {
      // router.push() doesn't work here for some reason
      window.location.href = urls.user.booking(booking._id);
    }
  }, [booking?._id]);

  const handleSetNumberOfPeopleInvalid = (invalid: boolean) => {
    if (invalid !== isNumberOfPeopleInvalid) {
      setIsNumberOfPeopleInvalid(invalid);
    }
  };

  const handleSubmit = async (booking: Omit<BookingNoId, "status">) =>
    await createBooking({ ...booking, status: "pending" });

  const initialValues: Omit<BookingNoId, "status"> = {
    operator: service.operator,
    service,
    name: loggedInUser?.givenName || "",
    email: loggedInUser?.email || "",
    priceDetails: getDefaultBookingPriceDetails(service.price),
    additionalFields: {},
    fulfilled: false,
    ...getDefaultDefaultBookingFields(service),
  };

  console.log(initialValues);

  const isSubmitting = createBookingStatus === "fetching";

  if (!!booking && schema.shouldPayNow) {
    if (service.approveBookingBeforePayment) {
      return <BookingPayLaterForm booking={booking} service={service} />;
    } else {
      return <BookingPayNowForm booking={booking} service={service} />;
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <>
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
                title={`Book ${service.name} by ${service.operator.name}`}
                onClose={onClose}
              >
                <TabsProvider
                  tabs={[
                    {
                      label: "Basics",
                      content: (
                        <>
                          <Field
                            component={TextField}
                            name="name"
                            label="Your name"
                          />

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
                        </>
                      ),
                    },

                    {
                      label: "Booking details",
                      content: (
                        <>
                          <BookingPriceDetails
                            pricingStrategy={schema.pricingStrategy}
                            pricing={service.price}
                            priceDetails={values.priceDetails}
                            setPriceDetails={(priceDetails) =>
                              setValues({ ...values, priceDetails })
                            }
                          />

                          <BookingPeoplePolicyFeedback
                            booking={values}
                            service={service}
                            setError={handleSetNumberOfPeopleInvalid}
                          />
                        </>
                      ),
                    },

                    {
                      label: "Additional details",
                      content: (
                        <>
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

                          <TAndCCheckbox
                            accepted={tAndCsAccepted}
                            setAccepted={setTAndCsAccepted}
                          />

                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <Button
                              color="success"
                              type="submit"
                              variant="contained"
                              disabled={
                                !isValid ||
                                isSubmitting ||
                                isNumberOfPeopleInvalid ||
                                !tAndCsAccepted ||
                                calculateBookingPrice(
                                  values.priceDetails,
                                  service
                                ) <= 0
                              }
                            >
                              {schema.shouldPayNow
                                ? "Enter payment details"
                                : "Book now"}
                            </Button>
                          </Box>

                          {service.approveBookingBeforePayment && (
                            <Typography
                              variant="caption"
                              sx={{ textAlign: "center", mt: 1 }}
                            >
                              No payment will be taken until the operator has
                              approved your booking
                            </Typography>
                          )}
                        </>
                      ),
                    },
                  ]}
                >
                  <TabsView />

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

                  <TabsPrevNextButtons />
                </TabsProvider>
              </FormBox>
            </ErrorBoundary>
          )}
        </Formik>
      </>
    </LocalizationProvider>
  );
};
