import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Menu, MenuItem } from "@mui/material";
import { getServiceTypeLabel, ServiceType, serviceTypes } from "dtos";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { urls } from "urls";

interface Props {
  operatorId: string;
}

export const ServiceCreateButton: React.FC<Props> = ({ operatorId }) => {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleServiceTypeClick = (serviceType: ServiceType) => {
    setAnchorEl(null);
    router.push(urls.admin.servicesCreate(operatorId, serviceType));
  };

  return (
    <>
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
        {serviceTypes
          .filter((type) => type !== "none")
          .map((serviceType: ServiceType) => (
            <MenuItem
              key={serviceType}
              onClick={() => handleServiceTypeClick(serviceType)}
            >
              {getServiceTypeLabel(serviceType)}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};
