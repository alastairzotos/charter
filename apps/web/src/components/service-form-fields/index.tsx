import { ServiceSchemaDto, ServiceSchemaFieldDto } from "dtos";
import React from "react";

import { StringField } from "src/components/service-form-fields/fields/string-field";
import { TimeField } from "src/components/service-form-fields/fields/time-field";
import { TimeframeField } from "src/components/service-form-fields/fields/timeframe-field";
import { ServiceFieldsProps } from "src/components/service-form-fields/props";

interface Props extends ServiceFieldsProps {
  schema: ServiceSchemaDto;
}

const getFieldForm = (field: ServiceSchemaFieldDto) => {
  switch (field.type) {
    case "string":
      return StringField;
    case "time":
      return TimeField;
    case "timeframe":
      return TimeframeField;
  }
};

export const ServiceFormFields: React.FC<Props> = ({ schema, ...props }) => {
  return (
    <>
      {schema.fields.map((field) => {
        const FieldForm = getFieldForm(field)!;
        return (
          <FieldForm
            field={field}
            fullField={`data.${field.label}`}
            {...props}
            key={field.label}
          />
        );
      })}
    </>
  );
};
