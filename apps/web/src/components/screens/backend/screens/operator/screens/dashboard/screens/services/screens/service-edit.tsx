import { Typography } from "@mui/material";
import React, { useEffect } from "react";

import { ManageServiceForm } from "components/screens/backend/screens/operator/screens/dashboard/screens/services/lib/service-manage";
import { StatusSwitch } from "components/lib/status-switch";
import {
  useDeleteService,
  useLoadService,
  useUpdateService,
} from "state/services";

interface Props {
  id: string;
  operatorId: string;
}

export const ServiceEdit: React.FC<Props> = ({ id, operatorId }) => {
  const [loadServiceStatus, loadService, service] = useLoadService((s) => [
    s.status,
    s.request,
    s.value,
  ]);
  const [updateServiceStatus, updateService] = useUpdateService((s) => [
    s.status,
    s.request,
  ]);
  const [deleteServiceStatus, deleteService] = useDeleteService((s) => [
    s.status,
    s.request,
  ]);

  useEffect(() => {
    if (id) {
      loadService(id);
    }
  }, [id]);

  return (
    <StatusSwitch
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
    </StatusSwitch>
  );
};
