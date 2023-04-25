import { FormControlLabel, Checkbox, TextField, Box } from "@mui/material";
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
    <Box sx={{ display: "flex" }}>
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

      <TextField
        type="number"
        placeholder={label}
        size="small"
        disabled={value === null}
        inputProps={{ min: 1 }}
        value={value}
        onChange={(e) => setValue(parseInt(e.currentTarget.value, 10))}
      />
    </Box>
  );
};
