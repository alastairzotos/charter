import * as React from 'react';
import Container from '@mui/material/Container';
import { AdminRoute } from '../../../src/components/admin-route';
import { OperatorsList } from '../../../src/components/operators-list';

const OperatorsPage: React.FC = () => {
  return (
    <AdminRoute>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <OperatorsList />
      </Container>
    </AdminRoute>
  )
}

export default OperatorsPage;
