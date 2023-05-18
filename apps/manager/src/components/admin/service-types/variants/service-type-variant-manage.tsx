import { FormControlLabel, Checkbox, FormLabel } from "@mui/material";
import { ServiceSchemaNoId } from "dtos";
import { Field } from "formik";
import { TextField } from "formik-mui";
import React from "react";

import {
  ResourceForm,
  ResourceFormProps,
} from "components/_core/resource-form";
import { Surface } from "components/_core/surface";
import {
  DefaultBookingFieldsSelector,
  PricingStrategyTypeSelector,
  AdditionalBookingFieldsSelector,
  ServiceSchemaContentSectionsSelector,
  ServiceSchemaFieldsSelector,
} from "components/admin/service-types/variants/forms";

export const ManageServiceTypeVariantForm: React.FC<
  ResourceFormProps<ServiceSchemaNoId>
> = (props) => {
  return (
    <ResourceForm
      {...props}
      deleteModalTitle="Delete service type variant?"
      deleteModalText="Are you sure you want to delete this service type variant?"
      tabs={({ values, setValues }) => [
        {
          label: "Basics",
          content: (
            <>
              <Field component={TextField} name="name" label="Name" />

              <Surface
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <FormLabel>Pricing</FormLabel>

                <PricingStrategyTypeSelector
                  pricingStrategy={values.pricingStrategy}
                  onChange={(pricingStrategy) => {
                    setValues({
                      ...values,
                      pricingStrategy,
                      shouldPayNow:
                        pricingStrategy === "onPremises"
                          ? false
                          : values.shouldPayNow,
                    });
                  }}
                />

                <FormControlLabel
                  label="Should pay now"
                  control={
                    <Checkbox
                      disabled={values.pricingStrategy === "onPremises"}
                      checked={values.shouldPayNow}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          shouldPayNow: e.target.checked,
                        })
                      }
                    />
                  }
                />
              </Surface>
            </>
          ),
        },
        {
          label: "Service fields",
          content: (
            <ServiceSchemaFieldsSelector
              fields={values.fields}
              onChange={(fields) => setValues({ ...values, fields })}
            />
          ),
        },
        {
          label: "Booking fields",
          content: (
            <>
              <DefaultBookingFieldsSelector
                pricingStrategy={values.pricingStrategy}
                defaultBookingFields={values.defaultBookingFields}
                onChange={(defaultBookingFields) =>
                  setValues({ ...values, defaultBookingFields })
                }
              />

              <AdditionalBookingFieldsSelector
                fields={values.additionalBookingFields || []}
                onChange={(additionalBookingFields) =>
                  setValues({ ...values, additionalBookingFields })
                }
              />
            </>
          ),
        },
        {
          label: "Content sections",
          content: (
            <ServiceSchemaContentSectionsSelector
              sections={values.contentSections || []}
              onChange={(contentSections) =>
                setValues({ ...values, contentSections })
              }
            />
          ),
        },
      ]}
    />
  );
};
