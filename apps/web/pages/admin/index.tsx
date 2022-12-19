import * as React from 'react';
import Link from 'next/link';
import Container from '@mui/material/Container';
import { AdminRoute } from '../../src/components/admin-route';
import { Breadcrumbs } from '../../src/components/breadcrumbs';
import { urls } from '../../src/urls';
import { Paper } from '@mui/material';

const AdminPage: React.FC = () => {
  return (
    <AdminRoute>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Breadcrumbs
          list={[{ href: urls.home(), title: 'Home' }]}
          current="Admin"
        />
        
        <Paper sx={{ p: 3 }}>
          <Link href={urls.admin.operators()}>Operators</Link>
        </Paper>
      </Container>
    </AdminRoute>
  )
}

export default AdminPage;
