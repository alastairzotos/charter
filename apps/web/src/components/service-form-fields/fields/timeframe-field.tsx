import { Field } from "formik";
import { TextField } from "formik-mui";
import React from "react";

import { ServiceFieldProps } from "src/components/service-form-fields/fields/props";

export const TimeframeField: React.FC<ServiceFieldProps> = ({
  field: { label },
  fullField,
}) => {
  return <Field component={TextField} name={fullField} label={label} />;
};
