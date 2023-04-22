import { Box } from "@mui/system";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";

import { DefaultErrorFallback } from "components/default-error-fallback";
import { Footer } from "components/footer";
import { SeoHead } from "components/seo/head";
import { UserAppBar } from "components/user-app-bar";

export const UserLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SeoHead description="Book a boat in Corfu with ease" />
      <UserAppBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-between",
        }}
      >
        <ErrorBoundary FallbackComponent={DefaultErrorFallback}>
          <div>{children}</div>
        </ErrorBoundary>
        <Footer />
      </Box>
    </>
  );
};
