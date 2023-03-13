import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ServiceDto, ServiceSchemaContentSectionDto } from "dtos";
import React from "react";

import { MultilineText } from "src/components/multiline-text";

interface Props {
  service: ServiceDto;
  contentSection: ServiceSchemaContentSectionDto;
}

export const UserServiceViewContentSection: React.FC<Props> = ({
  service,
  contentSection,
}) => {
  if (!service.content?.[contentSection.key]) {
    return null;
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{contentSection.title}</Typography>
      </AccordionSummary>

      <AccordionDetails>
        {contentSection.type === "text" ? (
          <MultilineText
            content={(service.content[contentSection.key] as string) || ""}
          />
        ) : (
          <ul>
            {((service.content[contentSection.key] as string[]) || []).map(
              (bullet, index) => (
                <li key={index}>{bullet}</li>
              )
            )}
          </ul>
        )}
      </AccordionDetails>
    </Accordion>
  );
};
