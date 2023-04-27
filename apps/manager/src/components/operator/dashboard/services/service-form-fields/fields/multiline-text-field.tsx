import { Field } from "formik";
import { TextField } from "formik-mui";
import React from "react";

import { ServiceFieldProps } from "components/operator/dashboard/services/service-form-fields/fields/props";

export const MultilineTextField: React.FC<ServiceFieldProps> = ({
  field: { label },
  fullField,
}) => {
  return (
    <Field
      component={TextField}
      name={fullField}
      label={label}
      multiline
      rows={4}
    />
  );
};
