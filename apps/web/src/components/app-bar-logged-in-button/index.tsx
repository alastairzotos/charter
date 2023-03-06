import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { urls } from "urls";

import { useUserState } from "src/state/users";

export const AppBarLoggedInButton: React.FC = () => {
  const [logout, loggedInUser] = useUserState((s) => [
    s.logout,
    s.loggedInUser,
  ]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => setAnchorEl(null);

  const handleLogoutClick = () => {
    handleClose();
    logout();
  };

  if (!loggedInUser) {
    return null;
  }

  return (
    <>
      <Button
        color="inherit"
        variant="outlined"
        sx={{ borderRadius: 100000 }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <AccountCircleIcon />
        &nbsp;
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          Hello {loggedInUser.givenName}
        </Box>
        <Box sx={{ display: { xs: "block", md: "none" } }}>Account</Box>
        &nbsp;
        <KeyboardArrowDownIcon />
      </Button>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>
          <Link href={urls.account()} style={{ textDecoration: "none" }}>
            Account
          </Link>
        </MenuItem>
        {loggedInUser.role === "admin" && (
          <MenuItem>
            <Link href={urls.admin.home()} style={{ textDecoration: "none" }}>
              Admin
            </Link>
          </MenuItem>
        )}
        {loggedInUser.role === "operator" && (
          <MenuItem>
            <Link
              href={urls.operators.home()}
              style={{ textDecoration: "none" }}
            >
              Bookings
            </Link>
          </MenuItem>
        )}
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
    </>
  );
};
