import { ServiceSchemaDto, ServiceSchemaFieldDto } from "dtos";
import React from "react";

import { MultilineTextField } from "components/operator/dashboard/services/service-form-fields/fields/multiline-text-field";
import { StringField } from "components/operator/dashboard/services/service-form-fields/fields/string-field";
import { TimeField } from "components/operator/dashboard/services/service-form-fields/fields/time-field";
import { TimeframeField } from "components/operator/dashboard/services/service-form-fields/fields/timeframe-field";
import { ServiceFieldsProps } from "components/operator/dashboard/services/service-form-fields/props";

interface Props extends ServiceFieldsProps {
  schema: ServiceSchemaDto;
}

const getFieldForm = (field: ServiceSchemaFieldDto) => {
  switch (field.type) {
    case "string":
      return StringField;
    case "multiline-text":
      return MultilineTextField;
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
            fullField={`data.${field.key}`}
            {...props}
            key={field.key}
          />
        );
      })}
    </>
  );
};
