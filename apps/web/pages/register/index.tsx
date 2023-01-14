import * as React from 'react';
import Container from '@mui/material/Container';
import { RegisterForm } from '../../src/components/register';
import { SeoHead } from '../../src/components/seo/head';

const RegisterPage: React.FC = () => {
  return (
    <>
      <SeoHead subtitle="Register" description="Register your account" />
      <Container maxWidth="sm">
        <RegisterForm />
      </Container>
    </>
  )
}

export default RegisterPage;
