import { ServiceSchemaCategoryNoId } from "dtos";
import { ErrorMessage, Field } from "formik";
import { TextField } from "formik-mui";
import React from "react";

import { FileUpload } from "components/_core/file-upload";
import {
  ResourceForm,
  ResourceFormProps,
} from "components/_core/resource-form";

export const ServiceTypeManage: React.FC<
  ResourceFormProps<ServiceSchemaCategoryNoId>
> = (props) => {
  return (
    <ResourceForm
      {...props}
      deleteModalTitle="Delete service type?"
      deleteModalText="Are you sure you want to delete this service type?"
      tabs={({ isSubmitting, values, setValues }) => [
        {
          label: "",
          content: (
            <>
              <Field name="name" label="Name" component={TextField} />

              <Field
                name="pluralName"
                label="Plural name"
                component={TextField}
              />

              <Field
                name="description"
                label="Description"
                component={TextField}
                multiline
                rows={4}
              />

              <FileUpload
                title="Photo"
                filesLimit={1}
                maxFileSize={10000000}
                acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                disabled={isSubmitting}
                value={[values.photo].filter((i) => !!i)}
                onChange={(urls) => setValues({ ...values, photo: urls[0] })}
              />
              <ErrorMessage name="photo" />
            </>
          ),
        },
      ]}
    />
  );
};
