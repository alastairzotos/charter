import * as React from 'react';
import { useRouter } from 'next/router'
import { AdminRoute } from '../../../../src/components/admin-route';
import { OperatorCreate } from '../../../../src/components/operator-create';
import { Breadcrumbs } from '../../../../src/components/breadcrumbs';
import { urls } from '../../../../src/urls';

const CreateOperatorPage: React.FC = () => {
  const router = useRouter()
  const id = router.query.id as string;

  return (
    <AdminRoute>
      <Breadcrumbs
        list={[{ href: urls.home(), title: 'Home' }, { href: urls.admin.home(), title: 'Admin' }, { href: urls.admin.operators(), title: 'Operators' }]}
        current="Create operator"
      />

      <OperatorCreate />
    </AdminRoute>
  )
}

export default CreateOperatorPage;
