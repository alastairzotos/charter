import { Box } from "@mui/system";
import { Form } from "formik";
import { Router } from "next/router";
import React, { useEffect } from "react";

import { Titled } from "components/lib/titled";

interface Props {
  dirty?: boolean;
  title: string;
  maxWidth?: number;
  onClose?: () => void;
}

const useWarnIfDirty = (dirty: boolean, callback: () => boolean) => {
  useEffect(() => {
    if (dirty) {
      const routeChangeStart = () => {
        const ok = callback();
        if (!ok) {
          Router.events.emit("routeChangeError");
          throw "Abort route change. Please ignore this error.";
        }
      };
      Router.events.on("routeChangeStart", routeChangeStart);

      return () => Router.events.off("routeChangeStart", routeChangeStart);
    }
  }, [dirty]);
};

export const FormBox: React.FC<React.PropsWithChildren<Props>> = ({
  dirty,
  title,
  maxWidth,
  onClose,
  children,
}) => {
  useWarnIfDirty(!!dirty, () =>
    confirm("You have unsaved changes. Are you sure you want to leave?")
  );

  return (
    <Titled title={title} onClose={onClose}>
      <Form>
        <Box
          sx={{
            pb: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth,
          }}
        >
          {children}
        </Box>
      </Form>
    </Titled>
  );
};
