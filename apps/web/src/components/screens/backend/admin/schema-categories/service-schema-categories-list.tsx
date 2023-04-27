import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import { urls } from "urls";

import { StatusSwitch } from "components/lib/_core/status-switch";
import { useLoadServiceSchemaCategories } from "state/service-schema-categories";

export const ServiceSchemaCategoryList: React.FC = () => {
  const {
    status,
    request,
    value: categories,
  } = useLoadServiceSchemaCategories();

  useEffect(() => {
    request();
  }, []);

  return (
    <>
      <StatusSwitch
        status={status}
        error={
          <Typography>
            There was an error loading the service schema categories
          </Typography>
        }
      >
        <List>
          {categories?.map((category) => (
            <ListItem
              key={category._id}
              component={Link}
              href={urls.admin.serviceSchemaCategory(category._id)}
            >
              <ListItemText>{category.pluralName}</ListItemText>
            </ListItem>
          ))}
        </List>
      </StatusSwitch>

      <div />

      <Button
        variant="contained"
        component={Link}
        href={urls.admin.serviceSchemaCategoryCreate()}
      >
        Create
      </Button>
    </>
  );
};
