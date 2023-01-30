import * as React from 'react';
import Link from 'next/link';
import { AdminRoute } from '../../src/components/admin-route';
import { Breadcrumbs } from '../../src/components/breadcrumbs';
import { urls } from '../../src/urls';

const AdminPage: React.FC = () => {
  return (
    <AdminRoute>
      <Breadcrumbs
        list={[{ href: urls.home(), title: 'Home' }]}
        current="Admin"
      />

      <Link href={urls.admin.operators()}>Operators</Link>
    </AdminRoute>
  )
}

export default AdminPage;
