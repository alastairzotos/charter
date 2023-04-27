import { ServiceDto } from "dtos";
import React from "react";

import { UserServiceViewContentSection } from "components/service/user-service-view-content-section";

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
