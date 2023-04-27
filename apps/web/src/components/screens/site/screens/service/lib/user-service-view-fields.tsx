import { ServiceFieldValue, ServiceSchemaFieldDto } from "dtos";
import React from "react";

import { KeyValues } from "components/lib/key-values";
import { MultilineText } from "components/screens/site/lib/multiline-text";

interface Props {
  data: Record<string, ServiceFieldValue>;
  fields: ServiceSchemaFieldDto[];
}

const getFieldView = (
  field: ServiceSchemaFieldDto,
  value: ServiceFieldValue
): React.ReactNode => {
  switch (field.type) {
    case "string":
    case "time":
    case "timeframe":
      return <>{value}</>;

    case "multiline-text":
      return (
        <MultilineText
          sx={{ mt: 0, mb: 0, fontSize: 14, fontWeight: "bold" }}
          content={value as string}
        />
      );
  }
};

export const UserServiceViewFields: React.FC<Props> = ({ data, fields }) => {
  return (
    <KeyValues
      kv={{
        ...fields.reduce(
          (acc, field) => ({
            ...acc,
            [field.label]: getFieldView(field, data[field.key]),
          }),
          {}
        ),
      }}
    />
  );
};
