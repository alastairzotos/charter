import { Field } from "formik";
import { TextField } from "formik-mui";
import React from "react";

import { BookingPriceProps } from "src/components/booking-price-forms/props";

export const PerPersonPriceDetails: React.FC<BookingPriceProps> = () => {
  return (
    <Field
      component={TextField}
      type="number"
      name="priceDetails.perPerson.numberOfPeople"
      label="Number of people"
      InputProps={{
        inputProps: {
          min: 1,
        },
      }}
    />
  );
};
