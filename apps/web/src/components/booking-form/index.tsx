import {
  Box,
  Button,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
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
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { getSchemaForServiceType } from "service-schemas";
import { urls } from "urls";
import { calculateBookingPrice, createPriceString } from "utils";

import { BookingPriceDetails } from "src/components/booking-price-forms";
import { FormBox } from "src/components/form-box";
import { KeyValues } from "src/components/key-values";
import { bookingValidationSchema } from "src/schemas";
import { useCreateBooking } from "src/state/bookings";
import { useUserState } from "src/state/users";

const bookingModalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

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
  const router = useRouter();

  const loggedinUser = useUserState((s) => s.loggedInUser);

  const [createBookingStatus, createBooking, bookingId] = useCreateBooking(
    (s) => [s.status, s.request, s.value]
  );
  const clearBooking = () =>
    useCreateBooking.setState({ value: null, status: undefined });

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

  useEffect(() => {
    if (!!bookingId) {
      clearBooking();
      router.push(urls.user.booking(bookingId));
    }
  }, [bookingId]);

  const isSubmitting = createBookingStatus === "fetching";

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={bookingModalStyle}>
        <Formik
          initialValues={initialValues}
          validationSchema={bookingValidationSchema}
          onSubmit={(values) =>
            createBooking({
              ...values,
              status: "confirmed",
            })
          }
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
                  disabled={!isValid || isSubmitting}
                >
                  Book now
                </Button>
              </Box>

              {createBookingStatus === "error" && (
                <Typography>
                  There was an error creating your booking. Please try again
                  later.
                </Typography>
              )}
            </FormBox>
          )}
        </Formik>
      </Box>
    </LocalizationProvider>
  );
};
