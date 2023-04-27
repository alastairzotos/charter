import { TextField } from "@mui/material";
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

type FieldInput = React.FC<{
  disabled: boolean;
  label: string;
  value: AdditionalBookingFieldContent | undefined;
  onChange: (e: any) => void;
}>;

const getFieldInput = (field: AdditionalBookingField): FieldInput => {
  switch (field.type) {
    case "string":
      return TextField;
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
            onChange={(e) =>
              setValues({
                ...values,
                additionalFields: {
                  ...values.additionalFields,
                  [field.key]: e.target.value,
                },
              })
            }
          />
        );
      })}
    </>
  );
};
