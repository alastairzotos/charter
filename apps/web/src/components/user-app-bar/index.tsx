import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AppBarLoginLogout } from '../app-bar-login-logout';
import { urls } from '../../urls';
import Link from 'next/link';
import Image from 'next/image';
import { APP_NAME } from '../../util/misc';

export const UserAppBar: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <Link href={urls.home()}>
            <Image src="/logo.png" alt={`${APP_NAME} logo`} width={64} height={64} />
          </Link>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href={urls.home()} style={{ textDecoration: 'none', color: 'white' }}>
              {APP_NAME}
            </Link>
          </Typography>

          <AppBarLoginLogout />
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
