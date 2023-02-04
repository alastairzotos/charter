import { Field } from "formik";
import { TextField } from "formik-mui";
import React from "react";

export const PerPersonPriceForm: React.FC = () => {
  return (
    <Field
      component={TextField}
      type="number"
      name="price.perPerson.price"
      label="Price per person"
    />
  );
};
