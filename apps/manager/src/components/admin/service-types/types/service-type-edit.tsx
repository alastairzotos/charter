import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { StatusSwitch } from "ui";

import { ServiceTypeManage } from "components/admin/service-types/types/service-type-manage";
import {
  useDeleteServiceSchemaCategory,
  useLoadServiceSchemaCategory,
  useUpdateServiceSchemaCategory,
} from "state/service-schema-categories";

interface Props {
  id: string;
}

export const ServiceTypeEdit: React.FC<Props> = ({ id }) => {
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
        <Typography>There was an error loading the service type</Typography>
      }
    >
      <ServiceTypeManage
        initialValues={schemaCategory!}
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