import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  SxProps,
  Typography,
  styled,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { useIsDesktop, useIsMobile } from "../hooks";

export interface AppBarBaseProps {
  sx?: SxProps;
  logo?: React.ReactNode;
  pages?: Map<string, string>;
  rightButton?: React.ReactNode;
  alwaysShowLogo?: boolean;
}

const LogoArea = styled("div")(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
}));

export const AppBarBase: React.FC<React.PropsWithChildren<AppBarBaseProps>> = ({
  sx,
  logo = <></>,
  pages = new Map(),
  rightButton,
  alwaysShowLogo = true,
  children,
}) => {
  const router = useRouter();
  const isMobile = useIsMobile();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleClickUrl = (url: string) => {
    setAnchorElNav(null);
    router.push(url);
  };

  return (
    <MuiAppBar position="fixed" sx={sx}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {alwaysShowLogo ? logo : isMobile && <LogoArea>{logo}</LogoArea>}

          <Box sx={{ ml: 2, display: { xs: "none", md: "flex" } }}>
            {Array.from(pages.keys()).map((url) => (
              <Link key={url} href={url} style={{ textDecoration: "none" }}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  {pages.get(url)}
                </Button>
              </Link>
            ))}
          </Box>

          {children}

          <Box sx={{ display: "flex", flexGrow: 1 }} />

          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            {rightButton}
          </Box>

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
                <MenuItem>{rightButton}</MenuItem>
                {Array.from(pages.keys()).map((url) => (
                  <MenuItem key={url} onClick={() => handleClickUrl(url)}>
                    <Typography>{pages.get(url)}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};
