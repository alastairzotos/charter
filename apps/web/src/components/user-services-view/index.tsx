import { List } from "@mui/material";
import { ServiceDto } from "dtos";
import React from "react";

import { Titled } from "src/components/titled";
import { UserServiceListItem } from "src/components/user-service-list-item";

interface Props {
  showTitle?: boolean;
  showOperator?: boolean;
  services: ServiceDto[];
}

export const UserServicesView: React.FC<Props> = ({
  showTitle = true,
  showOperator = false,
  services,
}) => {
  return (
    <Titled title={showTitle ? "Services" : ""}>
      <List sx={{ width: "100%" }}>
        {services.map((service) => (
          <UserServiceListItem
            key={service._id}
            service={service}
            showOperator={showOperator}
          />
        ))}
      </List>
    </Titled>
  );
};
