import React from 'react';
import { Grid } from '@mui/material';
import { OperatorDto } from 'dtos';
import { OperatorView } from '../operator-view';

interface Props {
  operator: OperatorDto;
}

export const OperatorLayout: React.FC<React.PropsWithChildren<Props>> = ({ operator, children }) => {
  return (
    <Grid container>
      <Grid item xs={4} sx={{ p: 2 }}>
        <OperatorView operator={operator} />
      </Grid>

      <Grid item xs={8} sx={{ p: 2 }}>
        {children}
      </Grid>
    </Grid>
  )
}
