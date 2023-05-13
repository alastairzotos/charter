import { Box, Button, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  BookingNoId,
  getDefaultBookingPriceDetails,
  getDefaultDefaultBookingFields,
  ServiceDto,
} from "dtos";
import { Field, Formik } from "formik";
import { TextField } from "formik-mui";
import MuiPhoneNumber from "material-ui-phone-number";
import React, { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  DefaultErrorFallback,
  FormBox,
  KeyValues,
  TabsView,
  TabsPrevNextButtons,
  TabsProvider,
} from "ui";
import { urls } from "urls";
import {
  calculateBookingPrice,
  createPriceString,
  isValidBookingPrice,
  showBookingDetailsForm,
} from "utils";

import { BookingAdditionalForms } from "components/booking-form/booking-additonal-forms";
import { BookingDefaultForms } from "components/booking-form/booking-default-forms";
import { BookingPayLaterForm } from "components/booking-form/booking-payment-forms/booking-pay-later-form";
import { BookingPayNowForm } from "components/booking-form/booking-payment-forms/booking-pay-now-form";
import { BookingPeoplePolicyFeedback } from "components/booking-form/booking-people-policy-feedback";
import { BookingPriceDetails } from "components/booking-form/booking-price-forms";
import { TAndCCheckbox } from "components/booking-form/t-and-c-checkbox";
import { bookingValidationSchema } from "schemas";
import { useCreateBooking } from "state/bookings";

interface Props {
  service: ServiceDto;

  onClose: () => void;
}

export const BookingForm: React.FC<Props> = ({ service, onClose }) => {
  const schema = service.serviceSchema;

  const [isNumberOfPeopleInvalid, setIsNumberOfPeopleInvalid] = useState(false);
  const [tAndCsAccepted, setTAndCsAccepted] = useState(false);

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
    name: "",
    email: "",
    phoneNumber: "",
    priceDetails: getDefaultBookingPriceDetails(service.price),
    additionalFields: {},
    fulfilled: false,
    ...getDefaultDefaultBookingFields(service),
  };

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

                          <MuiPhoneNumber
                            value={values.phoneNumber}
                            onChange={(e) =>
                              setValues({
                                ...values,
                                phoneNumber: e.toString(),
                              })
                            }
                            defaultCountry="gb"
                            variant="outlined"
                            type="tel"
                            placeholder="Your phone number"
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
                      content: showBookingDetailsForm(service) ? (
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
                      ) : null,
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
                                !isValidBookingPrice(
                                  values.priceDetails,
                                  service
                                )
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
