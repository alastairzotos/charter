import * as React from 'react';
import { AdminRoute } from '../../../src/components/admin-route';
import { OperatorsList } from '../../../src/components/operators-list';
import { Breadcrumbs } from '../../../src/components/breadcrumbs';
import { urls } from '../../../src/urls';

const OperatorsPage: React.FC = () => {
  return (
    <AdminRoute>
      <Breadcrumbs
        list={[{ href: urls.home(), title: 'Home' }, { href: urls.admin.home(), title: 'Admin' }]}
        current="Operators"
      />

      <OperatorsList />
    </AdminRoute>
  )
}

export default OperatorsPage;
