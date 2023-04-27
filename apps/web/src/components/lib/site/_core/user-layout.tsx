import { Box } from "@mui/system";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { DefaultErrorFallback } from "ui";

import { Footer } from "components/lib/site/_core/footer";
import { SeoHead } from "components/lib/site/_core/seo-head";
import { UserAppBar } from "components/lib/site/_core/user-app-bar";

export const UserLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SeoHead description="Book anything in Corfu with ease" />
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
