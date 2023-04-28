import { FetchStatus } from "@bitmetro/create-query";
import { Card, CardContent, CardActions, FormLabel, Box } from "@mui/material";
import { Formik, FormikProps, FormikValues } from "formik";
import React from "react";
import { TabData, TabsPrevNextButtons, TabsProvider, TabsView } from "ui";
import { AnyObjectSchema } from "yup";

import { SaveAndDelete } from "components/_core/save-delete";
import { SETTINGS_WIDTH } from "util/misc";

export interface ResourceFormProps<T> {
  title: string;
  initialValues: FormikValues & T;
  validationSchema?: AnyObjectSchema;

  onSave: (service: T) => void;
  saveStatus?: FetchStatus;

  onDelete?: () => Promise<void>;
  deleteStatus?: FetchStatus;
}

interface Props<T> extends ResourceFormProps<T> {
  deleteModalTitle: string;
  deleteModalText: string;

  tabs: (props: FormikProps<FormikValues & T>) => TabData[];
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const ResourceForm = <T extends unknown>({
  title,
  initialValues,
  validationSchema,
  onSave,
  saveStatus,
  onDelete,
  deleteStatus,
  deleteModalTitle,
  deleteModalText,
  tabs,
}: Props<T>): React.ReactElement => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSave}
    >
      {(props) => (
        <Box sx={{ maxWidth: SETTINGS_WIDTH }}>
          <Card
            elevation={3}
            sx={{
              p: 1,
              pt: 2,
              mb: 2,
            }}
          >
            <FormLabel sx={{ fontSize: "1.3em", m: 2 }}>{title}</FormLabel>

            <TabsProvider tabs={tabs(props)}>
              <CardContent>
                <TabsView />
              </CardContent>

              <CardActions>
                <TabsPrevNextButtons />
              </CardActions>
            </TabsProvider>
          </Card>

          <SaveAndDelete
            isValid={props.isValid}
            saveStatus={saveStatus}
            onDelete={onDelete}
            deleteStatus={deleteStatus}
            deleteModalTitle={deleteModalTitle}
            deleteModalText={deleteModalText}
          />
        </Box>
      )}
    </Formik>
  );
};
