import {
  FormControlLabel,
  FormGroup,
  Checkbox,
  TextField,
} from "@mui/material";
import { Field } from "formik";
import React from "react";
// import { TextField } from "formik-mui";

interface Props {
  checkboxLabel: string;
  label: string;
  defaultValue: number;
  value?: number;
  setValue: (value?: number) => void;
}

export const MinMaxPeopleSelector: React.FC<Props> = ({
  checkboxLabel,
  label,
  defaultValue,
  value,
  setValue,
}) => {
  return (
    <FormGroup>
      <FormControlLabel
        label={checkboxLabel}
        control={
          <Checkbox
            checked={value !== undefined}
            onChange={(e) => {
              if (e.currentTarget.checked) {
                setValue(defaultValue);
              } else {
                setValue(undefined);
              }
            }}
          />
        }
      />

      {value !== undefined && (
        <TextField
          label={label}
          type="number"
          value={value}
          onChange={(e) => setValue(parseInt(e.currentTarget.value, 10))}
          inputProps={{ min: 1 }}
        />
      )}
    </FormGroup>
  );
};
