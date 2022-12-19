import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useUserState } from '../../state/user';
import Link from 'next/link';
import { urls } from '../../urls';

export const AppBar: React.FC = () => {
  const [accessToken, logout] = useUserState(s => [s.accessToken, s.logout]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BookingYourBoatTrip
          </Typography>

          {!accessToken && (
            <Button
              component={Link}
              color="inherit"
              href={urls.login()}
            >
              Login
            </Button>
          )}

          {!!accessToken && (
            <Button color="inherit" onClick={logout}>Logout</Button>
          )}

        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
