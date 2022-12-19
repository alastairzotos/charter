import * as React from 'react';
import Container from '@mui/material/Container';
import { AdminRoute } from '../../../src/components/admin-route';
import { OperatorsList } from '../../../src/components/operators-list';
import { Breadcrumbs } from '../../../src/components/breadcrumbs';
import { urls } from '../../../src/urls';

const OperatorsPage: React.FC = () => {
  return (
    <AdminRoute>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Breadcrumbs
          list={[{ href: urls.home(), title: 'Home' }, { href: urls.admin.home(), title: 'Admin' }]}
          current="Operators"
        />

        <OperatorsList />
      </Container>
    </AdminRoute>
  )
}

export default OperatorsPage;
