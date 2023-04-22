import { ServiceDto } from "dtos";
import React from "react";

import { UserServiceViewContentSection } from "components/user-service-view-content/content-section";

interface Props {
  service: ServiceDto;
}

export const UserServiceViewContent: React.FC<Props> = ({ service }) => {
  return (
    <>
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
