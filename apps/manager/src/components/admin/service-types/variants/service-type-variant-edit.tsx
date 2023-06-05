import { Typography } from "@mui/material";
import { ServiceSchemaNoId } from "dtos";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { StatusSwitch } from "ui";
import { urls } from "urls";

import { ServicesByVariantButton } from "components/admin/service-types/services-by-variant-button";
import { ManageServiceTypeVariantForm } from "components/admin/service-types/variants/service-type-variant-manage";
import {
  useDeleteServiceSchema,
  useLoadServiceSchemaById,
  useUpdateServiceSchema,
} from "state/service-schemas";

interface Props {
  id: string;
  onDelete: () => void;
}

export const ServiceTypeVariantEdit: React.FC<Props> = ({ id, onDelete }) => {
  const router = useRouter();

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

  const handleSave = async (newSchema: ServiceSchemaNoId) => {
    await updateSchema(id, newSchema);
  };

  const handleDelete = async () => {
    await deleteSchema(id);
    onDelete();
  };

  return (
    <StatusSwitch
      status={loadSchemaStatus}
      error={
        <Typography>
          There was an error loading the service type variant
        </Typography>
      }
    >
      <ManageServiceTypeVariantForm
        title="Edit"
        initialValues={schema!}
        onSave={handleSave}
        saveStatus={updateSchemaStatus}
        onDelete={handleDelete}
        deleteStatus={deleteSchemaStatus}
        actionIcon={<ServicesByVariantButton schemaId={id} />}
        onActionClick={() => router.push(urls.admin.serviceType(id))}
      />
    </StatusSwitch>
  );
};
