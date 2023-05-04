import { Box, Button, Typography } from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { urls } from "urls";

import { useUserState } from "state/users";

const HomePage: NextPage = () => {
  const { initialised, loggedInUser } = useUserState();

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#bbc",
          ml: -15,
          mr: -15,
          mt: -6,
          p: 16,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Image
            src="/bm-logo-black.svg"
            alt="BitMetro Logo"
            width={100}
            height={100}
          />
          <Typography variant="h2" sx={{ mt: 4, ml: 2 }}>
            Charter
          </Typography>
        </Box>
        <Typography variant="h3" sx={{ mt: 4, ml: 2 }}>
          Next level tourism management
        </Typography>
      </Box>

      <Box sx={{ p: 16, textAlign: "center" }}>
        {initialised && !loggedInUser && (
          <>
            <Typography variant="h5">
              Manage your service offerings, handle bookings, and local
              operators using Charter.
            </Typography>

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              size="large"
              component={Link}
              href={urls.login()}
            >
              Login to get started
            </Button>
          </>
        )}

        {initialised && loggedInUser?.role === "user" && (
          <>
            <Typography>
              If you are an operator, wait for the admin to register you.
            </Typography>
            <Typography>
              When they have, refresh this page and go to your admin settings to
              manage your services.
            </Typography>
          </>
        )}

        {initialised && !!loggedInUser && loggedInUser?.role !== "user" && (
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            size="large"
            component={Link}
            href={
              loggedInUser.role === "admin"
                ? urls.admin.home()
                : loggedInUser.role === "operator"
                ? urls.operators.home()
                : loggedInUser.role === "super-admin"
                ? urls.superAdmin.home()
                : ""
            }
          >
            Go to admin panel
          </Button>
        )}
      </Box>
    </>
  );

  return (
    <>
      <Typography>
        If you are an operator, wait for the admin to register you.
      </Typography>
      <Typography>
        When they have, log out of this page and log back in and you will be
        able to manage your services.
      </Typography>
    </>
  );
};

HomePage.getInitialProps = () => ({});

export default HomePage;
