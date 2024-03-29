import { Field } from "formik";
import { TextField } from "formik-mui";
import React from "react";

import {
  PriceFormProps,
  pricingInputProps,
} from "components/operator/dashboard/services/price-forms/props";

export const PerPersonPriceForm: React.FC<PriceFormProps> = () => {
  return (
    <Field
      component={TextField}
      type="number"
      name="price.perPerson.price"
      label="Price per person"
      InputProps={pricingInputProps}
    />
  );
};
