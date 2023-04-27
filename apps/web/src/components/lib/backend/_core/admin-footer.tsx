import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import Image from "next/image";
import React from "react";

export const AdminFooter: React.FC = () => {
  return (
    <Box sx={{ bgcolor: grey[300], p: 10 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Image
          src="/bm-logo.png"
          alt={`BitMetro logo`}
          width={64}
          height={64}
        />
      </Box>
    </Box>
  );
};
