import * as React from 'react';
import Container from '@mui/material/Container';
import { RegisterForm } from '../../src/components/register';

const RegisterPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <RegisterForm />
    </Container>
  )
}

export default RegisterPage;
