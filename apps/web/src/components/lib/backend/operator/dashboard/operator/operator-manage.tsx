import { FetchStatus } from "@bitmetro/create-query";
import { Typography } from "@mui/material";
import { defaultOpeningTimes, OperatorNoId } from "dtos";
import { ErrorMessage, Field, Formik } from "formik";
import { TextField } from "formik-mui";
import { useRouter } from "next/router";
import React from "react";
import { FormBox, TabsProvider, TabsView } from "ui";

import { FileUpload } from "components/lib/backend/_core/file-upload";
import { SaveAndDelete } from "components/lib/backend/_core/save-delete";
import { OpeningTimesForm } from "components/lib/backend/operator/_core/opening-times-form";
import { UserSearch } from "components/lib/backend/operator/dashboard/operator/user-search";
import { useOperatorDashboard } from "contexts/operator-dashboard";
import { operatorValidationSchema } from "schemas";
import { SETTINGS_WIDTH } from "util/misc";

interface Props {
  title: string;

  operator: OperatorNoId;
  onSave: (operator: OperatorNoId) => void;
  saveStatus?: FetchStatus;

  onDelete?: () => Promise<void>;
  deleteStatus?: FetchStatus;
}

export const ManageOperatorForm: React.FC<Props> = ({
  title,
  operator,
  onSave,
  saveStatus,
  onDelete,
  deleteStatus,
}) => {
  const router = useRouter();
  const {
    isOperatorDeletable,
    getOperatorDeletedRedirectUrl,
    isOwnerSearchAvailable,
  } = useOperatorDashboard();

  const handleDeleteOperator =
    onDelete &&
    (async () => {
      if (!!onDelete) {
        await onDelete();
        router.push(getOperatorDeletedRedirectUrl());
      }
    });

  return (
    <Formik
      initialValues={operator}
      validationSchema={operatorValidationSchema}
      onSubmit={onSave}
    >
      {({ isValid, isSubmitting, values, setValues }) => (
        <FormBox title={title} maxWidth={SETTINGS_WIDTH}>
          <TabsProvider
            tabs={[
              {
                label: "Basics",
                content: (
                  <>
                    {isOwnerSearchAvailable() && (
                      <UserSearch
                        owner={values.owner}
                        onSelectUser={(owner) =>
                          setValues({ ...values, owner })
                        }
                      />
                    )}

                    <Field
                      component={TextField}
                      name="name"
                      label="Operator name"
                    />

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
                      onChange={(urls) =>
                        setValues({ ...values, photo: urls[0] })
                      }
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
          >
            <TabsView />
          </TabsProvider>

          <SaveAndDelete
            isValid={isValid}
            saveStatus={saveStatus}
            onDelete={isOperatorDeletable() ? handleDeleteOperator : undefined}
            deleteStatus={deleteStatus}
            deleteModalTitle="Delete operator?"
            deleteModalText="Are you sure you want to delete this operator?"
          />

          {saveStatus === "error" && (
            <Typography>There was an error saving the operator data</Typography>
          )}
        </FormBox>
      )}
    </Formik>
  );
};
