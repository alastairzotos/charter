import { List } from "@mui/material";
import { ServiceDto } from "dtos";
import React from "react";

import { Titled } from "components/lib/titled";
import { UserServiceListItem } from "components/user/user-service-list-item";

interface Props {
  services: ServiceDto[];
}

export const UserPopularServices: React.FC<Props> = ({ services }) => {
  return (
    <Titled title="Most popular" center>
      <List>
        {services.map((service) => (
          <UserServiceListItem
            key={service._id}
            showOperator
            service={service}
          />
        ))}
      </List>
    </Titled>
  );
};
