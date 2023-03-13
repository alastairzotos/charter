import { ServiceDto } from "dtos";
import React from "react";

import { MultilineText } from "src/components/multiline-text";
import { UserServiceViewContentSection } from "src/components/user-service-view-content/content-section";

interface Props {
  service: ServiceDto;
}

export const UserServiceViewContent: React.FC<Props> = ({ service }) => {
  return (
    <>
      <MultilineText content={service.description} />

      {(service.serviceSchema.contentSections || []).map((section, index) => (
        <UserServiceViewContentSection
          key={index}
          service={service}
          contentSection={section}
        />
      ))}
    </>
  );
};
