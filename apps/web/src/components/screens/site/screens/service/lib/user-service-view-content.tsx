import { UserServiceViewContentSection } from "components/screens/site/screens/service/lib/user-service-view-content-section";
import { ServiceDto } from "dtos";
import React from "react";

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
