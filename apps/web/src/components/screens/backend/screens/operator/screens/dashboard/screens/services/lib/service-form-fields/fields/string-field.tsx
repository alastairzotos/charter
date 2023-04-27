import { Field } from "formik";
import { TextField } from "formik-mui";
import React from "react";

import { ServiceFieldProps } from "components/screens/backend/screens/operator/screens/dashboard/screens/services/lib/service-form-fields/fields/props";

export const StringField: React.FC<ServiceFieldProps> = ({
  field: { label },
  fullField,
}) => {
  return <Field component={TextField} name={fullField} label={label} />;
};
