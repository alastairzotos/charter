import { Button, List, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import { urls } from "urls";

import { Fetchable } from "src/components/fetchable";
import { ServiceListItem } from "src/components/service-list-item";
import { useServicesState } from "src/state/services";

interface Props {
  operatorId: string;
}

export const ServiceList: React.FC<Props> = ({ operatorId }) => {
  const [loadServicesStatus, loadServicesForOperator, services] = useServicesState((s) => [
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
          <ServiceListItem key={service._id} operatorId={operatorId} service={service} />
        ))}
      </List>

      <Button
        variant="contained"
        component={Link}
        href={urls.admin.servicesCreate(operatorId)}
        sx={{ mt: 3 }}
      >
        Add service
      </Button>
    </Fetchable>
  );
};
