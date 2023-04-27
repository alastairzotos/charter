import { FetchStatus } from "@bitmetro/create-query";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { defaultOpeningTimes, ServiceNoId } from "dtos";
import { ErrorMessage, Field, Formik } from "formik";
import { TextField } from "formik-mui";
import { useRouter } from "next/router";
import React from "react";
import { FormBox, TabsProvider, TabsPrevNextButtons, TabsView } from "ui";

import { FileUpload } from "components/lib/backend/_core/file-upload";
import { SaveAndDelete } from "components/lib/backend/_core/save-delete";
import { OpeningTimesForm } from "components/lib/backend/operator/_core/opening-times-form";
import { MinMaxPeopleSelector } from "components/lib/backend/operator/dashboard/services/min-max-people-selector";
import { PriceForm } from "components/lib/backend/operator/dashboard/services/price-forms";
import { ServiceBookingCutoffSelector } from "components/lib/backend/operator/dashboard/services/service-booking-cutoff-selector";
import { ServiceFormFields } from "components/lib/backend/operator/dashboard/services/service-form-fields";
import { ServicePageContentEditor } from "components/lib/backend/operator/dashboard/services/service-page-content-editor";
import { useOperatorDashboard } from "contexts/operator-dashboard";
import { serviceValidationSchema } from "schemas";
import { SETTINGS_WIDTH } from "util/misc";

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

  const { getServiceDeletedRedirectUrl } = useOperatorDashboard();

  const handleDeleteService =
    onDelete &&
    (async () => {
      if (!!onDelete) {
        await onDelete();
        router.push(getServiceDeletedRedirectUrl(operatorId));
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
          <FormBox title={title} maxWidth={SETTINGS_WIDTH}>
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
                {
                  label: "Opening times",
                  content: (
                    <OpeningTimesForm
                      openingTimes={values.openingTimes || defaultOpeningTimes}
                      setOpeningTimes={(openingTimes) => {
                        setValues({
                          ...values,
                          openingTimes: {
                            ...defaultOpeningTimes,
                            ...openingTimes,
                          },
                        });
                      }}
                    />
                  ),
                },
                {
                  label: "Settings",
                  content: (
                    <>
                      {service.serviceSchema.shouldPayNow && (
                        <FormControlLabel
                          label="Approve booking before payment"
                          control={
                            <Checkbox
                              checked={values.approveBookingBeforePayment}
                              onChange={(e) => {
                                setValues({
                                  ...values,
                                  approveBookingBeforePayment:
                                    e.currentTarget.checked,
                                });
                              }}
                            />
                          }
                        />
                      )}

                      <FormControlLabel
                        label="Hide service from users"
                        control={
                          <Checkbox
                            checked={values.hidden}
                            onChange={(e) => {
                              setValues({
                                ...values,
                                hidden: e.currentTarget.checked,
                              });
                            }}
                          />
                        }
                      />

                      <ServiceBookingCutoffSelector
                        values={values}
                        setValues={setValues}
                      />

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
                    </>
                  ),
                },
              ]}
            >
              <TabsView />
              <TabsPrevNextButtons />
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
