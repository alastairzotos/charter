import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { StatusSwitch } from "ui";

import { ManageInstanceForm } from "components/super-admin/instances/instance-manage";
import { useGetInstanceById, useUpdateInstance } from "state/instances";

interface Props {
  id: string;
}

export const InstanceEdit: React.FC<Props> = ({ id }) => {
  const [loadInstanceStatus, loadInstance, instance] = useGetInstanceById(
    (s) => [s.status, s.request, s.value]
  );
  const [updateInstanceStatus, updateInstance] = useUpdateInstance((s) => [
    s.status,
    s.request,
  ]);

  useEffect(() => {
    if (id) {
      loadInstance(id);
    }
  }, [id]);

  return (
    <StatusSwitch
      status={loadInstanceStatus}
      error={<Typography>There was an error loading the operator</Typography>}
    >
      <ManageInstanceForm
        title="Edit instance"
        initialValues={instance!}
        onSave={(newInstance) => updateInstance(id, newInstance)}
        saveStatus={updateInstanceStatus}
      />
    </StatusSwitch>
  );
};
