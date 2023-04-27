import { TextField } from "@mui/material";
import React from "react";

import { BookingDefaultFormsProps } from "components/booking-form/booking-default-forms/props";

export const BookingNumberOfPeopleForm: React.FC<BookingDefaultFormsProps> = ({
  values,
  setValues,
  isSubmitting,
}) => {
  return (
    <TextField
      label="Number of people"
      type="number"
      value={values.numberOfPeople}
      onChange={(e) =>
        setValues({
          ...values,
          numberOfPeople: parseInt(e.currentTarget.value, 10),
        })
      }
      disabled={!!isSubmitting}
      inputProps={{ min: 1 }}
    />
  );
};
