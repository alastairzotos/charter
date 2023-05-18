import {
  Button,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { ServiceSchemaDto } from "dtos";
import React, { useEffect, useState } from "react";
import { StatusSwitch } from "ui";

import { Surface } from "components/_core/surface";
import { ServiceTypeVariantCreate } from "components/admin/service-types/variants/service-type-variant-create";
import { ServiceTypeVariantEdit } from "components/admin/service-types/variants/service-type-variant-edit";
import { useLoadServiceSchemasByCategoryId } from "state/service-schemas";

interface Props {
  categoryId: string;
}

export const ServiceTypeVariants: React.FC<Props> = ({ categoryId }) => {
  const [getVariantsStatus, getVariants, variants] =
    useLoadServiceSchemasByCategoryId((s) => [s.status, s.request, s.value]);
  const [selectedSchemaId, setSelectedSchemaId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    getVariants(categoryId);
    setSelectedSchemaId(null);
  }, [categoryId]);

  const handleVariantCreated = async () => {
    setCreating(false);
    await getVariants(categoryId);
    setSelectedSchemaId(null);
  };

  const handleVariantSaved = async (variant: ServiceSchemaDto) => {
    await getVariants(categoryId);
    setSelectedSchemaId(variant._id);
  };

  const handleVariantDeleted = async () => {
    await getVariants(categoryId);
    setSelectedSchemaId(null);
  };

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
        <Grid container spacing={1}>
          <Grid
            item
            xs={12}
            md={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <List>
              {variants.map((variant) => (
                <ListItemButton
                  key={variant._id}
                  onClick={() => setSelectedSchemaId(variant._id)}
                  selected={variant._id === selectedSchemaId}
                >
                  <ListItemText>{variant.name}</ListItemText>
                </ListItemButton>
              ))}
            </List>

            <div />

            <Button variant="contained" onClick={() => setCreating(true)}>
              New variant
            </Button>
          </Grid>

          <Grid item xs={12} md={10}>
            {creating ? (
              <Surface sx={{ p: 2 }}>
                <ServiceTypeVariantCreate
                  schemaCategoryId={categoryId}
                  attemptToUseVariant={variants[0]}
                  onCreated={handleVariantCreated}
                  onCancel={() => setCreating(false)}
                />
              </Surface>
            ) : (
              !!selectedSchemaId && (
                <Surface sx={{ p: 2 }}>
                  <ServiceTypeVariantEdit
                    id={selectedSchemaId}
                    onSave={handleVariantSaved}
                    onDelete={handleVariantDeleted}
                  />
                </Surface>
              )
            )}
          </Grid>
        </Grid>
      )}
    </StatusSwitch>
  );
};
