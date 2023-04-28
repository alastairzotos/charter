import { Checkbox, FormControlLabel } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { defaultOpeningTimes, ServiceNoId } from "dtos";
import { ErrorMessage, Field } from "formik";
import { TextField } from "formik-mui";
import { useRouter } from "next/router";
import React from "react";

import { FileUpload } from "components/_core/file-upload";
import {
  ResourceForm,
  ResourceFormProps,
} from "components/_core/resource-form";
import { OpeningTimesForm } from "components/operator/_core/opening-times-form";
import { MinMaxPeopleSelector } from "components/operator/dashboard/services/min-max-people-selector";
import { PriceForm } from "components/operator/dashboard/services/price-forms";
import { ServiceBookingCutoffSelector } from "components/operator/dashboard/services/service-booking-cutoff-selector";
import { ServiceFormFields } from "components/operator/dashboard/services/service-form-fields";
import { ServicePageContentEditor } from "components/operator/dashboard/services/service-page-content-editor";
import { useOperatorDashboard } from "contexts/operator-dashboard";
import { serviceValidationSchema } from "schemas";

interface Props extends ResourceFormProps<ServiceNoId> {
  operatorId: string;
}

export const ManageServiceForm: React.FC<Props> = (props) => {
  const router = useRouter();

  const { getServiceDeletedRedirectUrl } = useOperatorDashboard();

  const handleDeleteService =
    props.onDelete &&
    (async () => {
      if (!!props.onDelete) {
        await props.onDelete();
        router.push(getServiceDeletedRedirectUrl(props.operatorId));
      }
    });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ResourceForm
        {...props}
        validationSchema={serviceValidationSchema}
        onDelete={handleDeleteService}
        deleteModalTitle="Delete service?"
        deleteModalText="Are you sure you want to delete this service?"
        tabs={({ values, setValues, isSubmitting }) => [
          {
            label: "Basics",
            content: (
              <>
                <Field component={TextField} name="name" label="Service name" />

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
              </>
            ),
          },
          {
            label: "Service details",
            content: (
              <ServiceFormFields
                schema={props.initialValues.serviceSchema}
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
                  props.initialValues.serviceSchema.pricingStrategy
                }
                pricing={values.price}
                setPricing={(price) => setValues({ ...values, price })}
              />
            ),
          },
          {
            label: "Content",
            content: (
              <ServicePageContentEditor values={values} onChange={setValues} />
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
                {props.initialValues.serviceSchema.shouldPayNow && (
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
                  setValue={(minPeople) => setValues({ ...values, minPeople })}
                />

                <MinMaxPeopleSelector
                  label="Maximum people"
                  checkboxLabel="Set maximum people"
                  defaultValue={10}
                  value={values.maxPeople}
                  setValue={(maxPeople) => setValues({ ...values, maxPeople })}
                />
              </>
            ),
          },
        ]}
      />
    </LocalizationProvider>
  );
};
