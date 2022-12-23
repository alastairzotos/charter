import { Container, Paper } from '@mui/material';
import * as React from 'react';
import { OperatorsAppBar } from '../operators-app-bar';

export const OperatorsLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <OperatorsAppBar />
      <Container>
        <Paper sx={{ p: 4, mt: 2 }}>
          {children}
        </Paper>
      </Container>
    </>
  )
}
