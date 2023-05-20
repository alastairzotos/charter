import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  AdditionalBookingField,
  AdditionalBookingFieldContent,
  BookingNoId,
  ServiceSchemaDto,
} from "dtos";
import React from "react";

interface Props {
  schema: ServiceSchemaDto;
  values: Omit<BookingNoId, "status">;
  setValues: (values: Omit<BookingNoId, "status">) => void;
  isSubmitting: boolean;
}

interface FieldInputProps {
  disabled: boolean;
  label: string;
  value: AdditionalBookingFieldContent | undefined;
  onChange: (e: AdditionalBookingFieldContent) => void;
}

const StringField: React.FC<FieldInputProps> = (props) => (
  <TextField {...props} onChange={(e) => props.onChange(e.target.value)} />
);

const NumberField: React.FC<FieldInputProps> = (props) => (
  <TextField
    {...props}
    type="number"
    onChange={(e) => props.onChange(parseInt(e.target.value, 10))}
  />
);

const BooleanField: React.FC<FieldInputProps> = (props) => (
  <FormControl>
    <InputLabel>{props.label}</InputLabel>
    <Select
      {...props}
      onChange={(e) => props.onChange(e.target.value === "true")}
    >
      <MenuItem value="true">Yes</MenuItem>
      <MenuItem value="false">No</MenuItem>
    </Select>
  </FormControl>
);

const getFieldInput = (
  field: AdditionalBookingField
): React.FC<FieldInputProps> => {
  switch (field.type) {
    case "string":
      return StringField;
    case "number":
      return NumberField;
    case "boolean":
      return BooleanField;
  }
};

export const BookingAdditionalForms: React.FC<Props> = ({
  schema,
  values,
  setValues,
  isSubmitting,
}) => {
  return (
    <>
      {schema.additionalBookingFields?.map((field) => {
        const Component = getFieldInput(field);

        return (
          <Component
            key={field.key}
            disabled={isSubmitting}
            label={field.title}
            value={values.additionalFields?.[field.key]}
            onChange={(value) =>
              setValues({
                ...values,
                additionalFields: {
                  ...values.additionalFields,
                  [field.key]: value,
                },
              })
            }
          />
        );
      })}
    </>
  );
};
