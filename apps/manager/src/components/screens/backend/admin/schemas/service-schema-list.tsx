import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import { StatusSwitch } from "ui";
import { urls } from "urls";

import { useLoadServiceSchemas } from "state/service-schemas";

export const ServiceSchemaList: React.FC = () => {
  const { status, request, value } = useLoadServiceSchemas();

  useEffect(() => {
    request();
  }, []);

  return (
    <>
      <StatusSwitch
        status={status}
        error={
          <Typography>
            There was an error loading the service schemas
          </Typography>
        }
      >
        <List>
          {value?.map((serviceSchema) => (
            <ListItem
              key={serviceSchema._id}
              component={Link}
              href={urls.admin.serviceSchema(serviceSchema._id)}
            >
              <ListItemText>{serviceSchema.name}</ListItemText>
            </ListItem>
          ))}
        </List>
      </StatusSwitch>

      <div />

      <Button
        variant="contained"
        component={Link}
        href={urls.admin.serviceSchemaCreate()}
      >
        Create
      </Button>
    </>
  );
};
