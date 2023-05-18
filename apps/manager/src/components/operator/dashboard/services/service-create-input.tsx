import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Typography, Menu, MenuItem, Button } from "@mui/material";
import { ServiceSchemaDto } from "dtos";
import { NestedMenuItem } from "mui-nested-menu";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { StatusSwitch } from "ui";

import { useOperatorDashboard } from "contexts/operator-dashboard";
import { useLoadServiceSchemas } from "state/service-schemas";

interface Props {
  operatorId: string;
}

export const ServiceCreateInput: React.FC<Props> = ({ operatorId }) => {
  const router = useRouter();
  const { getServiceCreateUrl } = useOperatorDashboard();

  const [loadServiceSchemasStatus, loadServiceSchemas, serviceSchemas] =
    useLoadServiceSchemas((s) => [s.status, s.request, s.value]);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    loadServiceSchemas();
  }, []);

  const handleServiceSchemaClick = (schema: ServiceSchemaDto) => {
    setAnchorEl(null);
    router.push(getServiceCreateUrl(operatorId, schema._id));
  };

  const serviceTypesMenu = serviceSchemas?.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.schemaCategory!.name]: {
        category: cur.schemaCategory!,
        schemas: [...(acc?.[cur.schemaCategory!.name]?.schemas || []), cur],
      },
    }),
    {} as Record<string, { schemas: ServiceSchemaDto[] }>
  );

  return (
    <StatusSwitch
      status={loadServiceSchemasStatus}
      error={
        <Typography>There was an error loading the service schemas</Typography>
      }
    >
      <Button variant="contained" onClick={(e) => setAnchorEl(e.currentTarget)}>
        New service <KeyboardArrowDownIcon />
      </Button>

      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        {serviceTypesMenu &&
          Object.keys(serviceTypesMenu).map((category) => (
            <NestedMenuItem key={category} parentMenuOpen label={category}>
              {serviceTypesMenu[category].schemas.map((schema) => (
                <MenuItem
                  key={schema._id}
                  onClick={() => handleServiceSchemaClick(schema)}
                >
                  {schema.name}
                </MenuItem>
              ))}
            </NestedMenuItem>
          ))}
      </Menu>
    </StatusSwitch>
  );
};
