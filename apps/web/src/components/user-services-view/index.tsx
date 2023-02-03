import { List } from "@mui/material";
import { Box } from "@mui/system";
import { getServiceTypeLabel, ServiceDto, ServiceType } from "dtos";
import React from "react";

import { Titled } from "src/components/titled";
import { UserServiceListItem } from "src/components/user-service-list-item";
import { pluralize } from "src/util/misc";

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
              title={pluralize(
                2,
                getServiceTypeLabel(serviceType as ServiceType)
              )}
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
