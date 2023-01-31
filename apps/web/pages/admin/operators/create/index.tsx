import * as React from "react";
import { urls } from "urls";

import { AdminRoute } from "src/components/admin-route";
import { Breadcrumbs } from "src/components/breadcrumbs";
import { OperatorCreate } from "src/components/operator-create";

const CreateOperatorPage: React.FC = () => {
  return (
    <AdminRoute>
      <Breadcrumbs
        list={[
          { href: urls.home(), title: "Home" },
          { href: urls.admin.home(), title: "Admin" },
          { href: urls.admin.operators(), title: "Operators" },
        ]}
        current="Create operator"
      />

      <OperatorCreate />
    </AdminRoute>
  );
};

export default CreateOperatorPage;
