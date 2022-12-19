import * as React from 'react';
import { useRouter } from 'next/router'
import Container from '@mui/material/Container';
import { AdminRoute } from '../../../../../../src/components/admin-route';
import { urls } from '../../../../../../src/urls';
import { Breadcrumbs } from '../../../../../../src/components/breadcrumbs';
import { TripCreate } from '../../../../../../src/components/trip-create';

const CreateTripPage: React.FC = () => {
  const router = useRouter()
  const operatorId = router.query.id as string;

  return (
    <AdminRoute>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Breadcrumbs
          list={[
            { href: urls.home(), title: 'Home' },
            { href: urls.admin.home(), title: 'Admin' },
            { href: urls.admin.operators(), title: 'Operators' },
            { href: urls.admin.operator(operatorId), title: 'Operator' },
          ]}
          current="Create trip"
        />

        <TripCreate operatorId={operatorId} />
      </Container>
    </AdminRoute>
  )
}

export default CreateTripPage;
