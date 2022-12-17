import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useUserState } from '../../state/user';
import Link from 'next/link';

export const AppBar: React.FC = () => {
  const [accessToken, logout] = useUserState(s => [s.accessToken, s.logout]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Boat trip booking app thing
          </Typography>

          {!accessToken && (
            <Button
              component="a"
              color="inherit"
              href="/login"
              LinkComponent={Link}
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
