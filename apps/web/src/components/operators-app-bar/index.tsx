import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { urls } from "urls";

import { AppBarLoginLogout } from "src/components/app-bar-login-logout";
import { APP_NAME } from "src/util/misc";

export const OperatorsAppBar: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static" color="secondary">
        <Toolbar>
          <Link href={urls.home()}>
            <Image
              src="/logo.png"
              alt={`${APP_NAME} logo`}
              width={64}
              height={64}
            />
          </Link>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              href={urls.admin.home()}
              style={{ textDecoration: "none", color: "white" }}
            >
              {APP_NAME} Operator
            </Link>
          </Typography>

          <AppBarLoginLogout />
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
};
