import { Toolbar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { AppBarBase } from "ui";
import { urls } from "urls";

import { ServiceSearch } from "components/_core/service-search";
import { APP_NAME } from "util/misc";

export const UserAppBar: React.FC = () => {
  const pages = new Map<string, string>([
    [urls.user.operators(), "Operators"],
    [urls.user.services(), "Services"],
  ]);

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
        <ServiceSearch sx={{ ml: 3, mr: 3, width: 600, minWidth: 150 }} />
      </AppBarBase>
      <Toolbar />
    </>
  );
};
