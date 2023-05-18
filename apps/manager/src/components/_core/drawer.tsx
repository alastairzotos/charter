import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { UserRole } from "dtos";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { urls } from "urls";

import { CharterLogo } from "components/_core/charter-logo";

export const DRAWER_WIDTH = 260;

interface Props {
  role: UserRole;
}

interface DrawerLink {
  title: string;
  url: string;
}

const linksForRole: Record<UserRole, Array<DrawerLink | "divider">> = {
  user: [],
  admin: [
    {
      title: "Operators",
      url: urls.admin.operators(),
    },
    {
      title: "Bookings",
      url: urls.admin.bookings(),
    },
    {
      title: "Schemas",
      url: urls.admin.serviceSchemas(),
    },
    {
      title: "Schema categories",
      url: urls.admin.serviceSchemaCategories(),
    },
  ],
  operator: [
    {
      title: "Dashboard",
      url: urls.operators.dashboard(),
    },
    {
      title: "Bookings",
      url: urls.operators.bookings(),
    },
  ],
  "super-admin": [
    {
      title: "Configuration",
      url: urls.superAdmin.configuration(),
    },
    {
      title: "Instances",
      url: urls.superAdmin.instances(),
    },
    "divider",
    {
      title: "Operators",
      url: urls.admin.operators(),
    },
    {
      title: "Bookings",
      url: urls.admin.bookings(),
    },
    {
      title: "Schemas",
      url: urls.admin.serviceSchemas(),
    },
    {
      title: "Schema categories",
      url: urls.admin.serviceSchemaCategories(),
    },
  ],
};

export const AppDrawer: React.FC<Props> = ({ role }) => {
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <div>
      <Toolbar sx={{ backgroundColor: "#0e60b0" }}>
        <CharterLogo url={urls.superAdmin.home()} />
      </Toolbar>
      <Divider />
      <List>
        {linksForRole[role].map((link, index) => (
          <React.Fragment key={index}>
            {link === "divider" ? (
              <Divider />
            ) : (
              <ListItemButton
                component={Link}
                href={link.url}
                selected={router.pathname.startsWith(link.url)}
              >
                <ListItemText primary={link.title} />
              </ListItemButton>
            )}
          </React.Fragment>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
};
