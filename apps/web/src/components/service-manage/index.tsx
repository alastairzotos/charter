import { FetchStatus } from "@bitmetro/create-query";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ServiceNoId } from "dtos";
import { ErrorMessage, Field, Formik } from "formik";
import { TextField } from "formik-mui";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { urls } from "urls";

import { FileUpload } from "src/components/file-upload";
import { FormBox } from "src/components/form-box";
import { MinMaxPeopleSelector } from "src/components/min-max-people-selector";
import { PriceForm } from "src/components/price-forms";
import { SaveAndDelete } from "src/components/save-delete";
import { ServiceFormFields } from "src/components/service-form-fields";
import { ServicePageContentEditor } from "src/components/service-page-content-editor";
import { serviceValidationSchema } from "src/schemas";

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

  const [contentEditorOpen, setContentEditorOpen] = useState(false);

  const handleDeleteService =
    onDelete &&
    (async () => {
      if (!!onDelete) {
        await onDelete();
        router.push(urls.admin.operator(operatorId));
      }
    });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Formik
        initialValues={service}
        validationSchema={serviceValidationSchema}
        onSubmit={(values) =>
          onSave({ ...values, operator: operatorId as any })
        }
      >
        {({ isValid, isSubmitting, values, setValues }) => (
          <FormBox title={title} maxWidth={600}>
            <Field component={TextField} name="name" label="Service name" />

            <Button
              variant="contained"
              onClick={() => setContentEditorOpen(true)}
              sx={{ width: 300 }}
            >
              Open content editor
            </Button>

            <PriceForm
              pricingStrategyType={service.serviceSchema.pricingStrategy}
              pricing={values.price}
              setPricing={(price) => setValues({ ...values, price })}
            />

            <ServiceFormFields
              schema={service.serviceSchema}
              isSubmitting={isSubmitting}
              values={values}
              setValues={setValues}
            />

            <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
              <MinMaxPeopleSelector
                label="Minimum people"
                checkboxLabel="Set minimum people"
                defaultValue={1}
                value={values.minPeople}
                setValue={(minPeople) => setValues({ ...values, minPeople })}
              />

              <MinMaxPeopleSelector
                label="Maximum people"
                checkboxLabel="Set maximum people"
                defaultValue={10}
                value={values.maxPeople}
                setValue={(maxPeople) => setValues({ ...values, maxPeople })}
              />
            </Box>

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

            <ServicePageContentEditor
              open={contentEditorOpen}
              onClose={() => setContentEditorOpen(false)}
              values={values}
              onChange={setValues}
              onSave={onSave}
              saveStatus={saveStatus}
            />
          </FormBox>
        )}
      </Formik>
    </LocalizationProvider>
  );
};
