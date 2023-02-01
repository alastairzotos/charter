import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { urls } from "urls";

import { SeoHead } from "src/components/seo/head";
import { useUserState } from "src/state/user";

export default function Web() {
  const user = useUserState((s) => s.loggedInUser);

  return (
    <>
      <SeoHead
        subtitle="Book a boat trip with ease"
        description="Book a boat trip in Corfu with ease"
      />

      <Box
        sx={{
          backgroundImage: "url(jumbo.jpeg)",
          width: "100%",
          height: 300,
        }}
      ></Box>
    </>
  );
}
