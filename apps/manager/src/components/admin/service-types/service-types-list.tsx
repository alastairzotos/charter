import {
  Button,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { StatusSwitch } from "ui";

import { Surface } from "components/_core/surface";
import { ServiceTypeCreate } from "components/admin/service-types/types/service-type-create";
import { ServiceTypeManageTabs } from "components/admin/service-types/types/service-type-manage-tabs";
import { useLoadServiceSchemaCategories } from "state/service-schema-categories";

export const ServiceTypesList: React.FC = () => {
  const [loadCategoriesStatus, loadCategories, categories] =
    useLoadServiceSchemaCategories((s) => [s.status, s.request, s.value]);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreatedServiceType = async () => {
    await loadCategories();
    setSelectedCategoryId(null);
    setCreating(false);
  };

  return (
    <>
      <StatusSwitch
        status={loadCategoriesStatus}
        error={
          <Typography>There was an error loading the service types</Typography>
        }
      >
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
              {categories?.map((category) => (
                <ListItemButton
                  key={category._id}
                  onClick={() => setSelectedCategoryId(category._id)}
                  selected={category._id === selectedCategoryId}
                >
                  <ListItemText>{category.pluralName}</ListItemText>
                </ListItemButton>
              ))}
            </List>

            <div />

            <Button variant="contained" onClick={() => setCreating(true)}>
              New service type
            </Button>
          </Grid>

          <Grid item xs={12} md={10}>
            {creating ? (
              <Surface sx={{ p: 2 }}>
                <ServiceTypeCreate
                  onCreated={handleCreatedServiceType}
                  onCancel={() => setCreating(false)}
                />
              </Surface>
            ) : (
              !!selectedCategoryId && (
                <Surface sx={{ p: 2 }}>
                  <ServiceTypeManageTabs id={selectedCategoryId} />
                </Surface>
              )
            )}
          </Grid>
        </Grid>
      </StatusSwitch>
    </>
  );
};
