import { Box } from '@mui/system';
import React from 'react';

export const FormBox: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Box
    sx={{
      pt: 3,
      pb: 3,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }}
  >
    {children}
  </Box>
)