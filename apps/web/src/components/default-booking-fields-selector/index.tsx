import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
} from "@mui/material";
import { DefaultBookingFieldType } from "dtos";
import React from "react";

interface Props {
  defaultBookingFields: DefaultBookingFieldType[];
  onChange: (fields: DefaultBookingFieldType[]) => void;
}

const fields: Array<{ type: DefaultBookingFieldType; label: string }> = [
  { type: "date", label: "Date" },
  { type: "time", label: "Time" },
  { type: "numberOfPeople", label: "Number of people" },
];

export const DefaultBookingFieldsSelector: React.FC<Props> = ({
  defaultBookingFields,
  onChange,
}) => {
  return (
    <Paper sx={{ p: 3 }}>
      <FormLabel>Required booking fields</FormLabel>

      <FormGroup sx={{ width: "100%" }}>
        {fields.map(({ type, label }) => (
          <FormControlLabel
            key={type}
            label={label}
            control={
              <Checkbox
                checked={defaultBookingFields.includes(type)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onChange([...defaultBookingFields, type]);
                  } else {
                    onChange(
                      defaultBookingFields.filter((field) => field !== type)
                    );
                  }
                }}
              />
            }
          />
        ))}
      </FormGroup>
    </Paper>
  );
};
