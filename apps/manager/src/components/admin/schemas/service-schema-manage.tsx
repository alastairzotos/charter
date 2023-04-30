import { FormControlLabel, Checkbox, FormLabel } from "@mui/material";
import { ServiceSchemaNoId } from "dtos";
import { Field } from "formik";
import { TextField } from "formik-mui";
import { useRouter } from "next/router";
import React from "react";
import { urls } from "urls";

import {
  ResourceForm,
  ResourceFormProps,
} from "components/_core/resource-form";
import { Surface } from "components/_core/surface";
import { ServiceSchemaCategorySelector } from "components/admin/schema-categories/service-schema-category-selector";
import { DefaultBookingFieldsSelector } from "components/admin/schemas/default-booking-fields-selector";
import { PricingStrategyTypeSelector } from "components/admin/schemas/pricing-strategy-type-selector";
import { AdditionalBookingFieldsSelector } from "components/admin/schemas/service-schema-additional-booking-fields-selector";
import { ServiceSchemaContentSectionsSelector } from "components/admin/schemas/service-schema-content-sections-selector";
import { ServiceSchemaFieldsSelector } from "components/admin/schemas/service-schema-fields-selector";

export const ManageServiceSchemaForm: React.FC<
  ResourceFormProps<ServiceSchemaNoId>
> = (props) => {
  const router = useRouter();

  const handleDeleteServiceSchema =
    props.onDelete &&
    (async () => {
      if (!!props.onDelete) {
        await props.onDelete();
        router.push(urls.admin.serviceSchemas());
      }
    });

  return (
    <ResourceForm
      {...props}
      onDelete={handleDeleteServiceSchema}
      deleteModalTitle="Delete service schema?"
      deleteModalText="Are you sure you want to delete this service schema?"
      tabs={({ values, setValues }) => [
        {
          label: "Basics",
          content: (
            <>
              <Field component={TextField} name="name" label="Name" />

              <ServiceSchemaCategorySelector
                value={values.schemaCategory}
                onChange={(schemaCategory) =>
                  setValues({ ...values, schemaCategory })
                }
              />

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
