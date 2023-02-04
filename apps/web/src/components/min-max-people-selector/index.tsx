import {
  FormControlLabel,
  FormGroup,
  Checkbox,
  TextField,
} from "@mui/material";
import React from "react";

interface Props {
  checkboxLabel: string;
  label: string;
  defaultValue: number;
  value: number | null;
  setValue: (value: number | null) => void;
}

export const MinMaxPeopleSelector: React.FC<Props> = ({
  checkboxLabel,
  label,
  defaultValue,
  value,
  setValue,
}) => {
  return (
    <FormGroup sx={{ width: "100%" }}>
      <FormControlLabel
        label={checkboxLabel}
        control={
          <Checkbox
            checked={value !== null}
            onChange={(e) => {
              if (e.currentTarget.checked) {
                setValue(defaultValue);
              } else {
                setValue(null);
              }
            }}
          />
        }
      />

      {value !== null && (
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
