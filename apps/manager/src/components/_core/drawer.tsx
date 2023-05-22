import {
  Settings,
  Public,
  Business,
  Timeline,
  Schema,
  Dashboard,
} from "@mui/icons-material";
import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
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
  icon: React.ReactElement;
  title: string;
  url: string;
}

const linksForRole: Record<UserRole, Array<DrawerLink | "divider">> = {
  user: [],
  admin: [
    {
      icon: <Business />,
      title: "Operators",
      url: urls.admin.operators(),
    },
    {
      icon: <Timeline />,
      title: "Bookings",
      url: urls.admin.bookings(),
    },
    {
      icon: <Schema />,
      title: "Service types",
      url: urls.admin.serviceTypes(),
    },
  ],
  operator: [
    {
      icon: <Dashboard />,
      title: "Dashboard",
      url: urls.operators.dashboard(),
    },
    {
      icon: <Timeline />,
      title: "Bookings",
      url: urls.operators.bookings(),
    },
  ],
  "super-admin": [
    {
      icon: <Settings />,
      title: "Configuration",
      url: urls.superAdmin.configuration(),
    },
    {
      icon: <Public />,
      title: "Instances",
      url: urls.superAdmin.instances(),
    },
    "divider",
    {
      icon: <Business />,
      title: "Operators",
      url: urls.admin.operators(),
    },
    {
      icon: <Timeline />,
      title: "Bookings",
      url: urls.admin.bookings(),
    },
    {
      icon: <Schema />,
      title: "Service types",
      url: urls.admin.serviceTypes(),
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
                <ListItemIcon>{link.icon}</ListItemIcon>
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
