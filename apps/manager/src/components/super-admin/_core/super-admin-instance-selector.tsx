import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, CircularProgress, Menu, MenuItem } from "@mui/material";
import { InstanceDto } from "dtos";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useCurrentInstance } from "state/current-instance";
import { useGetInstances } from "state/instances";

export const SuperAdminInstanceSelector: React.FC = () => {
  const router = useRouter();
  const { status, request: getInstances, value: instances } = useGetInstances();
  const { init, currentInstance, setCurrentInstance } = useCurrentInstance();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClose = () => setAnchorEl(null);

  const handleSelectInstance = (instance: InstanceDto) => {
    handleClose();
    setCurrentInstance(instance);
    router.reload();
  };

  useEffect(() => {
    getInstances();
  }, []);

  useEffect(() => {
    if (instances) {
      init(instances);
    }
  }, [instances]);

  return (
    <>
      <Button
        color="inherit"
        variant="outlined"
        sx={{ borderRadius: 100000, mr: 2 }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        {status === "fetching" && <CircularProgress size={20} sx={{ mr: 1 }} />}
        {currentInstance ? currentInstance.name : "No instance selected"}
        &nbsp;
        <KeyboardArrowDownIcon />
      </Button>
      {status === "success" && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {instances?.map((instance) => (
            <MenuItem
              key={instance._id}
              onClick={() => handleSelectInstance(instance)}
            >
              {instance.name}
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
};
