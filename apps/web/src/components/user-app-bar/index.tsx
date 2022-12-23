import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AppBarLoginLogout } from '../app-bar-login-logout';

export const UserAppBar: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static" color='secondary'>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BookingYourBoatTrip
          </Typography>

          <AppBarLoginLogout />
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
