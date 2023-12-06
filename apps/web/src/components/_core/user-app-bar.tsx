import HelpIcon from "@mui/icons-material/Help";
import { Box, Button, Toolbar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { AppBarBase, useIsDesktop } from "ui";
import { urls } from "urls";

import { ServiceSearch } from "components/_core/service-search";
import { APP_NAME } from "util/misc";

export const UserAppBar: React.FC = () => {
  const isDesktop = useIsDesktop();

  const pages = new Map<string, string>([[urls.user.services(), "Services"]]);

  return (
    <>
      <AppBarBase
        sx={{ backgroundColor: "#224394" }}
        pages={pages}
        logo={
          <Link href={urls.home()}>
            <Image
              src="/booking-logo.jpg"
              alt={`${APP_NAME} logo`}
              width={64}
              height={64}
            />
          </Link>
        }
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* {isDesktop ? (
            <ServiceSearch sx={{ ml: 3, mr: 3, width: 600, minWidth: 150 }} />
          ) : (
            <div />
          )} */}

          <div />

          <Button
            color="inherit"
            LinkComponent={Link}
            href={urls.user.feedback()}
          >
            Feedback
            <HelpIcon sx={{ ml: 1, fontSize: "1.2em" }} />
          </Button>
        </Box>
      </AppBarBase>
      <Toolbar />
    </>
  );
};
