import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { StatusSwitch } from "ui";

import { ResourceList } from "components/admin/service-types/_core/resource-list";
import { ServiceTypeCreate } from "components/admin/service-types/types/service-type-create";
import { ServiceTypeManageTabs } from "components/admin/service-types/types/service-type-manage-tabs";
import { useLoadServiceSchemaCategories } from "state/service-schema-categories";

export const ServiceTypesList: React.FC = () => {
  const [loadCategoriesStatus, loadCategories, categories] =
    useLoadServiceSchemaCategories((s) => [s.status, s.request, s.value]);

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <StatusSwitch
      status={loadCategoriesStatus}
      error={
        <Typography>There was an error loading the service types</Typography>
      }
    >
      <ResourceList
        resources={categories!}
        createTitle="New service type"
        createForm={(onCancel, onCreated) => (
          <ServiceTypeCreate
            onCreated={async () => {
              await loadCategories();
              onCreated();
            }}
            onCancel={onCancel}
          />
        )}
        editForm={(id) => <ServiceTypeManageTabs id={id} />}
      />
    </StatusSwitch>
  );
};
