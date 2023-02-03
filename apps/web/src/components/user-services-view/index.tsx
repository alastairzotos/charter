import { List } from "@mui/material";
import { Box } from "@mui/system";
import { ServiceDto, ServiceType } from "dtos";
import React from "react";
import { getSchemaForServiceType } from "service-schemas";

import { Titled } from "src/components/titled";
import { UserServiceListItem } from "src/components/user-service-list-item";

interface Props {
  groupByType?: boolean;
  showOperator?: boolean;
  services: ServiceDto[];
}

export const UserServicesView: React.FC<Props> = ({
  groupByType = false,
  showOperator = false,
  services,
}) => {
  if (groupByType) {
    const servicesByCategory = services.reduce<Record<string, ServiceDto[]>>(
      (acc, cur) => ({
        ...acc,
        [cur.type]: [...(acc[cur.type] || []), cur],
      }),
      {} as any
    );

    return (
      <>
        {Object.keys(servicesByCategory).map((serviceType) => (
          <Box key={serviceType} sx={{ mb: 3 }}>
            <Titled
              title={
                getSchemaForServiceType(serviceType as ServiceType).pluralLabel
              }
            >
              {servicesByCategory[serviceType].map((service) => (
                <UserServiceListItem
                  key={service._id}
                  service={service}
                  showOperator={showOperator}
                />
              ))}
            </Titled>
          </Box>
        ))}
      </>
    );
  }

  return (
    <List sx={{ width: "100%" }}>
      {services.map((service) => (
        <UserServiceListItem
          key={service._id}
          service={service}
          showOperator={showOperator}
        />
      ))}
    </List>
  );
};
