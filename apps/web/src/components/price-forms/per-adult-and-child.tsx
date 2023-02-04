import { Field } from "formik";
import { TextField } from "formik-mui";
import React from "react";

export const PerAdultAndChildPriceForm: React.FC = () => {
  return (
    <>
      <Field
        component={TextField}
        type="number"
        name="price.perAdultAndChild.adultPrice"
        label="Price per adult"
      />
      <Field
        component={TextField}
        type="number"
        name="price.perAdultAndChild.childPrice"
        label="Price per child"
      />
    </>
  );
};
