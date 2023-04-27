import { TextField } from "@mui/material";
import { ServiceSchemaContentSectionDto } from "dtos";
import React from "react";

import { ServiceContentBulletpointEditor } from "components/screens/backend/screens/operator/screens/dashboard/screens/services/lib/service-page-content-editor/bulletpoint-editor";

interface Props {
  contentSection: ServiceSchemaContentSectionDto;
  value?: string | string[];
  onChange: (value: string | string[]) => void;
}

export const ServiceContentSectionEditor: React.FC<Props> = ({
  contentSection,
  value,
  onChange,
}) => {
  if (contentSection.type === "text") {
    return (
      <TextField
        label={contentSection.title}
        multiline
        rows={4}
        value={(value as string) || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  if (contentSection.type === "bullets") {
    return (
      <ServiceContentBulletpointEditor
        title={contentSection.title}
        bullets={(value as string[]) || []}
        onChange={onChange}
      />
    );
  }

  return null;
};
