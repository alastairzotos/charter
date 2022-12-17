import * as React from 'react';
import { useRouter } from 'next/router'
import Container from '@mui/material/Container';
import { AdminRoute } from '../../../src/components/admin-route';
import { OperatorCreate } from '../../../src/components/operator-create';

const CreateOperatorPage: React.FC = () => {
  const router = useRouter()
  const id = router.query.id as string;

  return (
    <AdminRoute>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <OperatorCreate />
      </Container>
    </AdminRoute>
  )
}

export default CreateOperatorPage;
