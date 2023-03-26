import { FetchStatus } from "@bitmetro/create-query";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ServiceNoId } from "dtos";
import { ErrorMessage, Field, Formik } from "formik";
import { TextField } from "formik-mui";
import { useRouter } from "next/router";
import React from "react";
import { urls } from "urls";

import { FileUpload } from "src/components/file-upload";
import { FormBox } from "src/components/form-box";
import { MinMaxPeopleSelector } from "src/components/min-max-people-selector";
import { PriceForm } from "src/components/price-forms";
import { SaveAndDelete } from "src/components/save-delete";
import { ServiceFormFields } from "src/components/service-form-fields";
import { ServicePageContentEditor } from "src/components/service-page-content-editor";
import { TabsProvider, TabsView } from "src/components/tabs";
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
            <TabsProvider
              tabs={[
                {
                  label: "Basics",
                  content: (
                    <>
                      <Field
                        component={TextField}
                        name="name"
                        label="Service name"
                      />

                      <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
                        <MinMaxPeopleSelector
                          label="Minimum people"
                          checkboxLabel="Set minimum people"
                          defaultValue={1}
                          value={values.minPeople}
                          setValue={(minPeople) =>
                            setValues({ ...values, minPeople })
                          }
                        />

                        <MinMaxPeopleSelector
                          label="Maximum people"
                          checkboxLabel="Set maximum people"
                          defaultValue={10}
                          value={values.maxPeople}
                          setValue={(maxPeople) =>
                            setValues({ ...values, maxPeople })
                          }
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
                            photos: values.photos.filter(
                              (photo) => photo !== item
                            ),
                          })
                        }
                      />
                      <ErrorMessage name="photos" />
                    </>
                  ),
                },
                {
                  label: "Service details",
                  content: (
                    <ServiceFormFields
                      schema={service.serviceSchema}
                      isSubmitting={isSubmitting}
                      values={values}
                      setValues={setValues}
                    />
                  ),
                },
                {
                  label: "Pricing",
                  content: (
                    <PriceForm
                      pricingStrategyType={
                        service.serviceSchema.pricingStrategy
                      }
                      pricing={values.price}
                      setPricing={(price) => setValues({ ...values, price })}
                    />
                  ),
                },
                {
                  label: "Content",
                  content: (
                    <ServicePageContentEditor
                      values={values}
                      onChange={setValues}
                    />
                  ),
                },
              ]}
            >
              <TabsView />
            </TabsProvider>

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
