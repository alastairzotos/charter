import { Box, Container } from '@mui/system';
import React from 'react';

export const UserLayoutContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ p: 4 }}>{children}</Box>
    </Container>
  )
}
