import { TextField } from "@mui/material";
import React from "react";

import { BookingDefaultFormsProps } from "src/components/booking-default-forms/props";

export const BookingTimeForm: React.FC<BookingDefaultFormsProps> = ({
  values,
  setValues,
  isSubmitting,
}) => {
  return (
    <TextField
      label="Time"
      type="time"
      value={values.time}
      onChange={(e) => setValues({ ...values, time: e.currentTarget.value })}
      disabled={!!isSubmitting}
      inputProps={{ step: 300 }}
    />
  );
};
