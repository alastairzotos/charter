import { Box, Button, Typography, useTheme } from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { urls } from "urls";

import { useUserState } from "state/users";
import { useIsDesktop } from "ui";

const SIDEBAR_WIDTH = 350;

const HomePage: NextPage = () => {
  const { initialised, loggedInUser } = useUserState();
  const {
    palette: { mode },
  } = useTheme();
  const isDesktop = useIsDesktop();

  console.log(mode);

  const prompt =
    "Manage your service offerings, handle bookings, and local operators using Charter.";

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          p: 5,
          width: isDesktop ? SIDEBAR_WIDTH : "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Image
          src={
            mode === "light"
              ? "/bm-logo-new-black.png"
              : "/bm-logo-new-white.png"
          }
          alt="BitMetro Logo"
          width={100}
          height={100}
        />
        <Typography variant="h2" sx={{ mt: 4, ml: 2 }}>
          Charter
        </Typography>

        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          {!isDesktop && (
            <Typography variant="h4" sx={{ pt: 4 }}>
              {prompt}
            </Typography>
          )}
        </Box>

        <Box sx={{ p: 2, pb: 10, textAlign: "center" }}>
          {initialised && !loggedInUser && (
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              size="large"
              component={Link}
              href={urls.login()}
            >
              Login to get started
            </Button>
          )}

          {initialised && loggedInUser?.role === "user" && (
            <>
              <Typography>
                If you are an operator, wait for the admin to register you.
              </Typography>
              <Typography>
                When they have, refresh this page and go to your admin settings
                to manage your services.
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
      </Box>

      {isDesktop && (
        <Box
          sx={{
            width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
            height: "100vh",
            p: 5,
            backgroundImage:
              mode === "light"
                ? `url(/corfu-day.jpeg)`
                : "url(/corfu-night.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              p: 6,
              backgroundColor:
                mode === "dark"
                  ? "rgba(0, 0, 0, 0.4)"
                  : "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(20px)",
            }}
          >
            {prompt}
          </Typography>
        </Box>
      )}
    </Box>
  );

  // return (
  //   <>
  //     <Typography>
  //       If you are an operator, wait for the admin to register you.
  //     </Typography>
  //     <Typography>
  //       When they have, log out of this page and log back in and you will be
  //       able to manage your services.
  //     </Typography>
  //   </>
  // );
};

HomePage.getInitialProps = () => ({});

export default HomePage;
