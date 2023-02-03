import { List } from "@mui/material";
import { ServiceDto } from "dtos";
import React from "react";

import { Titled } from "src/components/titled";
import { UserServiceListItem } from "src/components/user-service-list-item";

interface Props {
  services: ServiceDto[];
}

export const UserServicesView: React.FC<Props> = ({ services }) => {
  return (
    <Titled title="Services">
      <List sx={{ width: "100%" }}>
        {services.map((service) => (
          <UserServiceListItem key={service._id} service={service} />
        ))}
      </List>
    </Titled>
  );
};
