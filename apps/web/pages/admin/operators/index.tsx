import * as React from "react";
import { urls } from "urls";

import { AdminRoute } from "src/components/admin-route";
import { Breadcrumbs } from "src/components/breadcrumbs";
import { OperatorsList } from "src/components/operators-list";

const OperatorsPage: React.FC = () => {
  return (
    <AdminRoute>
      <Breadcrumbs
        list={[
          { href: urls.home(), title: "Home" },
          { href: urls.admin.home(), title: "Admin" },
        ]}
        current="Operators"
      />

      <OperatorsList />
    </AdminRoute>
  );
};

export default OperatorsPage;
