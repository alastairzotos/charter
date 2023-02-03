import { List, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { Fetchable } from "src/components/fetchable";
import { ServiceCreateButton } from "src/components/service-create-button";
import { ServiceListItem } from "src/components/service-list-item";
import { useServicesState } from "src/state/services";

interface Props {
  operatorId: string;
}

export const ServiceList: React.FC<Props> = ({ operatorId }) => {
  const [loadServicesStatus, loadServicesForOperator, services] =
    useServicesState((s) => [
      s.loadServicesStatus,
      s.loadServicesForOperator,
      s.services,
    ]);

  useEffect(() => {
    if (operatorId) {
      loadServicesForOperator(operatorId);
    }
  }, [operatorId]);

  return (
    <Fetchable
      status={loadServicesStatus}
      error={
        <Typography>
          There was an error loading the operator&apos;s services
        </Typography>
      }
    >
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {services.map((service) => (
          <ServiceListItem
            key={service._id}
            operatorId={operatorId}
            service={service}
          />
        ))}
      </List>

      <ServiceCreateButton operatorId={operatorId} />
    </Fetchable>
  );
};
