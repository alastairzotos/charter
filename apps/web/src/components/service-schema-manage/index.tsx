import { FetchStatus } from "@bitmetro/create-query";
import { Typography } from "@mui/material";
import { ServiceSchemaNoId } from "dtos";
import { Formik, Field, ErrorMessage } from "formik";
import { TextField } from "formik-mui";
import { useRouter } from "next/router";
import React from "react";
import { urls } from "urls";

import { FormBox } from "src/components/form-box";
import { SaveAndDelete } from "src/components/save-delete";

interface Props {
  title: string;

  serviceSchema: ServiceSchemaNoId;
  onSave: (serviceSchema: ServiceSchemaNoId) => void;
  saveStatus?: FetchStatus;

  onDelete?: () => Promise<void>;
  deleteStatus?: FetchStatus;
}

export const ManageServiceSchemaForm: React.FC<Props> = ({
  title,
  serviceSchema,
  onSave,
  saveStatus,
  onDelete,
  deleteStatus,
}) => {
  const router = useRouter();

  const handleDeleteServiceSchema =
    onDelete &&
    (async () => {
      if (!!onDelete) {
        await onDelete();
        router.push(urls.admin.serviceSchemas());
      }
    });

  return (
    <Formik initialValues={serviceSchema} onSubmit={onSave}>
      {({ isValid, isSubmitting, values, setValues }) => (
        <FormBox title={title} maxWidth={600}>
          <Field component={TextField} name="label" label="Label" />

          <Field
            component={TextField}
            name="pluralLabel"
            label="Plural label"
          />

          <Field
            component={TextField}
            name="description"
            label="Description"
            multiline
            rows={4}
          />

          <SaveAndDelete
            isValid={isValid}
            saveStatus={saveStatus}
            onDelete={handleDeleteServiceSchema}
            deleteStatus={deleteStatus}
            deleteModalTitle="Delete service schema?"
            deleteModalText="Are you sure you want to delete this service schema?"
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
