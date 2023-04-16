import { TextField } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import { getNextAvailableBookingDate, isDateDisabled } from "dtos";
import React from "react";

import { BookingDefaultFormsProps } from "src/components/booking-default-forms/props";

export const BookingDateForm: React.FC<BookingDefaultFormsProps> = ({
  values,
  setValues,
  isSubmitting,
}) => {
  return (
    <MobileDatePicker
      label="Date"
      inputFormat="DD/MM/YYYY"
      disabled={isSubmitting}
      minDate={getNextAvailableBookingDate(values.service)}
      value={values.date}
      onChange={(date) =>
        setValues({
          ...values,
          date: (date! as dayjs.Dayjs).format("DD MMM YYYY"),
        })
      }
      renderInput={(params) => (
        <TextField {...params} disabled={isSubmitting} />
      )}
      shouldDisableDate={(day) => isDateDisabled(values, day as dayjs.Dayjs)}
    />
  );
};
