import * as React from 'react';
import { useRouter } from 'next/router'
import Container from '@mui/material/Container';
import { AdminRoute } from '../../../../src/components/admin-route';
import { OperatorCreate } from '../../../../src/components/operator-create';
import { Breadcrumbs } from '../../../../src/components/breadcrumbs';
import { urls } from '../../../../src/urls';

const CreateOperatorPage: React.FC = () => {
  const router = useRouter()
  const id = router.query.id as string;

  return (
    <AdminRoute>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Breadcrumbs
          list={[{ href: urls.home(), title: 'Home' }, { href: urls.admin.home(), title: 'Admin' }, { href: urls.admin.operators(), title: 'Operators' }]}
          current="Create operator"
        />

        <OperatorCreate />
      </Container>
    </AdminRoute>
  )
}

export default CreateOperatorPage;
