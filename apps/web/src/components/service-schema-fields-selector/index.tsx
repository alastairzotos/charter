import { Button, FormLabel, Paper } from "@mui/material";
import { ServiceSchemaFieldDto } from "dtos";
import React from "react";

import { ServiceSchemaField } from "src/components/service-schema-field";

interface Props {
  fields: ServiceSchemaFieldDto[];
  onChange: (fields: ServiceSchemaFieldDto[]) => void;
}

export const ServiceSchemaFieldsSelector: React.FC<Props> = ({
  fields,
  onChange,
}) => {
  return (
    <Paper sx={{ p: 3 }}>
      <FormLabel>Service fields</FormLabel>

      {fields.map((field, index) => (
        <ServiceSchemaField
          key={field.field + index}
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
              label: "New field",
              field: "newField",
              type: "string",
            },
          ])
        }
      >
        Add field
      </Button>
    </Paper>
  );
};
