import * as React from 'react';
import Container from '@mui/material/Container';
import { LoginForm } from '../../src/components/login';
import { SeoHead } from '../../src/components/seo/head';

const LoginPage: React.FC = () => {
  return (
    <>
      <SeoHead subtitle="Login" description="Log in to your account" />
      <Container maxWidth="sm">
        <LoginForm />
      </Container>
    </>
  )
}

export default LoginPage;
