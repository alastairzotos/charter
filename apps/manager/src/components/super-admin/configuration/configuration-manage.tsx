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
                label="Google login"
                control={
                  <Checkbox
                    checked={values.googleLogin}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        googleLogin: e.currentTarget.checked,
                      });
                    }}
                  />
                }
              />

              <FormControlLabel
                label="Facebook login"
                control={
                  <Checkbox
                    checked={values.facebookLogin}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        facebookLogin: e.currentTarget.checked,
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
