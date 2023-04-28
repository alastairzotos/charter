import { defaultOpeningTimes, OperatorNoId } from "dtos";
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
import { UserSearch } from "components/operator/dashboard/operator/user-search";
import { useOperatorDashboard } from "contexts/operator-dashboard";
import { operatorValidationSchema } from "schemas";

export const ManageOperatorForm: React.FC<ResourceFormProps<OperatorNoId>> = (
  props
) => {
  const router = useRouter();
  const {
    isOperatorDeletable,
    getOperatorDeletedRedirectUrl,
    isOwnerSearchAvailable,
  } = useOperatorDashboard();

  const handleDeleteOperator =
    props.onDelete &&
    (async () => {
      if (!!props.onDelete) {
        await props.onDelete();
        router.push(getOperatorDeletedRedirectUrl());
      }
    });

  return (
    <ResourceForm
      {...props}
      validationSchema={operatorValidationSchema}
      onDelete={isOperatorDeletable() ? handleDeleteOperator : undefined}
      deleteModalTitle="Delete operator?"
      deleteModalText="Are you sure you want to delete this operator?"
      tabs={({ isSubmitting, values, setValues }) => [
        {
          label: "Basics",
          content: (
            <>
              {isOwnerSearchAvailable() && (
                <UserSearch
                  owner={values.owner}
                  onSelectUser={(owner) => setValues({ ...values, owner })}
                />
              )}

              <Field component={TextField} name="name" label="Operator name" />

              <Field
                component={TextField}
                name="email"
                type="email"
                label="Email"
              />

              <Field
                component={TextField}
                name="phoneNumber"
                label="Phone number"
              />

              <Field
                component={TextField}
                name="address"
                label="Address"
                multiline
                rows={4}
              />

              <Field
                component={TextField}
                name="description"
                label="Description"
                multiline
                rows={4}
              />

              <FileUpload
                title="Avatar"
                filesLimit={100}
                acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                disabled={isSubmitting}
                value={[values.photo].filter((i) => !!i)}
                onChange={(urls) => setValues({ ...values, photo: urls[0] })}
              />
              <ErrorMessage name="photo" />
            </>
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
      ]}
    />
  );
};
