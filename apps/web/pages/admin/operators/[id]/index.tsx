import * as React from 'react';
import { useRouter } from 'next/router'
import Container from '@mui/material/Container';
import { AdminRoute } from '../../../../src/components/admin-route';
import { OperatorItem } from '../../../../src/components/operator-item';

const OperatorPage: React.FC = () => {
  const router = useRouter()
  const id = router.query.id as string;

  return (
    <AdminRoute>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <OperatorItem id={id} />
      </Container>
    </AdminRoute>
  )
}

export default OperatorPage;
