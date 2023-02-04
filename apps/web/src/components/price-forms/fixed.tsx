import { Field } from "formik";
import { TextField } from "formik-mui";
import React from "react";

export const FixedPriceForm: React.FC = () => {
  return (
    <Field
      component={TextField}
      type="number"
      name="price.fixed.price"
      label="Price"
    />
  );
};
