import { Field } from "formik";
import { TextField } from "formik-mui";
import React from "react";

import {
  PriceFormProps,
  pricingInputProps,
} from "components/operator/dashboard/services/price-forms/props";

export const PerAdultAndChildPriceForm: React.FC<PriceFormProps> = () => {
  return (
    <>
      <Field
        component={TextField}
        type="number"
        name="price.perAdultAndChild.adultPrice"
        label="Price per adult"
        InputProps={pricingInputProps}
      />
      <Field
        component={TextField}
        type="number"
        name="price.perAdultAndChild.childPrice"
        label="Price per child"
        InputProps={pricingInputProps}
      />
    </>
  );
};
