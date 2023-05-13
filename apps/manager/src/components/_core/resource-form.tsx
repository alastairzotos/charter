import { FetchStatus } from "@bitmetro/create-query";
import { FormLabel, Box, SxProps } from "@mui/material";
import { Form, Formik, FormikProps, FormikValues } from "formik";
import React from "react";
import { TabData, TabsProvider, TabsView, useIsDesktop } from "ui";
import { AnyObjectSchema } from "yup";

import { SaveAndDelete } from "components/_core/save-delete";
import { Surface } from "components/_core/surface";
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
  deleteModalTitle?: string;
  deleteModalText?: string;

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
  const isDesktop = useIsDesktop();

  const sx: SxProps = isDesktop
    ? { mb: 2 }
    : {
        m: -1,
        mb: 2,
        p: 1,
        pt: 1,
        border: "none",
      };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSave}
    >
      {(props) => (
        <Form>
          <Box sx={{ maxWidth: SETTINGS_WIDTH }}>
            <Box sx={sx}>
              <FormLabel sx={{ fontSize: "1.3em", m: 2 }}>{title}</FormLabel>

              <TabsProvider tabs={tabs(props)}>
                <TabsView />
              </TabsProvider>
            </Box>

            <SaveAndDelete
              isValid={props.isValid}
              saveStatus={saveStatus}
              onDelete={onDelete}
              deleteStatus={deleteStatus}
              deleteModalTitle={deleteModalTitle || ""}
              deleteModalText={deleteModalText || ""}
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};
