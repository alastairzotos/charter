import { Container, Paper } from '@mui/material';
import * as React from 'react';
import { OperatorsAppBar } from '../operators-app-bar';
import { SeoHead } from '../seo/head';

export const OperatorsLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SeoHead subtitle='Operator Admin' description="Manage your bookings" />
      <OperatorsAppBar />
      <Container maxWidth="lg">
        <Paper sx={{ p: 4, mt: 2 }}>
          {children}
        </Paper>
      </Container>
    </>
  )
}
