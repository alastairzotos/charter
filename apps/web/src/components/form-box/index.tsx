import { Box } from "@mui/system";
import { Form } from "formik";
import React from "react";

import { Titled } from "src/components/titled";

interface Props {
  title: string;
  onClose?: () => void;
}

export const FormBox: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  onClose,
  children,
}) => (
  <Titled title={title} onClose={onClose}>
    <Form>
      <Box
        sx={{
          pt: 3,
          pb: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {children}
      </Box>
    </Form>
  </Titled>
);
