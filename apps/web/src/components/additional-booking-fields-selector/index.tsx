import { Button, FormLabel, Paper } from "@mui/material";
import { AdditionalBookingField } from "dtos";
import React from "react";

import { ServiceSchemaAdditionalBookingField } from "src/components/additional-booking-field";

interface Props {
  fields: AdditionalBookingField[];
  onChange: (fields: AdditionalBookingField[]) => void;
}

export const AdditionalBookingFieldsSelector: React.FC<Props> = ({
  fields,
  onChange,
}) => {
  return (
    <Paper sx={{ p: 3 }}>
      <FormLabel>Additional booking fields</FormLabel>

      {fields.map((field, index) => (
        <ServiceSchemaAdditionalBookingField
          key={index}
          field={field}
          onChange={(newField) =>
            onChange(
              fields.map((field, newFieldIndex) =>
                newFieldIndex === index ? newField : field
              )
            )
          }
          onDelete={() => onChange(fields.filter((_, i) => i !== index))}
        />
      ))}

      <div />

      <Button
        variant="outlined"
        onClick={() =>
          onChange([
            ...fields,
            {
              key: "key",
              type: "string",
              title: "New field",
            },
          ])
        }
      >
        Add booking field
      </Button>
    </Paper>
  );
};
