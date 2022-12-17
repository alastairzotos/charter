import * as React from 'react';
import Container from '@mui/material/Container';
import { AdminRoute } from '../../src/components/admin-route';

const OperatorsPage: React.FC = () => {
  return (
    <AdminRoute>
      <Container maxWidth="lg">
        <p>operators</p>
      </Container>
    </AdminRoute>
  )
}

export default OperatorsPage;
