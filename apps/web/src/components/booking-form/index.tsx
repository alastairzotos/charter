import { Box, Button, TextField as MuiTextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import {
  BookingNoId,
  getDefaultBookingPriceDetails,
  OperatorDto,
  ServiceDto,
} from "dtos";
import { Field, Formik } from "formik";
import { TextField } from "formik-mui";
import React, { useEffect, useState } from "react";
import { getSchemaForServiceType } from "service-schemas";
import { calculateBookingPrice, createPriceString } from "utils";

import { BookingModal } from "src/components/booking-modal";
import { BookingPaymentForm } from "src/components/booking-payment-form";
import { BookingPeoplePolicyFeedback } from "src/components/booking-people-policy-feedback";
import { BookingPriceDetails } from "src/components/booking-price-forms";
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
  const [isNumberOfPeopleInvalid, setIsNumberOfPeopleInvalid] = useState(false);

  const loggedinUser = useUserState((s) => s.loggedInUser);

  const [createBookingStatus, createBooking, bookingId] = useCreateBooking(
    (s) => [s.status, s.request, s.value]
  );

  const [paymentIntentCreateStatus, createPaymentIntent, clientSecret] =
    useCreatePaymentIntent((s) => [s.status, s.request, s.value]);

  useEffect(() => {
    if (!!bookingId) {
      createPaymentIntent(bookingId);
    }
  }, [bookingId]);

  const handleSubmit = async (booking: Omit<BookingNoId, "status">) => {
    await createBooking({ ...booking, status: "confirmed" });
  };

  const initialValues: Omit<BookingNoId, "status"> = {
    operator,
    service,
    name: loggedinUser?.givenName || "",
    email: loggedinUser?.email || "",
    date: dayjs().add(1, "day").format("DD MMM YYYY"),
    priceDetails: getDefaultBookingPriceDetails(
      getSchemaForServiceType(service.type)
    ),
  };

  const isSubmitting =
    createBookingStatus === "fetching" ||
    paymentIntentCreateStatus === "fetching";

  if (!!bookingId && !!clientSecret) {
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
          validationSchema={bookingValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid, values, setValues }) => (
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

              <MobileDatePicker
                label="Date"
                inputFormat="DD/MM/YYYY"
                disabled={isSubmitting}
                minDate={dayjs().add(1, "day")}
                value={values.date}
                onChange={(date) =>
                  setValues({ ...values, date: date!.format("DD MMM YYYY") })
                }
                renderInput={(params) => (
                  <MuiTextField {...params} disabled={isSubmitting} />
                )}
              />

              <BookingPriceDetails
                pricingStrategy={
                  getSchemaForServiceType(service.type).pricingStrategy
                }
                pricing={service.price}
              />

              <BookingPeoplePolicyFeedback
                booking={values}
                service={service}
                setError={setIsNumberOfPeopleInvalid}
              />

              <KeyValues
                sx={{ maxWidth: 300 }}
                kv={{
                  "Total Price": createPriceString(
                    calculateBookingPrice(values.priceDetails, service)
                  ),
                }}
              />

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  color="success"
                  type="submit"
                  variant="contained"
                  disabled={!isValid || isSubmitting || isNumberOfPeopleInvalid}
                >
                  Proceed to payment
                </Button>
              </Box>
            </FormBox>
          )}
        </Formik>
      </BookingModal>
    </LocalizationProvider>
  );
};
