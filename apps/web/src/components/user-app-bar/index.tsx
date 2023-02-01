import { Button } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { urls } from "urls";

import { AppBarLoginLogout } from "src/components/app-bar-login-logout";
import { APP_NAME } from "src/util/misc";

export const UserAppBar: React.FC = () => {
  const pages = new Map<string, string>([
    [urls.home(), "Home"],
    [urls.user.operators(), "Operators"],
  ]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="fixed">
        <Toolbar>
          <Link href={urls.home()}>
            <Image
              src="/logo.png"
              alt={`${APP_NAME} logo`}
              width={64}
              height={64}
            />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {Array.from(pages.keys()).map((url) => (
              <Link key={url} href={url} style={{ textDecoration: "none" }}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  {pages.get(url)}
                </Button>
              </Link>
            ))}
          </Box>

          <AppBarLoginLogout />
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
};
