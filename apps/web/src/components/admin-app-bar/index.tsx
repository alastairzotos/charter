import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AppBarLoginLogout } from '../app-bar-login-logout';
import Link from 'next/link';
import { urls } from '../../urls';
import Image from 'next/image';

export const AdminAppBar: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static" color="secondary">
        <Toolbar>
          <Link href={urls.home()}>
            <Image src="/logo.png" alt="Booking your boat trip logo" width={64} height={64} />
          </Link>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href={urls.admin.home()} style={{ textDecoration: 'none', color: 'white' }}>
              BookingYourBoatTrip Admin
            </Link>
          </Typography>

          <AppBarLoginLogout />
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
