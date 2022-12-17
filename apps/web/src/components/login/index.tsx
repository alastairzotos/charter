import * as React from 'react';
import { useRouter } from 'next/router'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useUserState } from '../../state/user';

export const LoginForm: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [loginStatus, login] = useUserState(s => [s.loginStatus, s.login]);

  React.useEffect(() => {
    if (loginStatus === 'success') {
      router.push('/');
    }
  }, [loginStatus]);

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Typography variant="h4" sx={{ textAlign: 'center' }}>Login</Typography>

        <TextField
          placeholder="Email address"
          variant="standard"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}

          disabled={loginStatus === 'fetching'}
        />
        
        <TextField
          placeholder="Password"
          variant="standard"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}

          disabled={loginStatus === 'fetching'}
        />

        <Button
          variant="contained"
          sx={{ mt: 3 }}
          disabled={loginStatus === 'fetching'}
          onClick={() => login(email, password)}
        >
          {
            loginStatus === 'fetching' ? <CircularProgress size={20} /> : 'Login'
          }
        </Button>
      </Box>
    </Paper>
  )
}
