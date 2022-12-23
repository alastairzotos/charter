import { Container, Paper } from '@mui/material';
import * as React from 'react';
import { UserAppBar } from '../user-app-bar';

export const UserLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <UserAppBar />
      <Container>
        <Paper sx={{ p: 4, mt: 2 }}>
          {children}
        </Paper>
      </Container>
    </>
  )
}
