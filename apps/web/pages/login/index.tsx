import * as React from 'react';
import Container from '@mui/material/Container';
import { RegisterForm } from '../../src/components/register';
import { LoginForm } from '../../src/components/login';

const LoginPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <LoginForm />
    </Container>
  )
}

export default LoginPage;
