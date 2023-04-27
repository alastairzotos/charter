import { TextField } from "@mui/material";
import { ServiceNoId } from "dtos";
import React from "react";

import { ServiceContentSectionEditor } from "components/lib/backend/operator/dashboard/services/service-page-content-editor/section-editor";

interface Props {
  values: ServiceNoId;
  onChange: (values: ServiceNoId) => void;
}

export const ServicePageContentEditor: React.FC<Props> = ({
  values,
  onChange,
}) => {
  const schemaContentSections = values.serviceSchema.contentSections || [];

  return (
    <>
      <TextField
        label="Description"
        value={values.description}
        onChange={(e) => onChange({ ...values, description: e.target.value })}
        multiline
        rows={4}
      />

      {schemaContentSections.map((section) => (
        <ServiceContentSectionEditor
          key={section.key}
          contentSection={section}
          value={values.content?.[section.key]}
          onChange={(sectionValue) =>
            onChange({
              ...values,
              content: {
                ...values.content,
                [section.key]: sectionValue,
              },
            })
          }
        />
      ))}
    </>
  );
};
