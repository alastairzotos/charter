import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { FallbackProps } from "react-error-boundary";

export const DefaultErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <Box sx={{ p: 3 }} role="alert">
      <Typography variant="h5">Something went wrong</Typography>
      <Typography>Message: {error.message}</Typography>

      {resetErrorBoundary && (
        <Button sx={{ mt: 3 }} variant="contained" onClick={resetErrorBoundary}>
          Try again
        </Button>
      )}
    </Box>
  );
};
