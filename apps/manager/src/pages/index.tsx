import { Box, Button, Typography, useTheme } from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useIsDesktop } from "ui";
import { urls } from "urls";

import { CharterLogo } from "components/_core/charter-logo";
import { SeoHead } from "components/_core/seo-head";
import { LoginForm } from "components/login";
import { useUserState } from "state/users";

const SIDEBAR_WIDTH = 350;

const HomePage: NextPage = () => {
  const { initialised, loggedInUser } = useUserState();
  const {
    palette: { mode },
  } = useTheme();
  const isDesktop = useIsDesktop();

  const prompt =
    "Manage local tour operators, service offerings and bookings using the world's most advanced local tourism CMS and booking engine";

  return (
    <>
      <SeoHead subtitle="Home" description="Modern Tourism Management" />

      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            p: 5,
            width: isDesktop ? SIDEBAR_WIDTH : "100vw",
            height: "100vh",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <CharterLogo url="/" sx={{ width: 200, height: 100 }} />

          <Box sx={{ width: "100%", flexGrow: 1, textAlign: "center" }}>
            {!isDesktop && (
              <Typography variant="h5" sx={{ pt: 4 }}>
                {prompt}
              </Typography>
            )}

            {initialised && !loggedInUser && (
              <Box sx={{ pt: 5 }}>
                <LoginForm />
              </Box>
            )}
          </Box>

          <Box sx={{ p: 2, pb: 10, textAlign: "center" }}>
            {initialised && loggedInUser?.role === "user" && (
              <>
                <Typography>
                  If you are an operator, wait for the admin to register you.
                </Typography>
                <Typography>
                  When they have, refresh this page and go to your admin
                  settings to manage your services.
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

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              textAlign: "center",
            }}
          >
            <Link href="https://www.bitmetro.io" target="_blank">
              <Image
                src="/bm-logo-new-black.png"
                alt="bitmetro logo"
                width={40}
                height={40}
              />
            </Link>

            <Link
              href="https://www.bitmetro.io"
              target="_blank"
              style={{ textDecoration: "none", fontSize: "0.8em" }}
            >
              Developed with ❤️ by bitmetro
            </Link>
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
    </>
  );
};

HomePage.getInitialProps = () => ({});

export default HomePage;
