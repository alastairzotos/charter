import {
  Button,
  Grid,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";

import { Surface } from "components/_core/surface";

type ResourceType = { _id: string; name: string };

interface Props<T extends ResourceType> {
  resources: T[];
  createTitle: string;
  createForm: (onCancel: () => void, onCreated: () => void) => React.ReactNode;
  editForm: (id: string) => React.ReactNode;
}

export const ResourceList = <T extends ResourceType>({
  resources,
  createTitle,
  createForm,
  editForm,
}: Props<T>) => {
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(
    null
  );
  const [creating, setCreating] = useState(false);

  const handleCreateClick = () => {
    setCreating(true);
    setSelectedResourceId(null);
  };

  const handleOnCreated = () => {
    setCreating(false);
    setSelectedResourceId(null);
  };

  return (
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
          {resources?.map((resource) => (
            <ListItemButton
              key={resource._id}
              onClick={() => setSelectedResourceId(resource._id)}
              selected={resource._id === selectedResourceId}
            >
              <ListItemText>{resource.name}</ListItemText>
            </ListItemButton>
          ))}
        </List>

        <div />

        <Button variant="contained" onClick={handleCreateClick}>
          {createTitle}
        </Button>
      </Grid>

      <Grid item xs={12} md={10}>
        {creating ? (
          <Surface sx={{ p: 2 }}>
            {createForm(() => setCreating(false), handleOnCreated)}
          </Surface>
        ) : (
          !!selectedResourceId && (
            <Surface sx={{ p: 2 }}>{editForm(selectedResourceId)}</Surface>
          )
        )}
      </Grid>
    </Grid>
  );
};
