import {
  Box,
  Button,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  styled,
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

const Background = styled("div")<{ hovered: boolean }>(
  ({ theme, hovered }) => ({
    backgroundColor: hovered ? "#f8f8f8" : "none",
    transition: "background-color 0.2s linear",
    margin: theme.spacing(-3),
    padding: theme.spacing(3),
  })
);

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

  const [hovered, setHovered] = useState(false);

  const handleCreateClick = () => {
    setCreating(true);
    setSelectedResourceId(null);
  };

  const handleOnCreated = () => {
    setCreating(false);
    setSelectedResourceId(null);
  };

  return (
    <Background hovered={hovered}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 1,
              height: "100%",
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
          </Box>
        </Grid>

        <Grid item xs={12} md={10}>
          <Box
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
          >
            {creating ? (
              <Surface sx={{ p: 2 }}>
                {createForm(() => setCreating(false), handleOnCreated)}
              </Surface>
            ) : (
              !!selectedResourceId && (
                <Surface sx={{ p: 2 }}>{editForm(selectedResourceId)}</Surface>
              )
            )}
          </Box>
        </Grid>
      </Grid>
    </Background>
  );
};
