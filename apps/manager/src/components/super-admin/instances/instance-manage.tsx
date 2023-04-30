import CloseIcon from "@mui/icons-material/Close";
import { IconButton, List, ListItem } from "@mui/material";
import { InstanceNoId } from "dtos";
import { Field } from "formik";
import { TextField } from "formik-mui";
import { uniqBy } from "lodash";
import React from "react";

import {
  ResourceForm,
  ResourceFormProps,
} from "components/_core/resource-form";
import { UserSearch } from "components/_core/user-search";
import { instanceValidationSchema } from "schemas";

export const ManageInstanceForm: React.FC<ResourceFormProps<InstanceNoId>> = (
  props
) => {
  return (
    <ResourceForm
      {...props}
      validationSchema={instanceValidationSchema}
      tabs={({ values, setValues }) => [
        {
          label: "Basics",
          content: (
            <>
              <Field component={TextField} name="name" label="Instance name" />

              <Field component={TextField} name="url" label="Instance URL" />
            </>
          ),
        },
        {
          label: "Admins",
          content: (
            <>
              <UserSearch
                filterUsers={(user) =>
                  user.role === "user" || user.role === "admin"
                }
                onSelectUser={(user) =>
                  user &&
                  setValues({
                    ...values,
                    admins: uniqBy(
                      [...(values.admins || []), user!],
                      (user) => user._id
                    ),
                  })
                }
                inputLabel="Admins"
                inputPlaceholder="Select admins to run this instance"
              />

              <List>
                {values.admins?.map((admin) => (
                  <ListItem key={admin._id}>
                    {admin.email}
                    <IconButton
                      size="small"
                      onClick={() =>
                        setValues({
                          ...values,
                          admins: values.admins?.filter(
                            (a) => a._id !== admin._id
                          ),
                        })
                      }
                    >
                      <CloseIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </>
          ),
        },
      ]}
    />
  );
};
