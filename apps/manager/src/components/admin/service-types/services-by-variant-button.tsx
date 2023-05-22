import ViewListIcon from "@mui/icons-material/ViewList";
import { Popover, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { StatusSwitch } from "ui";

import { useLoadServicesWithOperatorsBySchemaId } from "state/services";

interface Props {
  schemaId: string;
}

export const ServicesByVariantButton: React.FC<Props> = ({ schemaId }) => {
  const [anchorEl, setAnchorEl] = React.useState<SVGSVGElement | null>(null);

  const [loadServicesStatus, loadServices, services] =
    useLoadServicesWithOperatorsBySchemaId((s) => [
      s.status,
      s.request,
      s.value,
    ]);

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (open) {
      loadServices(schemaId);
    }
  }, [schemaId, open]);

  return (
    <>
      <ViewListIcon
        onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
        onMouseLeave={() => setAnchorEl(null)}
      />

      <Popover
        disableRestoreFocus
        sx={{
          pointerEvents: "none",
        }}
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <StatusSwitch
          status={loadServicesStatus}
          error={<Typography>Error</Typography>}
        >
          {services && (
            <Typography sx={{ m: 2 }}>
              {services.length} service{services.length === 1 ? "" : "s"}
            </Typography>
          )}
        </StatusSwitch>
      </Popover>
    </>
  );
};
