import { Box, Button } from "@mui/material";
import { ServiceSchemaFieldDto } from "dtos";
import React from "react";

import { ServiceSchemaField } from "components/service-schema-field";

interface Props {
  fields: ServiceSchemaFieldDto[];
  onChange: (fields: ServiceSchemaFieldDto[]) => void;
}

export const ServiceSchemaFieldsSelector: React.FC<Props> = ({
  fields,
  onChange,
}) => {
  return (
    <Box sx={{ p: 3 }}>
      {fields.map((field, index) => (
        <ServiceSchemaField
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
              label: "New field",
              type: "string",
            },
          ])
        }
      >
        Add field
      </Button>
    </Box>
  );
};
