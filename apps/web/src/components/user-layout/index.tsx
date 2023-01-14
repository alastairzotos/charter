import { Container, Paper } from '@mui/material';
import * as React from 'react';
import { SeoHead } from '../seo/head';
import { UserAppBar } from '../user-app-bar';

export const UserLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SeoHead description="Book a boat in Corfu with ease" />
      <UserAppBar />
      <Container>
        <Paper sx={{ p: 4, mt: 2 }}>
          {children}
        </Paper>
      </Container>
    </>
  )
}
