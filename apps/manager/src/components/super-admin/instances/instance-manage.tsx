import { InstanceNoId } from "dtos";
import { Field } from "formik";
import { TextField } from "formik-mui";
import React from "react";

import {
  ResourceForm,
  ResourceFormProps,
} from "components/_core/resource-form";
import { instanceValidationSchema } from "schemas";

export const ManageInstanceForm: React.FC<ResourceFormProps<InstanceNoId>> = (
  props
) => {
  return (
    <ResourceForm
      {...props}
      validationSchema={instanceValidationSchema}
      tabs={() => [
        {
          label: "Basics",
          content: (
            <Field component={TextField} name="name" label="Instance name" />
          ),
        },
      ]}
    />
  );
};
