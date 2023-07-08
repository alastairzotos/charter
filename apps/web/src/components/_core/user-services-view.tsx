import Grid from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/system";
import { ServiceDto } from "dtos";
import React from "react";
import { Titled } from "ui";

import { UserServiceListItem } from "components/_core/user-service-list-item";

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
              <Grid container spacing={2}>
                {servicesByCategory[pluralLabel].map((service) => (
                  <Grid xs={12} sm={6} md={6} lg={4}>
                    <UserServiceListItem
                      key={service._id}
                      service={service}
                      // showOperator={showOperator}
                    />
                  </Grid>
                ))}
              </Grid>
            </Titled>
          </Box>
        ))}
      </>
    );
  }

  return (
    <Grid container spacing={2}>
      {services.map((service) => (
        <Grid xs={12} sm={6} md={4} lg={3}>
          <UserServiceListItem
            key={service._id}
            service={service}
            // showOperator={showOperator}
          />
        </Grid>
      ))}
    </Grid>
  );
};
