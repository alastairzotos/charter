import ExploreIcon from "@mui/icons-material/Explore";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import * as React from "react";
import { urls } from "urls";

import { AppBarBase } from "src/components/app-bar-base";

export const AdminAppBar: React.FC = () => (
  <AppBarBase
    sx={{ backgroundColor: "#bbb", color: "#fff" }}
    pages={new Map([[urls.home(), "Home"]])}
  >
    <Link
      href={urls.admin.home()}
      style={{ textDecoration: "none", color: "white" }}
    >
      <ExploreIcon fontSize="large" sx={{ mr: 1 }} />
    </Link>
    <Link
      href={urls.admin.home()}
      style={{ textDecoration: "none", color: "white" }}
    >
      <Typography>Admin</Typography>
    </Link>

    <Box sx={{ pr: 3 }} />
  </AppBarBase>
);
