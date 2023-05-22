import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { StatusSwitch } from "ui";

import { ServiceListItem } from "components/_core/service-list-item";
import { useLoadServicesWithOperatorsBySchemaId } from "state/services";

interface Props {
  schemaId: string;
}

export const ServicesByVariant: React.FC<Props> = ({ schemaId }) => {
  const [loadServicesStatus, loadServices, services] =
    useLoadServicesWithOperatorsBySchemaId((s) => [
      s.status,
      s.request,
      s.value,
    ]);

  useEffect(() => {
    loadServices(schemaId);
  }, [schemaId]);

  return (
    <StatusSwitch
      status={loadServicesStatus}
      error={<Typography>There was an error loading the services</Typography>}
    >
      {services?.map((service) => (
        <ServiceListItem key={service._id} service={service} />
      ))}
    </StatusSwitch>
  );
};
