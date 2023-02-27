import { Typography } from "@mui/material";
import React, { useEffect } from "react";

import { ServiceSchemaCategoryManage } from "src/components/service-schema-category-manage";
import { StatusSwitch } from "src/components/status-switch";
import {
  useDeleteServiceSchemaCategory,
  useLoadServiceSchemaCategory,
  useUpdateServiceSchemaCategory,
} from "src/state/service-schema-categories";

interface Props {
  id: string;
}

export const ServiceSchemaCategoryEdit: React.FC<Props> = ({ id }) => {
  const [loadSchemaCategoryStatus, loadSchemaCategory, schemaCategory] =
    useLoadServiceSchemaCategory((s) => [s.status, s.request, s.value]);
  const [updateSchemaCategoryStatus, updateSchemaCategory] =
    useUpdateServiceSchemaCategory((s) => [s.status, s.request]);
  const [deleteSchemaCategoryStatus, deleteSchemaCategory] =
    useDeleteServiceSchemaCategory((s) => [s.status, s.request]);

  useEffect(() => {
    if (id) {
      loadSchemaCategory(id);
    }
  }, [id]);

  return (
    <StatusSwitch
      status={loadSchemaCategoryStatus}
      error={
        <Typography>There was an error loading the service schema</Typography>
      }
    >
      <ServiceSchemaCategoryManage
        title="Edit service schema category"
        serviceSchemaCategory={schemaCategory!}
        onSave={(newSchemaCategory) =>
          updateSchemaCategory(id, newSchemaCategory)
        }
        saveStatus={updateSchemaCategoryStatus}
        onDelete={() => deleteSchemaCategory(id)}
        deleteStatus={deleteSchemaCategoryStatus}
      />
    </StatusSwitch>
  );
};
