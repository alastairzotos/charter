import * as React from 'react';
import Button from '@mui/material/Button';
import { useUserState } from '../../state/user';
import Link from 'next/link';
import { urls } from '../../urls';

export const AppBarLoginLogout: React.FC = () => {
  const [accessToken, logout] = useUserState(s => [s.accessToken, s.logout]);

  return (
    <>
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
    </>
  );
}
