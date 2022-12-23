import { Container } from '@mui/material';
import * as React from 'react';
import { UserAppBar } from '../user-app-bar';

export const UserLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <UserAppBar />
      <Container>
        {children}
      </Container>
    </>
  )
}
