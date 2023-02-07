import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { urls } from "urls";

import { AppBarLoginLogout } from "src/components/app-bar-login-logout";
import { APP_NAME } from "src/util/misc";

interface Props {
  title?: string;
  pages?: Map<string, string>;
}

export const AppBarBase: React.FC<Props> = ({
  title,
  pages = new Map(),
}) => {
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleClickUrl = (url: string) => {
    setAnchorElNav(null);
    router.push(url);
  };

  return (
    <>
      <MuiAppBar position="fixed" sx={{ backgroundColor: '#224394' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {Array.from(pages.keys()).length > 0 && (
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  sx={{ color: "white" }}
                  onClick={(e) => setAnchorElNav(e.currentTarget)}
                >
                  <MenuIcon />
                </IconButton>

                <Menu
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={() => setAnchorElNav(null)}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {Array.from(pages.keys()).map((url) => (
                    <MenuItem key={url} onClick={() => handleClickUrl(url)}>
                      <Typography>{pages.get(url)}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}

            <Link href={urls.home()}>
              <Image
                src="/booking-logo.jpg"
                alt={`${APP_NAME} logo`}
                width={64}
                height={64}
              />
            </Link>

            {title && <Typography>{title}</Typography>}

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {Array.from(pages.keys()).map((url) => (
                <Link key={url} href={url} style={{ textDecoration: "none" }}>
                  <Button sx={{ my: 2, color: "white", display: "block" }}>
                    {pages.get(url)}
                  </Button>
                </Link>
              ))}
            </Box>

            <Box sx={{ display: "flex", flexGrow: 1 }} />

            <Box sx={{ display: "flex", flexGrow: 0 }}>
              <AppBarLoginLogout />
            </Box>
          </Toolbar>
        </Container>
      </MuiAppBar>
      <Toolbar />
    </>
  );
};
