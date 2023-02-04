import { Field } from "formik";
import { TextField } from "formik-mui";
import React from "react";

export const PerPersonPriceDetails: React.FC = () => {
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
