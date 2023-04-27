import { Field } from "formik";
import { TextField } from "formik-mui";
import React from "react";

import { BookingPriceProps } from "components/user/booking/booking-price-forms/props";

export const PerAdultAndChildPriceDetails: React.FC<BookingPriceProps> = () => {
  return (
    <>
      <Field
        component={TextField}
        type="number"
        name="priceDetails.perAdultAndChild.adultGuests"
        label="Number of adults"
        InputProps={{
          inputProps: {
            min: 1,
          },
        }}
      />

      <Field
        component={TextField}
        type="number"
        name="priceDetails.perAdultAndChild.childGuests"
        label="Number of children"
        InputProps={{
          inputProps: {
            min: 0,
          },
        }}
      />
    </>
  );
};
