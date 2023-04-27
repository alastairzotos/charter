import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { StatusSwitch } from "ui";

import { ManageServiceSchemaForm } from "components/lib/backend/admin/schemas/service-schema-manage";
import {
  useDeleteServiceSchema,
  useLoadServiceSchemaById,
  useUpdateServiceSchema,
} from "state/service-schemas";

interface Props {
  id: string;
}

export const ServiceSchemaEdit: React.FC<Props> = ({ id }) => {
  const [loadSchemaStatus, loadSchema, schema] = useLoadServiceSchemaById(
    (s) => [s.status, s.request, s.value]
  );
  const [updateSchemaStatus, updateSchema] = useUpdateServiceSchema((s) => [
    s.status,
    s.request,
  ]);
  const [deleteSchemaStatus, deleteSchema] = useDeleteServiceSchema((s) => [
    s.status,
    s.request,
  ]);

  useEffect(() => {
    if (id) {
      loadSchema(id);
    }
  }, [id]);

  return (
    <StatusSwitch
      status={loadSchemaStatus}
      error={
        <Typography>There was an error loading the service schema</Typography>
      }
    >
      <ManageServiceSchemaForm
        title="Edit service schema"
        serviceSchema={schema!}
        onSave={(newSchema) => updateSchema(id, newSchema)}
        saveStatus={updateSchemaStatus}
        onDelete={() => deleteSchema(id)}
        deleteStatus={deleteSchemaStatus}
      />
    </StatusSwitch>
  );
};
