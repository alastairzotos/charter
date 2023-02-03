import { Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ServiceNoId } from "dtos";
import { ErrorMessage, Field, Formik } from "formik";
import { TextField } from "formik-mui";
import { useRouter } from "next/router";
import React from "react";
import { getSchemaForServiceType } from "service-schemas";
import { urls } from "urls";
import * as yup from "yup";

import { FileUpload } from "src/components/file-upload";
import { FormBox } from "src/components/form-box";
import { SaveAndDelete } from "src/components/save-delete";
import { ServiceFormFields } from "src/components/service-form-fields";
import { FetchStatus } from "src/models";

interface Props {
  operatorId: string;
  title: string;

  service: ServiceNoId;
  onSave: (service: ServiceNoId) => void;
  saveStatus?: FetchStatus;

  onDelete?: () => Promise<void>;
  deleteStatus?: FetchStatus;
}

export const ManageServiceForm: React.FC<Props> = ({
  operatorId,
  title,
  service,
  onSave,
  saveStatus,
  onDelete,
  deleteStatus,
}) => {
  const router = useRouter();

  const handleDeleteService =
    onDelete &&
    (async () => {
      if (!!onDelete) {
        await onDelete();
        router.push(urls.admin.operator(operatorId));
      }
    });

  const validationSchema: yup.SchemaOf<Omit<ServiceNoId, "type" | "operator">> =
    yup.object().shape({
      name: yup.string().required("Name is required"),
      description: yup.string().required("Description is required"),
      adultPrice: yup
        .number()
        .required("Adult price is required")
        .typeError("Price must be a number"),
      childPrice: yup
        .number()
        .required("Child price is required")
        .typeError("Price must be a number"),
      photos: yup.array().of(yup.string().required("Photo is required")),
      data: yup.object(),
    });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Formik
        initialValues={service}
        validationSchema={validationSchema}
        onSubmit={(values) =>
          onSave({ ...values, operator: operatorId as any })
        }
      >
        {({ isValid, isSubmitting, values, setValues }) => (
          <FormBox title={title}>
            <Field component={TextField} name="name" label="Service name" />

            <Field
              component={TextField}
              name="description"
              label="Description"
              multiline
              rows={4}
            />

            <Field
              component={TextField}
              name="adultPrice"
              label="Adult price"
            />

            <Field
              component={TextField}
              name="childPrice"
              label="Child price"
            />

            <ServiceFormFields
              schema={getSchemaForServiceType(service.type)!}
              isSubmitting={isSubmitting}
              values={values}
              setValues={setValues}
            />

            <FileUpload
              title="Photos"
              filesLimit={100}
              acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
              disabled={isSubmitting}
              value={values.photos || []}
              onChange={(photos) =>
                setValues({
                  ...(values as any),
                  photos: [...(values.photos || []), ...photos],
                })
              }
              onDelete={(item) =>
                setValues({
                  ...(values as any),
                  photos: values.photos.filter((photo) => photo !== item),
                })
              }
            />
            <ErrorMessage name="photos" />

            <SaveAndDelete
              isValid={isValid}
              saveStatus={saveStatus}
              onDelete={handleDeleteService}
              deleteStatus={deleteStatus}
              deleteModalTitle="Delete service?"
              deleteModalText="Are you sure you want to delete this service?"
            />

            {saveStatus === "error" && (
              <Typography>
                There was an error saving the service data
              </Typography>
            )}
          </FormBox>
        )}
      </Formik>
    </LocalizationProvider>
  );
};