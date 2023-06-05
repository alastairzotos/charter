import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { StatusSwitch } from "ui";

import { ResourceList } from "components/admin/service-types/_core/resource-list";
import { ServiceTypeVariantCreate } from "components/admin/service-types/variants/service-type-variant-create";
import { ServiceTypeVariantEdit } from "components/admin/service-types/variants/service-type-variant-edit";
import { useLoadServiceSchemasByCategoryId } from "state/service-schemas";

interface Props {
  categoryId: string;
}

export const ServiceTypeVariants: React.FC<Props> = ({ categoryId }) => {
  const [getVariantsStatus, getVariants, variants] =
    useLoadServiceSchemasByCategoryId((s) => [s.status, s.request, s.value]);

  useEffect(() => {
    getVariants(categoryId);
  }, [categoryId]);

  return (
    <StatusSwitch
      status={getVariantsStatus}
      error={
        <Typography>
          There was an error getting the service type variants
        </Typography>
      }
    >
      {!!variants && (
        <Box sx={{ pr: 1 }}>
          <ResourceList
            resources={variants}
            createTitle="Variant"
            createForm={(onCancel, onCreated) => (
              <ServiceTypeVariantCreate
                schemaCategoryId={categoryId}
                attemptToUseVariant={variants[0]}
                onCreated={async () => {
                  await getVariants(categoryId);
                  onCreated();
                }}
                onCancel={onCancel}
              />
            )}
            editForm={(id) => (
              <ServiceTypeVariantEdit
                id={id}
                onDelete={() => getVariants(categoryId)}
              />
            )}
          />
        </Box>
      )}
    </StatusSwitch>
  );
};
