import { Typography } from "@mui/material";
import React, { useEffect } from "react";

import { Fetchable } from "src/components/fetchable";
import { ManageServiceForm } from "src/components/service-manage";
import { useServicesState } from "src/state/services";

interface Props {
  id: string;
  operatorId: string;
}

export const ServiceEdit: React.FC<Props> = ({ id, operatorId }) => {
  const [loadServiceStatus, loadService, service] = useServicesState((s) => [
    s.loadServiceStatus,
    s.loadService,
    s.service,
  ]);
  const [updateServiceStatus, updateService] = useServicesState((s) => [
    s.updateServiceStatus,
    s.updateService,
  ]);
  const [deleteServiceStatus, deleteService] = useServicesState((s) => [
    s.deleteServiceStatus,
    s.deleteService,
  ]);

  useEffect(() => {
    if (id) {
      loadService(id);
    }
  }, [id]);

  return (
    <Fetchable
      status={loadServiceStatus}
      error={<Typography>There was an error loading the service</Typography>}
    >
      <ManageServiceForm
        title="Edit service"
        operatorId={operatorId}
        service={service!}
        onSave={(newService) => updateService(id, newService)}
        saveStatus={updateServiceStatus}
        onDelete={() => deleteService(id)}
        deleteStatus={deleteServiceStatus}
      />
    </Fetchable>
  );
};
