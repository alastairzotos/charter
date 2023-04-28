import { ServiceSchemaCategoryNoId } from "dtos";
import { ErrorMessage, Field } from "formik";
import { TextField } from "formik-mui";
import { useRouter } from "next/router";
import React from "react";
import { urls } from "urls";

import { FileUpload } from "components/_core/file-upload";
import {
  ResourceForm,
  ResourceFormProps,
} from "components/_core/resource-form";

export const ServiceSchemaCategoryManage: React.FC<
  ResourceFormProps<ServiceSchemaCategoryNoId>
> = (props) => {
  const router = useRouter();

  const handleDeleteServiceSchemaCategory =
    props.onDelete &&
    (async () => {
      if (!!props.onDelete) {
        await props.onDelete();
        router.push(urls.admin.serviceSchemaCategories());
      }
    });

  return (
    <ResourceForm
      {...props}
      onDelete={handleDeleteServiceSchemaCategory}
      deleteModalTitle="Delete service schema category?"
      deleteModalText="Are you sure you want to delete this service schema category?"
      tabs={({ isSubmitting, values, setValues }) => [
        {
          label: "Basics",
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
