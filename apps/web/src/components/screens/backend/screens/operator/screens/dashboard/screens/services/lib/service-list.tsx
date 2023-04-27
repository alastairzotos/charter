import { List, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { ServiceCreateInput } from "components/screens/backend/screens/operator/screens/dashboard/screens/services/lib/service-create-input";
import { ServiceListItem } from "components/screens/backend/screens/operator/screens/dashboard/screens/services/lib/service-list-item";
import { StatusSwitch } from "components/lib/status-switch";
import { useLoadServicesIncludingHidden } from "state/services";
import { SETTINGS_WIDTH } from "util/misc";

interface Props {
  operatorId: string;
}

export const ServiceList: React.FC<Props> = ({ operatorId }) => {
  const [loadServicesStatus, loadServicesForOperator, services] =
    useLoadServicesIncludingHidden((s) => [s.status, s.request, s.value]);

  useEffect(() => {
    if (operatorId) {
      loadServicesForOperator(operatorId);
    }
  }, [operatorId]);

  return (
    <StatusSwitch
      status={loadServicesStatus}
      error={
        <Typography>
          There was an error loading the operator&apos;s services
        </Typography>
      }
    >
      <ServiceCreateInput operatorId={operatorId} />

      <List
        sx={{
          width: "100%",
          maxWidth: SETTINGS_WIDTH,
          bgcolor: "background.paper",
        }}
      >
        {services?.map((service) => (
          <ServiceListItem
            key={service._id}
            operatorId={operatorId}
            service={service}
          />
        ))}
      </List>
    </StatusSwitch>
  );
};
