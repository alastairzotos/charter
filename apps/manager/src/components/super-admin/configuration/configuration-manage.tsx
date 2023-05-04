import { Checkbox, FormControlLabel } from "@mui/material";
import { ConfigurationDto } from "dtos";
import React from "react";

import {
  ResourceForm,
  ResourceFormProps,
} from "components/_core/resource-form";

export const ManageConfigurationForm: React.FC<
  ResourceFormProps<ConfigurationDto>
> = (props) => {
  return (
    <ResourceForm
      {...props}
      tabs={({ values, setValues }) => [
        {
          label: "Auth",
          content: (
            <>
              <FormControlLabel
                label="Social login"
                control={
                  <Checkbox
                    checked={values.socialLogin}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        socialLogin: e.currentTarget.checked,
                      });
                    }}
                  />
                }
              />
            </>
          ),
        },
      ]}
    />
  );
};
