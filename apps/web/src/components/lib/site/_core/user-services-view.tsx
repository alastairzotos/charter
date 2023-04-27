import { List } from "@mui/material";
import { Box } from "@mui/system";
import { ServiceDto } from "dtos";
import React from "react";

import { Titled } from "components/lib/_core/titled";
import { UserServiceListItem } from "components/lib/site/_core/user-service-list-item";

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
        [cur.serviceSchema.schemaCategory!.pluralName || "Default"]: [
          ...(acc[cur.serviceSchema.schemaCategory!.pluralName || "Default"] ||
            []),
          cur,
        ],
      }),
      {}
    );

    return (
      <>
        {Object.keys(servicesByCategory).map((pluralLabel) => (
          <Box key={pluralLabel} sx={{ mb: 3 }}>
            <Titled title={pluralLabel}>
              {servicesByCategory[pluralLabel].map((service) => (
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
