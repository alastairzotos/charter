import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

interface Props {
  title: string;
}

export const Titled: React.FC<React.PropsWithChildren<Props>> = ({ title, children }) => {
  return (
    <>
      <Typography variant="h6">{title}</Typography>
      <Box sx={{ mt: 1 }}>
        {children}
      </Box>
    </>
  )
}
