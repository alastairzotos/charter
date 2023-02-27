import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { ServiceSchemaDto } from "dtos";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { urls } from "urls";

import { StatusSwitch } from "src/components/status-switch";
import { useLoadServiceSchemas } from "src/state/service-schemas";

interface Props {
  operatorId: string;
}

export const ServiceCreateButton: React.FC<Props> = ({ operatorId }) => {
  const router = useRouter();

  const [loadServiceSchemasStatus, loadServiceSchemas, serviceSchemas] =
    useLoadServiceSchemas((s) => [s.status, s.request, s.value]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    loadServiceSchemas();
  }, []);

  const handleServiceSchemaClick = (schema: ServiceSchemaDto) => {
    setAnchorEl(null);
    router.push(urls.admin.servicesCreate(operatorId, schema._id));
  };

  return (
    <StatusSwitch
      status={loadServiceSchemasStatus}
      error={
        <Typography>There was an error loading the service schemas</Typography>
      }
    >
      <Button
        variant="contained"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ mt: 3 }}
      >
        Add service &nbsp;
        <KeyboardArrowDownIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {serviceSchemas?.map((schema) => (
          <MenuItem
            key={schema._id}
            onClick={() => handleServiceSchemaClick(schema)}
          >
            {schema.label}
          </MenuItem>
        ))}
      </Menu>
    </StatusSwitch>
  );
};
