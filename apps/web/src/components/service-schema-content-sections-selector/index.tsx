import { Box, Button } from "@mui/material";
import { ServiceSchemaContentSectionDto } from "dtos";
import React from "react";

import { ServiceSchemaContentSection } from "components/service-schema-content-section";

interface Props {
  sections: ServiceSchemaContentSectionDto[];
  onChange: (sections: ServiceSchemaContentSectionDto[]) => void;
}

export const ServiceSchemaContentSectionsSelector: React.FC<Props> = ({
  sections,
  onChange,
}) => {
  return (
    <Box sx={{ p: 3 }}>
      {sections.map((section, index) => (
        <ServiceSchemaContentSection
          key={index}
          section={section}
          onChange={(newSection) =>
            onChange(
              sections.map((s, newSectionIndex) =>
                newSectionIndex === index ? newSection : s
              )
            )
          }
          onDelete={() => onChange(sections.filter((_, i) => i !== index))}
        />
      ))}

      <div />

      <Button
        variant="outlined"
        onClick={() =>
          onChange([
            ...sections,
            {
              key: "key",
              title: "New section",
              type: "text",
            },
          ])
        }
      >
        Add section
      </Button>
    </Box>
  );
};
