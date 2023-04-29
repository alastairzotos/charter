import { Button, List, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import React, { useEffect } from "react";
import { StatusSwitch } from "ui";
import { urls } from "urls";

import { useGetInstances } from "state/instances";
import { SETTINGS_WIDTH } from "util/misc";

export const InstancesList: React.FC = () => {
  const {
    status: getInstancesStatus,
    request: getInstances,
    value: instances,
  } = useGetInstances();

  useEffect(() => {
    getInstances();
  }, []);

  return (
    <>
      <StatusSwitch
        status={getInstancesStatus}
        error={
          <Typography>There was an error getting the instances</Typography>
        }
      >
        {instances && (
          <List sx={{ maxWidth: SETTINGS_WIDTH }}>
            {instances.map((instance) => (
              <ListItem
                key={instance._id}
                component={Link}
                href={urls.superAdmin.instance(instance._id)}
              >
                <ListItemText primary={instance.name} />
              </ListItem>
            ))}
          </List>
        )}
      </StatusSwitch>

      <div>
        <Button
          variant="contained"
          sx={{ mt: 1 }}
          component={Link}
          href={urls.superAdmin.instanceCreate()}
        >
          Create
        </Button>
      </div>
    </>
  );
};
