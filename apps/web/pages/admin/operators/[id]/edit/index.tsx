import * as React from 'react';
import { useRouter } from 'next/router'
import Container from '@mui/material/Container';
import { AdminRoute } from '../../../../../src/components/admin-route';
import { urls } from '../../../../../src/urls';
import { Breadcrumbs } from '../../../../../src/components/breadcrumbs';
import { OperatorEdit } from '../../../../../src/components/operator-edit';

const OperatorPage: React.FC = () => {
  const router = useRouter()
  const id = router.query.id as string;

  return (
    <AdminRoute>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Breadcrumbs
          list={[
            { href: urls.home(), title: 'Home' },
            { href: urls.admin.home(), title: 'Admin' },
            { href: urls.admin.operators(), title: 'Operators' },
            { href: urls.admin.operator(id), title: 'Operator' }
          ]}
          current="Edit operator"
        />

        <OperatorEdit id={id} />
      </Container>
    </AdminRoute>
  )
}

export default OperatorPage;
