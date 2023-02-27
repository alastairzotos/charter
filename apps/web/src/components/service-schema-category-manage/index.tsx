import { FetchStatus } from "@bitmetro/create-query";
import { Typography } from "@mui/material";
import { ServiceSchemaCategoryNoId } from "dtos";
import { ErrorMessage, Field, Formik } from "formik";
import { TextField } from "formik-mui";
import { useRouter } from "next/router";
import React from "react";
import { urls } from "urls";

import { FileUpload } from "src/components/file-upload";
import { FormBox } from "src/components/form-box";
import { SaveAndDelete } from "src/components/save-delete";

interface Props {
  title: string;

  serviceSchemaCategory: ServiceSchemaCategoryNoId;
  onSave: (serviceSchemaCategory: ServiceSchemaCategoryNoId) => void;
  saveStatus?: FetchStatus;

  onDelete?: () => Promise<void>;
  deleteStatus?: FetchStatus;
}

export const ServiceSchemaCategoryManage: React.FC<Props> = ({
  title,
  serviceSchemaCategory,
  onSave,
  saveStatus,
  onDelete,
  deleteStatus,
}) => {
  const router = useRouter();

  const handleDeleteServiceSchemaCategory =
    onDelete &&
    (async () => {
      if (!!onDelete) {
        await onDelete();
        router.push(urls.admin.serviceSchemaCategories());
      }
    });

  return (
    <Formik initialValues={serviceSchemaCategory} onSubmit={onSave}>
      {({ isSubmitting, isValid, values, setValues }) => (
        <FormBox title={title} maxWidth={600}>
          <Field name="name" label="Name" component={TextField} />

          <Field name="pluralName" label="Plural name" component={TextField} />

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

          <SaveAndDelete
            isValid={isValid}
            saveStatus={saveStatus}
            onDelete={handleDeleteServiceSchemaCategory}
            deleteStatus={deleteStatus}
            deleteModalTitle="Delete service schema category?"
            deleteModalText="Are you sure you want to delete this service schema category?"
          />

          {saveStatus === "error" && (
            <Typography>
              There was an error saving the service schema data
            </Typography>
          )}
        </FormBox>
      )}
    </Formik>
  );
};
